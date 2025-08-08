import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import GameCard from './components/GameCard'

function App() {
  const games = [
    {
      title: 'Connecta 4',
      description: 'Juego clásico de estrategia donde debes conectar 4 fichas en línea. ¡Desafía a la IA o juega con un amigo!',
      url: '/connecta4',
      emoji: '🔴',
      status: 'live' as const,
      technologies: ['React', 'TypeScript', 'CSS']
    },
    {
      title: 'Quest Forge',
      description: 'Herramienta para crear y gestionar aventuras de rol. Diseña campañas épicas con personajes, ubicaciones y misiones.',
      url: '/quest-forge',
      emoji: '⚔️',
      status: 'dev' as const,
      technologies: ['React', 'TypeScript', 'Tailwind CSS']
    }
  ];

  return (
    <Layout>
      <Header title="Games Hub de Javi" />
      
      <section className="games-section">
        <div className="games-grid">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              url={game.url}
              emoji={game.emoji}
              status={game.status}
              technologies={game.technologies}
            />
          ))}
        </div>
      </section>
      
      <section className="about-section">
        <div className="about-content">
          <h2>Sobre este Hub</h2>
          <p>
            Bienvenido a mi colección personal de juegos web. Cada proyecto está desarrollado 
            con tecnologías modernas y está pensado para ofrecer una experiencia divertida 
            y desafiante.
          </p>
          <p>
            Los juegos están en constante evolución, añadiendo nuevas características y 
            mejorando la experiencia de usuario.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default App
