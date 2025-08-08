import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders title with gaming emoji', () => {
    render(<Header title="Test Title" />);
    
    const heading = screen.getByRole('heading', { name: '🎮 Test Title' });
    expect(heading).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Header title="Test Title" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
    
    const content = header.querySelector('.header-content');
    expect(content).toBeInTheDocument();
    
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('title');
  });

  it('displays the exact title passed as prop', () => {
    const customTitle = 'My Custom Games Hub';
    render(<Header title={customTitle} />);
    
    expect(screen.getByText(`🎮 ${customTitle}`)).toBeInTheDocument();
  });
});