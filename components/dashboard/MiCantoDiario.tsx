'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface MiCantoDiarioProps {
  userId: string
}

export default function MiCantoDiario({ userId }: MiCantoDiarioProps) {
  const [canto, setCanto] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createSupabaseClient()

  // Cargar canto guardado al montar el componente
  useEffect(() => {
    const loadCanto = async () => {
      // Por ahora, guardamos en localStorage
      // En el futuro, se puede migrar a Supabase
      const savedCanto = localStorage.getItem(`canto_${userId}`)
      if (savedCanto) {
        setCanto(savedCanto)
      }
    }
    loadCanto()
  }, [userId])

  const handleSave = async () => {
    setSaving(true)
    
    // Guardar en localStorage por ahora
    // En el futuro, se puede guardar en Supabase
    localStorage.setItem(`canto_${userId}`, canto)
    
    setSaving(false)
    setSaved(true)
    
    // Ocultar mensaje de guardado después de 2 segundos
    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCanto(e.target.value)
    setSaved(false)
  }

  return (
    <div className="dashboard-card dashboard-card-canto">
      <div className="dashboard-card-header">
        <span className="card-icon">🎵</span>
        <h2>Mi canto diario</h2>
      </div>
      <div className="dashboard-card-body">
        <div className="canto-editor">
          <textarea
            className="canto-textarea"
            value={canto}
            onChange={handleChange}
            placeholder="Escribe tu canto diario aquí... ¿Qué aprendiste hoy? ¿Qué te motiva? Comparte tus pensamientos con el corral."
            rows={6}
          />
          <div className="canto-actions">
            <button
              onClick={handleSave}
              className="btn btn--save"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="btn-icon">💾</span>
                  Guardando...
                </>
              ) : saved ? (
                <>
                  <span className="btn-icon">✅</span>
                  Guardado
                </>
              ) : (
                <>
                  <span className="btn-icon">💾</span>
                  Guardar canto
                </>
              )}
            </button>
            <p className="canto-hint">
              Tu canto se guarda automáticamente. Comparte tus pensamientos, aprendizajes o motivaciones del día.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

