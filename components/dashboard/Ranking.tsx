'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface UsuarioRanking {
  user_id: string
  retos_completados: number
  user_email?: string
  user_metadata?: {
    username?: string
    role?: string
  }
}

export default function Ranking() {
  const [ranking, setRanking] = useState<UsuarioRanking[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    loadRanking()
  }, [])

  const loadRanking = async () => {
    try {
      // Obtener todos los retos completados agrupados por usuario
      const { data, error } = await supabase
        .from('retos_completados')
        .select('user_id')

      if (error) {
        console.error('Error cargando ranking:', error)
        setLoading(false)
        return
      }

      // Contar retos por usuario
      const retosPorUsuario: { [key: string]: number } = {}
      data?.forEach((reto) => {
        retosPorUsuario[reto.user_id] = (retosPorUsuario[reto.user_id] || 0) + 1
      })

      // Convertir a array y ordenar
      const rankingArray: UsuarioRanking[] = Object.entries(retosPorUsuario)
        .map(([user_id, retos_completados]) => ({
          user_id,
          retos_completados
        }))
        .sort((a, b) => b.retos_completados - a.retos_completados)
        .slice(0, 10) // Top 10

      // Cargar información de usuarios (simplificado - en producción usarías una tabla de perfiles)
      const rankingConUsuarios = await Promise.all(
        rankingArray.map(async (usuario) => {
          try {
            // Intentar obtener el email del usuario (esto requiere permisos especiales)
            // Por ahora, usaremos solo el user_id
            return {
              ...usuario,
              user_email: usuario.user_id.substring(0, 8) + '...',
              user_metadata: {}
            }
          } catch {
            return {
              ...usuario,
              user_email: 'Usuario',
              user_metadata: {}
            }
          }
        })
      )

      setRanking(rankingConUsuarios)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMedalla = (posicion: number) => {
    if (posicion === 0) return '🥇'
    if (posicion === 1) return '🥈'
    if (posicion === 2) return '🥉'
    return `${posicion + 1}.`
  }

  if (loading) {
    return (
      <div className="dashboard-card dashboard-card-ranking">
        <div className="dashboard-card-header">
          <span className="card-icon">🏆</span>
          <h2>Ranking del Corral</h2>
        </div>
        <div className="dashboard-card-body">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-card dashboard-card-ranking">
      <div className="dashboard-card-header">
        <span className="card-icon">🏆</span>
        <h2>Ranking del Corral</h2>
      </div>
      <div className="dashboard-card-body">
        {ranking.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌾</div>
            <p className="empty-state-title">Aún no hay ranking</p>
            <p className="empty-state-description">
              Completa retos para aparecer en el ranking de usuarios más activos.
            </p>
          </div>
        ) : (
          <div className="ranking-list">
            {ranking.map((usuario, index) => (
              <div key={usuario.user_id} className="ranking-item">
                <div className="ranking-posicion">
                  <span className="ranking-medalla">{getMedalla(index)}</span>
                </div>
                <div className="ranking-avatar">
                  <span className="ranking-avatar-text">
                    {usuario.user_email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ranking-info">
                  <div className="ranking-usuario">
                    {usuario.user_metadata?.username || usuario.user_email || 'Usuario'}
                  </div>
                  <div className="ranking-rol">
                    {usuario.user_metadata?.role || 'Gallina del corral'}
                  </div>
                </div>
                <div className="ranking-puntos">
                  <span className="ranking-puntos-value">{usuario.retos_completados}</span>
                  <span className="ranking-puntos-label">retos</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

