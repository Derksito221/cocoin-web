'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface Clase {
  id: string
  clase_id: string
  clase_titulo: string
  clase_contenido: string | null
  fecha_tomada: string
}

interface ClaseDisponible {
  id: string
  titulo: string
  contenido: string
  icono: string
}

// Clases disponibles (simuladas - en el futuro pueden venir de Supabase)
const CLASES_DISPONIBLES: ClaseDisponible[] = [
  {
    id: 'clase-1',
    titulo: '¿Qué es blockchain?',
    contenido: 'Blockchain es una tecnología de registro distribuido que permite mantener un registro seguro y transparente de transacciones. Imagínalo como un libro contable digital que está distribuido en múltiples computadoras, donde cada transacción se registra de forma permanente e inmutable.',
    icono: '🔗'
  },
  {
    id: 'clase-2',
    titulo: 'Wallets: Tu primera billetera digital',
    contenido: 'Un wallet (billetera) es una herramienta que te permite almacenar, enviar y recibir criptomonedas. Existen diferentes tipos: hot wallets (conectadas a internet) y cold wallets (sin conexión). La seguridad es fundamental: nunca compartas tu frase semilla con nadie.',
    icono: '💼'
  },
  {
    id: 'clase-3',
    titulo: 'NFTs: Más que arte digital',
    contenido: 'Los NFTs (Non-Fungible Tokens) son tokens únicos que representan propiedad de un activo digital. A diferencia de las criptomonedas, cada NFT es único e irreemplazable. Pueden representar arte, música, objetos de juego, y más.',
    icono: '🖼️'
  },
  {
    id: 'clase-4',
    titulo: 'Staking: Hacer crecer tus tokens',
    contenido: 'Staking es el proceso de bloquear tus tokens para apoyar la seguridad y operación de una red blockchain. A cambio, recibes recompensas. Es como poner tu dinero en una cuenta de ahorros, pero en el mundo blockchain.',
    icono: '🪂'
  }
]

export default function ClasesTomadas() {
  const [clases, setClases] = useState<Clase[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [claseSeleccionada, setClaseSeleccionada] = useState<ClaseDisponible | null>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    loadClases()
  }, [])

  const loadClases = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('clases_tomadas')
        .select('*')
        .eq('user_id', user.id)
        .order('fecha_tomada', { ascending: false })

      if (error) {
        console.error('Error cargando clases:', error)
      } else {
        setClases(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTomarClase = (clase: ClaseDisponible) => {
    setClaseSeleccionada(clase)
    setShowModal(true)
  }

  const handleGuardarClase = async () => {
    if (!claseSeleccionada) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Verificar si ya tomó esta clase
      const { data: existe } = await supabase
        .from('clases_tomadas')
        .select('id')
        .eq('user_id', user.id)
        .eq('clase_id', claseSeleccionada.id)
        .single()

      if (existe) {
        alert('Ya has tomado esta clase')
        setShowModal(false)
        return
      }

      // Guardar la clase
      const { error } = await supabase
        .from('clases_tomadas')
        .insert({
          user_id: user.id,
          clase_id: claseSeleccionada.id,
          clase_titulo: claseSeleccionada.titulo,
          clase_contenido: claseSeleccionada.contenido
        })

      if (error) {
        console.error('Error guardando clase:', error)
        alert('Error al guardar la clase')
      } else {
        setShowModal(false)
        setClaseSeleccionada(null)
        loadClases()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar la clase')
    }
  }

  const clasesTomadasIds = clases.map(c => c.clase_id)
  const clasesDisponibles = CLASES_DISPONIBLES.filter(c => !clasesTomadasIds.includes(c.id))

  if (loading) {
    return (
      <div className="dashboard-card dashboard-card-clases">
        <div className="dashboard-card-header">
          <span className="card-icon">📚</span>
          <h2>Clases tomadas</h2>
        </div>
        <div className="dashboard-card-body">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="dashboard-card dashboard-card-clases">
        <div className="dashboard-card-header">
          <span className="card-icon">📚</span>
          <h2>Clases tomadas</h2>
        </div>
        <div className="dashboard-card-body">
          {clases.length === 0 && clasesDisponibles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🥚</div>
              <p className="empty-state-title">Aún no has tomado clases</p>
              <p className="empty-state-description">
                Próximamente podrás acceder a contenido educativo exclusivo.
              </p>
            </div>
          ) : (
            <>
              {/* Clases Tomadas */}
              {clases.length > 0 && (
                <div className="clases-list">
                  {clases.map((clase) => (
                    <div key={clase.id} className="clase-item clase-item-tomada">
                      <div className="clase-item-icon">✅</div>
                      <div className="clase-item-content">
                        <h3 className="clase-item-title">{clase.clase_titulo}</h3>
                        <p className="clase-item-fecha">
                          Tomada el {new Date(clase.fecha_tomada).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Clases Disponibles */}
              {clasesDisponibles.length > 0 && (
                <div className="clases-disponibles">
                  <h3 className="clases-disponibles-title">Nuevas clases disponibles</h3>
                  <div className="clases-disponibles-list">
                    {clasesDisponibles.map((clase) => (
                      <div key={clase.id} className="clase-item clase-item-disponible">
                        <div className="clase-item-icon">{clase.icono}</div>
                        <div className="clase-item-content">
                          <h3 className="clase-item-title">{clase.titulo}</h3>
                          <button
                            onClick={() => handleTomarClase(clase)}
                            className="btn btn--primary btn--small"
                          >
                            Tomar clase
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {clases.length > 0 && clasesDisponibles.length === 0 && (
                <div className="clases-completadas">
                  <p className="clases-completadas-message">🎉 ¡Has completado todas las clases disponibles!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de Clase */}
      {showModal && claseSeleccionada && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <span className="modal-icon">{claseSeleccionada.icono}</span>
                {claseSeleccionada.titulo}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-text">{claseSeleccionada.contenido}</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn--secondary">
                Cerrar
              </button>
              <button onClick={handleGuardarClase} className="btn btn--primary">
                ✅ Marcar como tomada
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
