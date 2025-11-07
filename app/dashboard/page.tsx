import Header from '@/components/layout/Header'
import UserDashboard from '@/components/dashboard/UserDashboard'
import Footer from '@/components/layout/Footer'

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="dashboard-page">
        <UserDashboard />
      </main>
      <Footer />
    </>
  )
}

