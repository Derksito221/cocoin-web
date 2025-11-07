'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          type="button"
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Registrarse
        </button>
      </div>

      <div className="auth-content">
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  )
}

