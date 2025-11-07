import Header from '@/components/layout/Header'
import AuthTabs from '@/components/auth/AuthTabs'
import Footer from '@/components/layout/Footer'

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="auth-page-container">
          <div className="auth-page-header">
            <h1>Bienvenido al Corral</h1>
            <p>Donde cada grano tiene propósito</p>
          </div>
          <AuthTabs />
        </div>
      </main>
      <Footer />
    </>
  )
}

