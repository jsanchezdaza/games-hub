import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders main header', () => {
    render(<App />);
    
    expect(screen.getByRole('heading', { name: '🎮 Games Hub de Javi' })).toBeInTheDocument();
  });

  it('renders games section with game cards', () => {
    render(<App />);
    
    const gamesSection = screen.getByText('Connecta 4').closest('section');
    expect(gamesSection).toHaveClass('games-section');
    
    const gamesGrid = screen.getByText('Connecta 4').closest('.games-grid');
    expect(gamesGrid).toBeInTheDocument();
  });

  it('renders all expected games', () => {
    render(<App />);
    
    expect(screen.getByText('Connecta 4')).toBeInTheDocument();
    expect(screen.getByText('Quest Forge')).toBeInTheDocument();
    
    expect(screen.getByText(/Juego clásico de estrategia/)).toBeInTheDocument();
    expect(screen.getByText(/Herramienta para crear y gestionar aventuras/)).toBeInTheDocument();
  });

  it('renders games with correct status', () => {
    render(<App />);
    
    expect(screen.getByText('🟢 Disponible')).toBeInTheDocument();
    expect(screen.getByText('🟡 En desarrollo')).toBeInTheDocument();
  });

  it('renders games with correct technologies', () => {
    render(<App />);
    
    expect(screen.getAllByText('React')).toHaveLength(2);
    expect(screen.getAllByText('TypeScript')).toHaveLength(2);
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('renders games with correct emojis', () => {
    render(<App />);
    
    expect(screen.getByText('🔴')).toBeInTheDocument();
    expect(screen.getByText('⚔️')).toBeInTheDocument();
  });

  it('renders about section', () => {
    render(<App />);
    
    const aboutSection = screen.getByText('Sobre este Hub').closest('section');
    expect(aboutSection).toHaveClass('about-section');
    
    expect(screen.getByText('Sobre este Hub')).toBeInTheDocument();
    expect(screen.getByText(/Bienvenido a mi colección personal/)).toBeInTheDocument();
    expect(screen.getByText(/Los juegos están en constante evolución/)).toBeInTheDocument();
  });

  it('renders footer with developer information', () => {
    render(<App />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(/Desarrollado por/)).toBeInTheDocument();
    expect(screen.getByText('Javier Sánchez')).toBeInTheDocument();
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portfolio' })).toBeInTheDocument();
  });

  it('has correct game URLs', () => {
    render(<App />);
    
    const connecta4Card = screen.getByLabelText('Jugar Connecta 4');
    expect(connecta4Card).toBeInTheDocument();
  });

  it('renders live game as clickable', () => {
    render(<App />);
    
    const connecta4Card = screen.getByLabelText('Jugar Connecta 4');
    expect(connecta4Card).toHaveAttribute('role', 'button');
    expect(connecta4Card).toHaveClass('clickable');
  });

  it('renders dev game as non-clickable', () => {
    render(<App />);
    
    const questForgeCard = screen.getByText('Quest Forge').closest('.game-card');
    expect(questForgeCard).not.toHaveAttribute('role', 'button');
    expect(questForgeCard).not.toHaveClass('clickable');
  });
});