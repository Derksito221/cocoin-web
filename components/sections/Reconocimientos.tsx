import Image from 'next/image'

export default function Reconocimientos() {
  return (
    <section id="reconocimientos" className="reconocimientos section section--alt">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Agradecimientos</span>
          <h2 className="section__title">Reconocimientos</h2>
          <p className="section__subtitle">A los primeros creyentes del proyecto</p>
        </div>
        <div className="reconocimientos__content">
          <div className="reconocimientos__text">
            <p>COCOIN existe gracias a quienes creyeron antes de que el canto fuera fuerte. Este proyecto nació con propósito educativo, transparencia y fe en la comunidad.</p>
            <p>Muy pronto lanzaremos NFTs de reconocimiento para los primeros sembradores del corral: aquellos que apostaron por construir algo auténtico desde el inicio.</p>
          </div>
          <div className="reconocimientos__illustration">
            <Image
              src="/images/3c178c18-bd1a-42cb-894c-0779b98f27b9.jfif"
              alt="Reconocimientos"
              width={500}
              height={500}
              className="reconocimientos-img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

