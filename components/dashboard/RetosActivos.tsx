'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface Reto {
  id: string
  reto_id: string
  reto_titulo: string
  reto_descripcion: string | null
  recompensa: string | null
  fecha_completado: string
}

interface RetoDisponible {
  id: string
  titulo: string
  descripcion: string
  recompensa: string
  icono: string
}

// Retos disponibles (simulados - en el futuro pueden venir de Supabase)
const RETOS_DISPONIBLES: RetoDisponible[] = [
  {
    id: 'reto-1',
    titulo: 'Invita a 1 gallina nueva al corral',
    descripcion: 'Comparte el enlace de Telegram de COCOIN con un amigo y que se una al grupo.',
    recompensa: '🏆 Frase: "Sembrador del corral"',
    icono: '🐔'
  },
  {
    id: 'reto-2',
    titulo: 'Completa tu primer canto diario',
    descripcion: 'Escribe tu primer canto diario en la sección "Mi canto diario".',
    recompensa: '🎵 Ícono: "Primer canto"',
    icono: '🎵'
  },
  {
    id: 'reto-3',
    titulo: 'Toma tu primera clase',
    descripcion: 'Completa al menos una clase en la sección "Clases tomadas".',
    recompensa: '📚 Badge: "Estudiante del corral"',
    icono: '📚'
  },
  {
    id: 'reto-4',
    titulo: 'Publica en la comunidad',
    descripcion: 'Comparte un mensaje en el muro de la comunidad.',
    recompensa: '👥 Frase: "Voz del corral"',
    icono: '👥'
  }
]

export default function RetosActivos() {
  const [retos, setRetos] = useState<Reto[]>([])
  const [loading, setLoading] = useState(true)
  const [completando, setCompletando] = useState<string | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    loadRetos()
  }, [])

  const loadRetos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('retos_completados')
        .select('*')
        .eq('user_id', user.id)
        .order('fecha_completado', { ascending: false })

      if (error) {
        console.error('Error cargando retos:', error)
      } else {
        setRetos(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCompletarReto = async (reto: RetoDisponible) => {
    if (completando) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Verificar si ya completó este reto
      const { data: existe } = await supabase
        .from('retos_completados')
        .select('id')
        .eq('user_id', user.id)
        .eq('reto_id', reto.id)
        .single()

      if (existe) {
        alert('Ya has completado este reto')
        return
      }

      setCompletando(reto.id)

      // Guardar el reto completado
      const { error } = await supabase
        .from('retos_completados')
        .insert({
          user_id: user.id,
          reto_id: reto.id,
          reto_titulo: reto.titulo,
          reto_descripcion: reto.descripcion,
          recompensa: reto.recompensa
        })

      if (error) {
        console.error('Error guardando reto:', error)
        alert('Error al completar el reto')
      } else {
        // Mostrar mensaje de éxito
        alert(`¡Has encendido el canto justo! 🎉\n\nRecompensa: ${reto.recompensa}`)
        loadRetos()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al completar el reto')
    } finally {
      setCompletando(null)
    }
  }

  const retosCompletadosIds = retos.map(r => r.reto_id)
  const retosPendientes = RETOS_DISPONIBLES.filter(r => !retosCompletadosIds.includes(r.id))
  const retosCompletados = RETOS_DISPONIBLES.filter(r => retosCompletadosIds.includes(r.id))

  if (loading) {
    return (
      <div className="dashboard-card dashboard-card-retos">
        <div className="dashboard-card-header">
          <span className="card-icon">🎯</span>
          <h2>Retos activos</h2>
        </div>
        <div className="dashboard-card-body">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-card dashboard-card-retos">
      <div className="dashboard-card-header">
        <span className="card-icon">🎯</span>
        <h2>Retos activos</h2>
      </div>
      <div className="dashboard-card-body">
        {retosPendientes.length === 0 && retosCompletados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌾</div>
            <p className="empty-state-title">No hay retos disponibles</p>
            <p className="empty-state-description">
              Próximamente podrás participar en retos comunitarios.
            </p>
          </div>
        ) : (
          <>
            {/* Retos Pendientes */}
            {retosPendientes.length > 0 && (
              <div className="retos-pendientes">
                <h3 className="retos-section-title">Retos pendientes</h3>
                <div className="retos-list">
                  {retosPendientes.map((reto) => (
                    <div key={reto.id} className="reto-item reto-item-pendiente">
                      <div className="reto-item-icon">{reto.icono}</div>
                      <div className="reto-item-content">
                        <h3 className="reto-item-title">{reto.titulo}</h3>
                        <p className="reto-item-descripcion">{reto.descripcion}</p>
                        <div className="reto-item-recompensa">
                          <span className="reto-recompensa-label">Recompensa:</span>
                          <span className="reto-recompensa-value">{reto.recompensa}</span>
                        </div>
                        <button
                          onClick={() => handleCompletarReto(reto)}
                          disabled={completando === reto.id}
                          className="btn btn--primary btn--small"
                        >
                          {completando === reto.id ? 'Completando...' : 'Completar reto'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Retos Completados */}
            {retosCompletados.length > 0 && (
              <div className="retos-completados">
                <h3 className="retos-section-title">Retos completados</h3>
                <div className="retos-list">
                  {retosCompletados.map((reto) => {
                    const retoCompletado = retos.find(r => r.reto_id === reto.id)
                    return (
                      <div key={reto.id} className="reto-item reto-item-completado">
                        <div className="reto-item-icon">✅</div>
                        <div className="reto-item-content">
                          <h3 className="reto-item-title">{reto.titulo}</h3>
                          <p className="reto-item-fecha">
                            Completado el {retoCompletado ? new Date(retoCompletado.fecha_completado).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : ''}
                          </p>
                          <div className="reto-item-recompensa reto-item-recompensa-completado">
                            <span className="reto-recompensa-value">{reto.recompensa}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
