import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <div className="footer__brand">
            <Image
              src="/images/Logo cuadrado optimi.png"
              alt="COCOIN"
              width={60}
              height={60}
              className="footer__logo"
            />
            <p>Proyecto educativo y comunitario basado en blockchain.</p>
          </div>
          <div className="footer__links">
            <h4>Enlaces</h4>
            <ul>
              <li><Link href="/#inicio">Inicio</Link></li>
              <li><Link href="/#historia">Historia</Link></li>
              <li><Link href="/#fase2">Fase 2</Link></li>
              <li><Link href="/#educacion">Educación</Link></li>
              <li><Link href="/#reconocimientos">Reconocimientos</Link></li>
            </ul>
          </div>
          <div className="footer__social">
            <h4>Síguenos</h4>
            <div className="footer__social-links">
              <a href="https://t.me/cocoinelgallo" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
              <a href="https://twitter.com/cocoin" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://www.reddit.com/r/cocoinELGALLO" target="_blank" rel="noopener noreferrer">
                Reddit
              </a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2024 COCOIN. Todos los derechos reservados. Hecho con ❤️ para el corral.</p>
        </div>
      </div>
    </footer>
  )
}

