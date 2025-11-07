import Image from 'next/image'

export default function Hero() {
  return (
    <section id="inicio" className="hero section">
      <div className="hero__container container">
        <div className="hero__content">
          <h1 className="hero__title">
            COCOIN nació sin humo.<br />
            No explotó.<br />
            Pero sembró.<br />
            Y ahora... viene la segunda fase.
          </h1>
          <p className="hero__subtitle">
            Un proyecto educativo y comunitario basado en blockchain.<br />
            Transparencia, educación y crecimiento juntos.
          </p>
          <div className="hero__buttons">
            <a
              href="https://t.me/cocoinelgallo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Únete al corral
            </a>
            <a
              href="https://four.meme/token/0x44446c586502daa35da962c4d389193c4954e801?code=GLDS2R7A5BRB"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--cta"
            >
              🚀 Comprar COCOIN
            </a>
          </div>
        </div>
        <div className="hero__image">
          <Image
            src="/images/photo_2025-10-27_11-26-01.jpg"
            alt="COCOIN"
            width={600}
            height={600}
            className="hero-img"
            priority
          />
        </div>
      </div>
      <div className="hero__wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path
            fill="rgba(255,255,255,0.1)"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}

