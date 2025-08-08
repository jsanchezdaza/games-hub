import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import GameCard from './components/GameCard'

function App() {
  const games = [
    {
      title: 'Connect 4',
      description: 'Classic strategy game where you must connect 4 pieces in a row. Challenge the AI or play with a friend!',
      url: '/connect4',
      emoji: '🔴',
      status: 'live' as const,
      technologies: ['React', 'TypeScript', 'CSS']
    },
    {
      title: 'Quest Forge',
      description: 'Classic text-based role-playing game. Create your story, level up and embark on an epic adventure.',
      url: '/quest-forge',
      emoji: '⚔️',
      status: 'dev' as const,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase']
    }
  ];

  return (
    <Layout>
      <Header title="Javi's Games Hub" />
      
      <main className="main">
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
            <h2>About this Hub</h2>
            <p>
              Welcome to my personal collection of web games. Each project is developed 
              with modern technologies and designed to offer a fun and challenging experience.
            </p>
            <p>
              The games are constantly evolving, adding new features and 
              improving the user experience.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default App
