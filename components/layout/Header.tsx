'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          <Image
            src="/images/Logo cuadrado optimi.png"
            alt="COCOIN Logo"
            width={40}
            height={40}
            className="logo-img"
          />
          <span className="logo-text">COCOIN</span>
        </Link>
        <ul className={`nav__menu ${isMenuOpen ? 'show' : ''}`} id="nav-menu">
          <li className="nav__item">
            <Link href="/#inicio" className={`nav__link ${isActive('/') ? 'active' : ''}`}>
              Inicio
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/#historia" className="nav__link">
              Nuestra Historia
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/#fase2" className="nav__link">
              Fase 2
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/#educacion" className="nav__link">
              Educación
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/#reconocimientos" className="nav__link">
              Reconocimientos
            </Link>
          </li>
          <li className="nav__item">
            <Link href="/#contacto" className="nav__link">
              Contacto
            </Link>
          </li>
          <li className="nav__item">
            {isLoggedIn ? (
              <Link href="/dashboard" className="nav__link">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn btn--primary nav__login">
                Entrar
              </Link>
            )}
          </li>
        </ul>
        <div
          className={`nav__toggle ${isMenuOpen ? 'active' : ''}`}
          id="nav-toggle"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  )
}

