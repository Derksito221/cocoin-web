'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'

interface Publicacion {
  id: string
  user_id: string
  contenido: string
  fecha_publicacion: string
  user_email?: string
  user_metadata?: {
    username?: string
    role?: string
  }
}

export default function Comunidad() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])
  const [nuevaPublicacion, setNuevaPublicacion] = useState('')
  const [loading, setLoading] = useState(true)
  const [publicando, setPublicando] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createSupabaseClient()

  useEffect(() => {
    loadUser()
    loadPublicaciones()
    
    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('comunidad_publicaciones')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comunidad_publicaciones' },
        () => {
          loadPublicaciones()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error cargando usuario:', error)
    }
  }

  const loadPublicaciones = async () => {
    try {
      const { data, error } = await supabase
        .from('comunidad_publicaciones')
        .select('*')
        .order('fecha_publicacion', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error cargando publicaciones:', error)
      } else {
        // Por ahora, usar solo los datos de la publicación
        // En el futuro, se puede crear una tabla de perfiles para obtener más información
        const publicacionesConUsuarios = (data || []).map((pub) => ({
          ...pub,
          user_email: pub.user_id.substring(0, 8) + '...',
          user_metadata: {}
        }))
        setPublicaciones(publicacionesConUsuarios)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublicar = async () => {
    if (!nuevaPublicacion.trim()) {
      alert('Por favor escribe algo antes de publicar')
      return
    }

    if (!user) {
      alert('Debes estar logueado para publicar')
      return
    }

    setPublicando(true)

    try {
      const { error } = await supabase
        .from('comunidad_publicaciones')
        .insert({
          user_id: user.id,
          contenido: nuevaPublicacion
        })

      if (error) {
        console.error('Error publicando:', error)
        alert('Error al publicar')
      } else {
        setNuevaPublicacion('')
        loadPublicaciones()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al publicar')
    } finally {
      setPublicando(false)
    }
  }

  const getInitial = (email: string) => {
    return email?.charAt(0).toUpperCase() || 'U'
  }

  const getRole = (metadata: any) => {
    return metadata?.role || 'Gallina del corral'
  }

  if (loading) {
    return (
      <div className="dashboard-card dashboard-card-comunidad">
        <div className="dashboard-card-header">
          <span className="card-icon">👥</span>
          <h2>Comunidad</h2>
        </div>
        <div className="dashboard-card-body">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-card dashboard-card-comunidad">
      <div className="dashboard-card-header">
        <span className="card-icon">👥</span>
        <h2>Comunidad del Corral</h2>
      </div>
      <div className="dashboard-card-body">
        {/* Formulario de Publicación */}
        {user && (
          <div className="comunidad-form">
            <textarea
              className="comunidad-textarea"
              value={nuevaPublicacion}
              onChange={(e) => setNuevaPublicacion(e.target.value)}
              placeholder="¿Qué quieres compartir con el corral? Escribe tu mensaje aquí..."
              rows={3}
            />
            <button
              onClick={handlePublicar}
              disabled={publicando || !nuevaPublicacion.trim()}
              className="btn btn--primary btn--publicar"
            >
              {publicando ? 'Publicando...' : '📢 Publicar en el corral'}
            </button>
          </div>
        )}

        {/* Muro de Publicaciones */}
        <div className="comunidad-muro">
          <h3 className="comunidad-muro-title">Muro del Corral</h3>
          {publicaciones.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🌾</div>
              <p className="empty-state-title">Aún no hay publicaciones</p>
              <p className="empty-state-description">
                Sé el primero en compartir algo con el corral.
              </p>
            </div>
          ) : (
            <div className="publicaciones-list">
              {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="publicacion-item">
                  <div className="publicacion-header">
                    <div className="publicacion-avatar">
                      <span className="publicacion-avatar-text">
                        {getInitial(publicacion.user_email || '')}
                      </span>
                    </div>
                    <div className="publicacion-info">
                      <div className="publicacion-usuario">
                        {publicacion.user_metadata?.username || publicacion.user_email?.split('@')[0] || 'Usuario'}
                      </div>
                      <div className="publicacion-rol">
                        {getRole(publicacion.user_metadata)}
                      </div>
                    </div>
                    <div className="publicacion-fecha">
                      {new Date(publicacion.fecha_publicacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="publicacion-contenido">
                    {publicacion.contenido}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

