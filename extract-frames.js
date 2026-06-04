import { execSync, spawn } from 'child_process'
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'fs'
import { extname, basename } from 'path'
import { parseArgs } from 'util'

const { values } = parseArgs({
  options: {
    input:       { type: 'string',  short: 'i' },
    output:      { type: 'string',  short: 'o', default: './frames' },
    fps:         { type: 'string',  short: 'f', default: '2' },
    quality:     { type: 'string',  short: 'q', default: '95' },
    'filter-blur': { type: 'boolean', default: false },
  }
})

const INPUT   = values.input
const OUTPUT  = values.output
const FPS     = parseFloat(values.fps)
const QUALITY = parseInt(values.quality)
const FILTER_BLUR = values['filter-blur']

// ─── Vérifications ───────────────────────────────────────────────────────────

// 1. ffmpeg installé ?
try {
  execSync('ffmpeg -version', { stdio: 'ignore' })
} catch {
  console.error('❌ ffmpeg n\'est pas installé. Lance : sudo apt install ffmpeg')
  process.exit(1)
}

// 2. Fichier vidéo fourni et existant ?
if (!INPUT) {
  console.error('❌ Spécifie une vidéo : --input video.mp4')
  process.exit(1)
}
if (!existsSync(INPUT)) {
  console.error(`❌ Fichier introuvable : ${INPUT}`)
  process.exit(1)
}

// 3. Format supporté ?
const SUPPORTED = ['.mp4', '.mov', '.avi', '.mkv', '.webm']
if (!SUPPORTED.includes(extname(INPUT).toLowerCase())) {
  console.error(`❌ Format non supporté. Formats acceptés : ${SUPPORTED.join(', ')}`)
  process.exit(1)
}

// ─── Création du dossier de sortie ───────────────────────────────────────────
if (!existsSync(OUTPUT)) mkdirSync(OUTPUT, { recursive: true })

// ─── Récupère la durée de la vidéo ───────────────────────────────────────────
const probeOutput = execSync(
  `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${INPUT}"`
).toString().trim()
const duration = parseFloat(probeOutput)
const estimatedFrames = Math.floor(duration * FPS)

console.log(`\n🎬 Vidéo       : ${basename(INPUT)}`)
console.log(`⏱  Durée       : ${duration.toFixed(1)}s`)
console.log(`📸 FPS sortie  : ${FPS} → ~${estimatedFrames} frames attendues`)
console.log(`📁 Dossier     : ${OUTPUT}`)
console.log(`🔍 Filtre flou : ${FILTER_BLUR ? 'activé' : 'désactivé'}`)
console.log('\nExtraction en cours...\n')

// ─── Extraction des frames avec ffmpeg ───────────────────────────────────────
// -vf fps=X        → on extrait X frames par seconde
// -q:v             → qualité JPEG (2 = meilleure, 31 = pire) — on convertit depuis 0-100
// -frame_pts 1     → timestamp dans le nom de fichier
const jpegQuality = Math.round(2 + (100 - QUALITY) * 29 / 100) // 95% → ~2, 0% → ~31

await new Promise((resolve, reject) => {
  const ff = spawn('ffmpeg', [
    '-i', INPUT,
    '-vf', `fps=${FPS}`,
    '-q:v', String(jpegQuality),
    `${OUTPUT}/frame_%04d.jpg`,
    '-y'
  ])

  ff.stderr.on('data', (data) => {
    // ffmpeg écrit sa progression sur stderr — on l'affiche
    process.stdout.write('.')
  })

  ff.on('close', (code) => {
    console.log('\n')
    if (code === 0) resolve()
    else reject(new Error(`ffmpeg a quitté avec le code ${code}`))
  })
})

// ─── Filtre flou (optionnel) ──────────────────────────────────────────────────
// On utilise ffmpeg pour calculer la variance du Laplacien via le filtre "blurdetect"
// Une frame est considérée floue si le score est < 0.01 (empirique)
let filteredCount = 0

if (FILTER_BLUR) {
  console.log('🔍 Analyse des frames floues...')
  const frames = readdirSync(OUTPUT).filter(f => f.endsWith('.jpg')).sort()

  for (const frame of frames) {
    const path = `${OUTPUT}/${frame}`

    try {
      // blurdetect retourne un score entre 0 (net) et 1 (flou)
      const result = execSync(
        `ffmpeg -i "${path}" -vf "blurdetect=high=0.01" -f null - 2>&1 | grep blur_type`
      ).toString()

      // si "blurred" apparaît dans le résultat, la frame est floue
      if (result.includes('blurred')) {
        unlinkSync(path)
        filteredCount++
        process.stdout.write('✗')
      } else {
        process.stdout.write('✓')
      }
    } catch {
      // blurdetect pas dispo sur toutes les versions — on ignore silencieusement
    }
  }
  console.log('\n')
}

// ─── Rapport final ───────────────────────────────────────────────────────────
const finalFrames = readdirSync(OUTPUT).filter(f => f.endsWith('.jpg'))
const totalSize   = finalFrames.reduce((acc, f) => acc + statSync(`${OUTPUT}/${f}`).size, 0)
const sizeMB      = (totalSize / 1024 / 1024).toFixed(1)

console.log('─'.repeat(40))
console.log(`✅ Frames extraites  : ${finalFrames.length}`)
if (FILTER_BLUR) {
  console.log(`🗑  Frames supprimées : ${filteredCount} (floues)`)
}
console.log(`💾 Taille totale     : ${sizeMB} MB`)
console.log(`📁 Dossier           : ${OUTPUT}`)
console.log('─'.repeat(40))
console.log('\n🚀 Prêt pour Meshroom / RealityCapture / NeRF !\n')
