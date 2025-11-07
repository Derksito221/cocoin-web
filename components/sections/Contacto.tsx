'use client'

export default function Contacto() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    const subject = encodeURIComponent(`Mensaje desde COCOIN Web - ${name}`)
    const body = encodeURIComponent(`Nombre: ${name}\n\nEmail: ${email}\n\nMensaje:\n${message}`)
    const mailtoLink = `mailto:duglita00@hotmail.com?subject=${subject}&body=${body}`

    window.location.href = mailtoLink

    setTimeout(() => {
      alert('¡Gracias por tu mensaje! Tu cliente de correo se abrirá para enviar el mensaje.')
      e.currentTarget.reset()
    }, 500)
  }

  return (
    <section id="contacto" className="contacto section">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Conéctate</span>
          <h2 className="section__title">Contacto y Comunidad</h2>
          <p className="section__subtitle">Únete al corral y sé parte de la comunidad</p>
        </div>
        <div className="contacto__content">
          <div className="contacto__social">
            <h3>Síguenos en redes</h3>
            <div className="social__links">
              <a
                href="https://t.me/cocoinelgallo"
                target="_blank"
                rel="noopener noreferrer"
                className="social__link telegram"
              >
                <span className="social__icon">📱</span>
                <div className="social__text">
                  <h4>Telegram</h4>
                  <p>Únete al corral</p>
                </div>
              </a>
              <a
                href="https://twitter.com/cocoin"
                target="_blank"
                rel="noopener noreferrer"
                className="social__link twitter"
              >
                <span className="social__icon">🐦</span>
                <div className="social__text">
                  <h4>Twitter / X</h4>
                  <p>Síguenos para updates</p>
                </div>
              </a>
              <a
                href="https://www.reddit.com/r/cocoinELGALLO"
                target="_blank"
                rel="noopener noreferrer"
                className="social__link reddit"
              >
                <span className="social__icon">🆘</span>
                <div className="social__text">
                  <h4>Reddit</h4>
                  <p>Comunidad y discusión</p>
                </div>
              </a>
            </div>
          </div>
          <div className="contacto__form">
            <h3>Contacto Directo</h3>
            <form id="contactForm" className="form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form__group">
                <label htmlFor="message">Mensaje</label>
                <textarea id="message" name="message" rows={5} required />
              </div>
              <button type="submit" className="btn btn--secondary">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

