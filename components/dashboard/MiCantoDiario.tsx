'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface Canto {
  id: string
  canto_texto: string
  fecha: string
}

export default function MiCantoDiario({ userId }: { userId: string }) {
  const [canto, setCanto] = useState('')
  const [cantosAnteriores, setCantosAnteriores] = useState<Canto[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  // Cargar cantos anteriores al montar el componente
  useEffect(() => {
    loadCantos()
  }, [userId])

  const loadCantos = async () => {
    try {
      const { data, error } = await supabase
        .from('cantos_diarios')
        .select('*')
        .eq('user_id', userId)
        .order('fecha', { ascending: false })
        .limit(10)

      if (error) {
        console.error('Error cargando cantos:', error)
      } else {
        setCantosAnteriores(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!canto.trim()) {
      alert('Por favor escribe algo antes de guardar')
      return
    }

    setSaving(true)

    try {
      const { error } = await supabase
        .from('cantos_diarios')
        .insert({
          user_id: userId,
          canto_texto: canto
        })

      if (error) {
        console.error('Error guardando canto:', error)
        alert('Error al guardar el canto')
      } else {
        setCanto('')
        setSaved(true)
        loadCantos()

        // Ocultar mensaje de guardado después de 2 segundos
        setTimeout(() => {
          setSaved(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar el canto')
    } finally {
      setSaving(false)
    }
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
              disabled={saving || !canto.trim()}
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
              Tu canto se guarda en el corral. Comparte tus pensamientos, aprendizajes o motivaciones del día.
            </p>
          </div>
        </div>

        {/* Cantos Anteriores */}
        {!loading && cantosAnteriores.length > 0 && (
          <div className="cantos-anteriores">
            <h3 className="cantos-anteriores-title">Cantos anteriores</h3>
            <div className="cantos-list">
              {cantosAnteriores.map((cantoAnterior) => (
                <div key={cantoAnterior.id} className="canto-item">
                  <div className="canto-item-header">
                    <span className="canto-item-icon">🎵</span>
                    <span className="canto-item-fecha">
                      {new Date(cantoAnterior.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="canto-item-texto">{cantoAnterior.canto_texto}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
