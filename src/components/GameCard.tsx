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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'live': return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'dev': return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      case 'coming-soon': return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
      default: return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live': return '🟢 Available';
      case 'dev': return '🟡 In Development';
      case 'coming-soon': return '⏳ Coming Soon';
      default: return 'Unknown Status';
    }
  };

  return (
    <div 
      className={`game-card ${status === 'live' ? 'clickable' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={status === 'live' ? 0 : undefined}
      role={status === 'live' ? 'button' : undefined}
      aria-label={status === 'live' ? `Play ${title}` : undefined}
    >
      <div className="game-card-header">
        <span className="game-emoji">{emoji}</span>
        <div className="game-status" style={{ background: getStatusColor() }}>
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
          <span className="play-text">Play now! →</span>
        </div>
      )}
    </div>
  );
}