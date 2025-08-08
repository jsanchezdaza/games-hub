interface GameCardProps {
  title: string;
  description: string;
  url: string;
  emoji: string;
  status: 'live' | 'dev' | 'coming-soon';
  technologies: string[];
}

export default function GameCard({ title, description, url, emoji, status, technologies }: GameCardProps) {
  const handleClick = () => {
    if (status === 'live') {
      window.open(url, '_blank');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'live': return '#10b981';
      case 'dev': return '#f59e0b';
      case 'coming-soon': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live': return 'Disponible';
      case 'dev': return 'En desarrollo';
      case 'coming-soon': return 'Próximamente';
      default: return 'Estado desconocido';
    }
  };

  return (
    <div 
      className={`game-card ${status === 'live' ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="game-card-header">
        <span className="game-emoji">{emoji}</span>
        <div className="game-status" style={{ backgroundColor: getStatusColor() }}>
          {getStatusText()}
        </div>
      </div>
      
      <div className="game-card-content">
        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>
        
        <div className="game-technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {status === 'live' && (
        <div className="game-card-footer">
          <span className="play-text">¡Jugar ahora! →</span>
        </div>
      )}
    </div>
  );
}