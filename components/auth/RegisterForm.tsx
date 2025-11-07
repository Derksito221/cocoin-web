'use client'

import { useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const validatePassword = (pass: string): string | null => {
    if (pass.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
    if (!/[A-Z]/.test(pass)) {
      return 'La contraseña debe contener al menos una mayúscula'
    }
    if (!/[a-z]/.test(pass)) {
      return 'La contraseña debe contener al menos una minúscula'
    }
    if (!/[0-9]/.test(pass)) {
      return 'La contraseña debe contener al menos un número'
    }
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validación básica
      if (!email || !password || !confirmPassword) {
        setError('Por favor completa todos los campos')
        setLoading(false)
        return
      }

      if (!email.includes('@')) {
        setError('Por favor ingresa un email válido')
        setLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        setLoading(false)
        return
      }

      const passwordError = validatePassword(password)
      if (passwordError) {
        setError(passwordError)
        setLoading(false)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) {
        setError(signUpError.message || 'Error al registrarse')
        setLoading(false)
        return
      }

      if (data.user) {
        // Mostrar mensaje de confirmación
        alert('¡Bienvenido al corral! Por favor verifica tu email para completar el registro.')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Ocurrió un error inesperado')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <div className="form-group">
        <label htmlFor="reg-email">Correo electrónico</label>
        <input
          type="email"
          id="reg-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Contraseña</label>
        <input
          type="password"
          id="reg-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres, mayúscula, minúscula y número"
          required
          disabled={loading}
          minLength={8}
        />
        <small className="form-hint">
          Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirmar contraseña</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repite tu contraseña"
          required
          disabled={loading}
          minLength={8}
        />
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Unirse al corral'}
      </button>
    </form>
  )
}

