export default function Educacion() {
  return (
    <section id="educacion" className="educacion section">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Aprende</span>
          <h2 className="section__title">Educación Blockchain</h2>
          <p className="section__subtitle">Memes educativos y guías prácticas para el corral</p>
        </div>
        <div className="educacion__memes">
          <div className="meme__card">
            <div className="meme__emoji">💼</div>
            <h3>Wallets</h3>
            <p>Aprende a crear, gestionar y proteger tu wallet de criptomonedas.</p>
            <a href="#" className="meme__link">Ver guía →</a>
          </div>
          <div className="meme__card">
            <div className="meme__emoji">🔒</div>
            <h3>Seguridad</h3>
            <p>Protege tus activos digitales con buenas prácticas de seguridad.</p>
            <a href="#" className="meme__link">Ver guía →</a>
          </div>
          <div className="meme__card">
            <div className="meme__emoji">🪂</div>
            <h3>Staking</h3>
            <p>Todo lo que necesitas saber sobre staking y cómo participar.</p>
            <a href="#" className="meme__link">Ver guía →</a>
          </div>
          <div className="meme__card">
            <div className="meme__emoji">🖼️</div>
            <h3>NFTs</h3>
            <p>Comprende qué son los NFTs, cómo funcionan y cómo participar.</p>
            <a href="#" className="meme__link">Ver guía →</a>
          </div>
        </div>
      </div>
    </section>
  )
}

