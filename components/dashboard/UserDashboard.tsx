'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
// Image no necesario aquí

interface User {
  email: string
  id: string
  user_metadata?: {
    username?: string
    role?: string
  }
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      
      if (!currentUser) {
        router.push('/login')
        return
      }

      setUser({
        email: currentUser.email || '',
        id: currentUser.id,
        user_metadata: currentUser.user_metadata,
      })
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Usuario'
  const role = user.user_metadata?.role || 'Gallina del corral'

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Bienvenido al corral, donde cada grano tiene propósito</h1>
          <p className="dashboard-subtitle">El canto justo comienza aquí</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Tu Perfil</h2>
          </div>
          <div className="dashboard-card-body">
            <div className="profile-info">
              <div className="profile-avatar">
                <span>{username.charAt(0).toUpperCase()}</span>
              </div>
              <div className="profile-details">
                <h3>{username}</h3>
                <p className="profile-email">{user.email}</p>
                <div className="profile-role">
                  <span className="role-badge">{role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Recompensas y Logros</h2>
          </div>
          <div className="dashboard-card-body">
            <div className="rewards-placeholder">
              <p>🎁 Próximamente: Tus recompensas y logros aparecerán aquí</p>
              <p className="rewards-hint">
                Completa clases, participa en retos y gana tokens $COCO
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Clases y Contenido</h2>
          </div>
          <div className="dashboard-card-body">
            <div className="content-placeholder">
              <p>📚 Próximamente: Acceso a contenido educativo exclusivo</p>
              <p className="content-hint">
                Aprende sobre blockchain, NFTs, staking y más
              </p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button onClick={handleLogout} className="btn btn--secondary">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

