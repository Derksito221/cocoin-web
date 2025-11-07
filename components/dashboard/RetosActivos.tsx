'use client'

export default function RetosActivos() {
  // Por ahora, lista vacía - preparado para expansión futura
  const retos: any[] = []

  return (
    <div className="dashboard-card dashboard-card-retos">
      <div className="dashboard-card-header">
        <span className="card-icon">🎯</span>
        <h2>Retos activos</h2>
      </div>
      <div className="dashboard-card-body">
        {retos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🌾</div>
            <p className="empty-state-title">No hay retos activos</p>
            <p className="empty-state-description">
              Próximamente podrás participar en retos comunitarios y ganar recompensas.
            </p>
          </div>
        ) : (
          <div className="retos-list">
            {retos.map((reto, index) => (
              <div key={index} className="reto-item">
                {/* Lista de retos cuando esté disponible */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

