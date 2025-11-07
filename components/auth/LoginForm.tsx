'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validación básica
      if (!email || !password) {
        setError('Por favor completa todos los campos')
        setLoading(false)
        return
      }

      if (!email.includes('@')) {
        setError('Por favor ingresa un email válido')
        setLoading(false)
        return
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || 'Error al iniciar sesión')
        setLoading(false)
        return
      }

      if (data.user) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Ocurrió un error inesperado')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
          minLength={6}
        />
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Entrar al corral'}
      </button>
    </form>
  )
}

