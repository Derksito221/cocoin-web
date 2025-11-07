'use client'

interface MiRolProps {
  username: string
  email: string
  role: string
}

export default function MiRol({ username, email, role }: MiRolProps) {
  const initial = username.charAt(0).toUpperCase()

  return (
    <div className="dashboard-card dashboard-card-role">
      <div className="dashboard-card-header">
        <span className="card-icon">👑</span>
        <h2>Mi rol en el corral</h2>
      </div>
      <div className="dashboard-card-body">
        <div className="role-profile">
          <div className="role-avatar">
            <span className="role-avatar-text">{initial}</span>
            <div className="role-avatar-badge">🐔</div>
          </div>
          <div className="role-info">
            <h3 className="role-name">{username}</h3>
            <p className="role-email">{email}</p>
            <div className="role-badge-container">
              <span className="role-badge-new">{role}</span>
            </div>
          </div>
        </div>
        <div className="role-description">
          <p>Eres parte del corral desde el inicio. Tu participación y compromiso con la educación blockchain nos hacen crecer juntos.</p>
        </div>
      </div>
    </div>
  )
}

