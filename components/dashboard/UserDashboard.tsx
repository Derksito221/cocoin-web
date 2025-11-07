'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import MiRol from './MiRol'
import ClasesTomadas from './ClasesTomadas'
import RetosActivos from './RetosActivos'
import MiCantoDiario from './MiCantoDiario'
import Comunidad from './Comunidad'
import RetoDelCorral from './RetoDelCorral'
import Ranking from './Ranking'

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
  const [activeSection, setActiveSection] = useState<string>('inicio')
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
        <div className="loading-spinner">🐔</div>
        <p>Cargando tu corral...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Usuario'
  const role = user.user_metadata?.role || 'Gallina del corral'

  return (
    <div className="dashboard-new">
      {/* Header del Dashboard */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <h1 className="dashboard-hero-title">
            <span className="dashboard-hero-icon">🐔</span>
            El canto justo comienza aquí
          </h1>
          <p className="dashboard-hero-subtitle">
            Bienvenido al corral, {username}
          </p>
        </div>
      </div>

      {/* Navegación de Secciones */}
      <div className="dashboard-nav">
        <div className="dashboard-nav-container">
          <button
            className={`dashboard-nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
            onClick={() => setActiveSection('inicio')}
          >
            🏠 Inicio
          </button>
          <button
            className={`dashboard-nav-item ${activeSection === 'clases' ? 'active' : ''}`}
            onClick={() => setActiveSection('clases')}
          >
            📚 Clases
          </button>
          <button
            className={`dashboard-nav-item ${activeSection === 'retos' ? 'active' : ''}`}
            onClick={() => setActiveSection('retos')}
          >
            🎯 Retos
          </button>
          <button
            className={`dashboard-nav-item ${activeSection === 'comunidad' ? 'active' : ''}`}
            onClick={() => setActiveSection('comunidad')}
          >
            👥 Comunidad
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="dashboard-container">
        {/* Sección: Inicio */}
        {activeSection === 'inicio' && (
          <>
            {/* Mi Rol en el Corral */}
            <MiRol username={username} email={user.email} role={role} />

            {/* Reto del Corral (Dinámica Viral) */}
            <RetoDelCorral />

            {/* Ranking del Corral */}
            <Ranking />

            {/* Mi Canto Diario */}
            <MiCantoDiario userId={user.id} />

            {/* Botón de Cerrar Sesión */}
            <div className="dashboard-logout">
              <button onClick={handleLogout} className="btn btn--logout">
                <span className="btn-icon">🚪</span>
                Salir del corral
              </button>
            </div>
          </>
        )}

        {/* Sección: Clases */}
        {activeSection === 'clases' && (
          <>
            <ClasesTomadas />
            <div className="dashboard-logout">
              <button onClick={handleLogout} className="btn btn--logout">
                <span className="btn-icon">🚪</span>
                Salir del corral
              </button>
            </div>
          </>
        )}

        {/* Sección: Retos */}
        {activeSection === 'retos' && (
          <>
            <RetosActivos />
            <RetoDelCorral />
            <div className="dashboard-logout">
              <button onClick={handleLogout} className="btn btn--logout">
                <span className="btn-icon">🚪</span>
                Salir del corral
              </button>
            </div>
          </>
        )}

        {/* Sección: Comunidad */}
        {activeSection === 'comunidad' && (
          <>
            <Comunidad />
            <div className="dashboard-logout">
              <button onClick={handleLogout} className="btn btn--logout">
                <span className="btn-icon">🚪</span>
                Salir del corral
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
