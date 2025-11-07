import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Historia from '@/components/sections/Historia'
import Fase2 from '@/components/sections/Fase2'
import Educacion from '@/components/sections/Educacion'
import Reconocimientos from '@/components/sections/Reconocimientos'
import Contacto from '@/components/sections/Contacto'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Historia />
      <Fase2 />
      <Educacion />
      <Reconocimientos />
      <Contacto />
      <Footer />
    </main>
  )
}

