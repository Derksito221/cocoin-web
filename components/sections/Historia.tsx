export default function Historia() {
  return (
    <section id="historia" className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Sobre Nosotros</span>
          <h2 className="section__title">Nuestra Historia</h2>
        </div>
        <div className="historia__grid">
          <div className="historia__card">
            <div className="historia__icon">🌱</div>
            <h3 className="historia__card-title">Sin Preminteo</h3>
            <p className="historia__card-text">
              COCOIN nació sin minería anticipada. No hubo reparto de tokens antes del lanzamiento. Crecimos desde cero, con transparencia total.
            </p>
          </div>
          <div className="historia__card">
            <div className="historia__icon">🚫</div>
            <h3 className="historia__card-title">Sin Hype</h3>
            <p className="historia__card-text">
              Optamos por un crecimiento orgánico. Sin promesas vacías, sin campañas de marketing engañosas. Solo trabajo real y propósito claro.
            </p>
          </div>
          <div className="historia__card">
            <div className="historia__icon">🎯</div>
            <h3 className="historia__card-title">Con Propósito</h3>
            <p className="historia__card-text">
              Educación, comunidad y transparencia. Estos son los pilares sobre los que construimos el futuro de COCOIN.
            </p>
          </div>
        </div>
        <div className="valores">
          <h3 className="valores__title">Nuestros Valores</h3>
          <div className="valores__grid">
            <div className="valor__item">
              <span className="valor__emoji">💎</span>
              <h4>Transparencia</h4>
              <p>Cada decisión es pública y explicada a la comunidad.</p>
            </div>
            <div className="valor__item">
              <span className="valor__emoji">📚</span>
              <h4>Educación</h4>
              <p>Aprendemos juntos sobre blockchain, seguridad y NFTs.</p>
            </div>
            <div className="valor__item">
              <span className="valor__emoji">🤝</span>
              <h4>Comunidad</h4>
              <p>Crecemos juntos, sin exclusiones ni favores especiales.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

