import Image from 'next/image'

export default function Fase2() {
  return (
    <section id="fase2" className="fase2 section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">El Futuro</span>
          <h2 className="section__title">Fase 2 - Lo que Viene</h2>
        </div>
        <div className="fase2__content">
          <div className="fase2__illustration">
            <Image
              src="/images/Un pollo caricatures 1.png"
              alt="COCOIN Educación"
              width={500}
              height={500}
              className="fase2-img"
            />
          </div>
          <div className="fase2__features">
            <div className="feature__item">
              <div className="feature__number">01</div>
              <div className="feature__content">
                <h3>NFTs con Propósito</h3>
                <p>Crearemos NFTs únicos que no solo sean arte, sino que representen participación en la comunidad y otorguen beneficios reales.</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__number">02</div>
              <div className="feature__content">
                <h3>Nuevo Token</h3>
                <p>Un token mejorado con mecanismos de distribución justos y sostenibles para toda la comunidad.</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__number">03</div>
              <div className="feature__content">
                <h3>Staking Pool</h3>
                <p>Un sistema de staking transparente que recompensa a quienes participan activamente en la comunidad.</p>
              </div>
            </div>
            <div className="feature__item">
              <div className="feature__number">04</div>
              <div className="feature__content">
                <h3>Guías Educativas</h3>
                <p>Recursos completos sobre wallets, seguridad, NFTs y blockchain para todos los niveles de conocimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

