import { Router } from 'express';
import multer from 'multer';
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js';

import path from 'path';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// multer configure où et comment sauvegarder le fichier
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'), // dossier de destination
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Images only'))
  }
})

const router = Router()

router.post('/', requireAuth, requireSuperAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

export default router
