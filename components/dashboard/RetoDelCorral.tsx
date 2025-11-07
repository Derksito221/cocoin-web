'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface RetoSemanal {
  id: string
  titulo: string
  descripcion: string
  recompensa: string
  icono: string
}

// Reto semanal del corral (puede cambiar cada semana)
const RETO_SEMANAL: RetoSemanal = {
  id: 'reto-semanal-1',
  titulo: 'Reto del Corral: Invita a 1 persona al grupo de Telegram',
  descripcion: 'Comparte el enlace del grupo de Telegram de COCOIN con un amigo y que se una. ¡Ayuda a crecer el corral!',
  recompensa: '🏆 Frase: "Encendiste el canto justo" + Ícono coleccionable',
  icono: '🔥'
}

export default function RetoDelCorral() {
  const [completado, setCompletado] = useState(false)
  const [loading, setLoading] = useState(true)
  const [completando, setCompletando] = useState(false)
  const supabase = createSupabaseClient()

  useEffect(() => {
    checkRetoCompletado()
  }, [])

  const checkRetoCompletado = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('retos_completados')
        .select('id')
        .eq('user_id', user.id)
        .eq('reto_id', RETO_SEMANAL.id)
        .single()

      setCompletado(!!data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompletarReto = async () => {
    if (completando || completado) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Debes estar logueado para completar el reto')
        return
      }

      setCompletando(true)

      // Guardar el reto completado
      const { error } = await supabase
        .from('retos_completados')
        .insert({
          user_id: user.id,
          reto_id: RETO_SEMANAL.id,
          reto_titulo: RETO_SEMANAL.titulo,
          reto_descripcion: RETO_SEMANAL.descripcion,
          recompensa: RETO_SEMANAL.recompensa
        })

      if (error) {
        console.error('Error guardando reto:', error)
        alert('Error al completar el reto')
      } else {
        setCompletado(true)
        alert('¡Has encendido el canto justo! 🎉\n\nRecompensa: ' + RETO_SEMANAL.recompensa)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al completar el reto')
    } finally {
      setCompletando(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-card dashboard-card-reto-corral">
        <div className="dashboard-card-header">
          <span className="card-icon">🔥</span>
          <h2>Reto del Corral</h2>
        </div>
        <div className="dashboard-card-body">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`dashboard-card dashboard-card-reto-corral ${completado ? 'reto-completado' : ''}`}>
      <div className="dashboard-card-header">
        <span className="card-icon">{RETO_SEMANAL.icono}</span>
        <h2>Reto del Corral</h2>
        {completado && <span className="reto-badge-completado">✅ Completado</span>}
      </div>
      <div className="dashboard-card-body">
        <div className="reto-corral-content">
          <h3 className="reto-corral-titulo">{RETO_SEMANAL.titulo}</h3>
          <p className="reto-corral-descripcion">{RETO_SEMANAL.descripcion}</p>
          
          <div className="reto-corral-recompensa">
            <span className="reto-corral-recompensa-label">Recompensa:</span>
            <span className="reto-corral-recompensa-value">{RETO_SEMANAL.recompensa}</span>
          </div>

          {!completado ? (
            <div className="reto-corral-actions">
              <a
                href="https://t.me/cocoinelgallo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--telegram"
              >
                📱 Ir a Telegram
              </a>
              <button
                onClick={handleCompletarReto}
                disabled={completando}
                className="btn btn--secondary"
              >
                {completando ? 'Completando...' : '✅ Marcar como completado'}
              </button>
            </div>
          ) : (
            <div className="reto-corral-completado">
              <div className="reto-corral-mensaje">
                <span className="reto-corral-mensaje-icon">🎉</span>
                <p className="reto-corral-mensaje-texto">¡Has encendido el canto justo!</p>
              </div>
              <p className="reto-corral-recompensa-otorgada">
                Recompensa otorgada: {RETO_SEMANAL.recompensa}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

