'use client'

export default function ClasesTomadas() {
  // Por ahora, lista vacía - preparado para expansión futura
  const clases: any[] = []

  return (
    <div className="dashboard-card dashboard-card-clases">
      <div className="dashboard-card-header">
        <span className="card-icon">📚</span>
        <h2>Clases tomadas</h2>
      </div>
      <div className="dashboard-card-body">
        {clases.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🥚</div>
            <p className="empty-state-title">Aún no has tomado clases</p>
            <p className="empty-state-description">
              Próximamente podrás acceder a contenido educativo exclusivo sobre blockchain, NFTs y más.
            </p>
          </div>
        ) : (
          <div className="clases-list">
            {clases.map((clase, index) => (
              <div key={index} className="clase-item">
                {/* Lista de clases cuando esté disponible */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

