import { useState, useRef } from 'react'

// props :
// value    → l'URL actuelle (pour afficher la preview)
// onChange → appelée avec la nouvelle URL quand l'upload réussit

function DragDropImage({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const uploadFile = async (file) => {
    if (!file) return
    setUploading(true)

    // on crée un FormData — c'est le format attendu par multer
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData // pas de Content-Type header — le navigateur le met automatiquement
    })

    const data = await res.json()
    // on remonte l'URL au composant parent via onChange
    onChange(`http://localhost:5000${data.url}`)
    setUploading(false)
  }

  // quand l'utilisateur lâche un fichier sur la zone
  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    uploadFile(file)
  }

  // quand l'utilisateur sélectionne via le file picker
  const handleChange = (e) => {
    uploadFile(e.target.files[0])
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${dragging ? 'border-black bg-black/5' : 'border-black/10 hover:border-black/30'}`}
      >
        {uploading ? (
          <p className="text-sm text-black/40">Uploading...</p>
        ) : value ? (
          <img src={value} alt="preview" className="max-h-40 mx-auto rounded-lg object-cover" />
        ) : (
          <div>
            <p className="text-sm text-black/40">Drag & drop an image here</p>
            <p className="text-xs text-black/30 mt-1">or click to browse</p>
          </div>
        )}
      </div>

      {/* input caché — déclenché par le click sur la zone */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* bouton pour supprimer l'image */}
      {value && !uploading && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="mt-2 text-xs text-red-400 hover:text-red-600 transition"
        >
          Remove image
        </button>
      )}
    </div>
  )
}

export default DragDropImage
