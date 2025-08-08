import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCard from './GameCard';

const mockProps = {
  title: 'Test Game',
  description: 'Test game description',
  url: '/test-game',
  emoji: '🎮',
  status: 'live' as const,
  technologies: ['React', 'TypeScript']
};

describe('GameCard Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'open', {
      writable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all game information correctly', () => {
    render(<GameCard {...mockProps} />);
    
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('Test game description')).toBeInTheDocument();
    expect(screen.getByText('🎮')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  describe('Live games', () => {
    it('renders live status correctly', () => {
      render(<GameCard {...mockProps} status="live" />);
      
      expect(screen.getByText('🟢 Disponible')).toBeInTheDocument();
      expect(screen.getByText('¡Jugar ahora! →')).toBeInTheDocument();
    });

    it('opens game URL when clicked', () => {
      render(<GameCard {...mockProps} status="live" />);
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(window.open).toHaveBeenCalledWith('/test-game', '_blank');
    });

    it('opens game URL when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<GameCard {...mockProps} status="live" />);
      
      const card = screen.getByRole('button');
      await user.type(card, '{enter}');
      
      expect(window.open).toHaveBeenCalledWith('/test-game', '_blank');
    });

    it('opens game URL when Space key is pressed', async () => {
      const user = userEvent.setup();
      render(<GameCard {...mockProps} status="live" />);
      
      const card = screen.getByRole('button');
      await user.type(card, ' ');
      
      expect(window.open).toHaveBeenCalledWith('/test-game', '_blank');
    });

    it('has correct accessibility attributes', () => {
      render(<GameCard {...mockProps} status="live" />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('aria-label', 'Jugar Test Game');
      expect(card).toHaveClass('clickable');
    });
  });

  describe('Development games', () => {
    it('renders dev status correctly', () => {
      render(<GameCard {...mockProps} status="dev" />);
      
      expect(screen.getByText('🟡 En desarrollo')).toBeInTheDocument();
      expect(screen.queryByText('¡Jugar ahora! →')).not.toBeInTheDocument();
    });

    it('does not open URL when clicked', () => {
      render(<GameCard {...mockProps} status="dev" />);
      
      const card = screen.getByText('Test Game').closest('.game-card');
      fireEvent.click(card!);
      
      expect(window.open).not.toHaveBeenCalled();
    });

    it('does not have button role or accessibility attributes', () => {
      render(<GameCard {...mockProps} status="dev" />);
      
      const card = screen.getByText('Test Game').closest('.game-card');
      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('tabIndex');
      expect(card).not.toHaveAttribute('aria-label');
      expect(card).not.toHaveClass('clickable');
    });
  });

  describe('Coming soon games', () => {
    it('renders coming-soon status correctly', () => {
      render(<GameCard {...mockProps} status="coming-soon" />);
      
      expect(screen.getByText('⏳ Próximamente')).toBeInTheDocument();
      expect(screen.queryByText('¡Jugar ahora! →')).not.toBeInTheDocument();
    });
  });

  describe('Status colors and styling', () => {
    it('applies correct status colors for live games', () => {
      render(<GameCard {...mockProps} status="live" />);
      
      const statusElement = screen.getByText('🟢 Disponible');
      expect(statusElement).toHaveStyle({
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      });
    });

    it('applies correct status colors for dev games', () => {
      render(<GameCard {...mockProps} status="dev" />);
      
      const statusElement = screen.getByText('🟡 En desarrollo');
      expect(statusElement).toHaveStyle({
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
      });
    });

    it('applies correct status colors for coming-soon games', () => {
      render(<GameCard {...mockProps} status="coming-soon" />);
      
      const statusElement = screen.getByText('⏳ Próximamente');
      expect(statusElement).toHaveStyle({
        background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
      });
    });
  });

  it('renders multiple technologies as tags', () => {
    const technologies = ['React', 'TypeScript', 'Tailwind CSS', 'Jest'];
    render(<GameCard {...mockProps} technologies={technologies} />);
    
    technologies.forEach(tech => {
      const techElement = screen.getByText(tech);
      expect(techElement).toBeInTheDocument();
      expect(techElement).toHaveClass('tech-tag');
    });
  });
});