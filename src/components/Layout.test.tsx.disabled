import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders footer with developer info', () => {
    render(<Layout><div>Content</div></Layout>);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(/Desarrollado por/)).toBeInTheDocument();
    expect(screen.getByText('Javier Sánchez')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders footer links with correct attributes', () => {
    render(<Layout><div>Content</div></Layout>);
    
    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jsanchezdaza');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const portfolioLink = screen.getByRole('link', { name: 'Portfolio' });
    expect(portfolioLink).toHaveAttribute('href', 'https://javisan.dev');
    expect(portfolioLink).toHaveAttribute('target', '_blank');
    expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies correct CSS structure', () => {
    render(<Layout><div>Content</div></Layout>);
    
    const layout = screen.getByRole('main').parentElement;
    expect(layout).toHaveClass('layout');
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('main');
    
    const footerLinks = screen.getByText('GitHub').parentElement;
    expect(footerLinks).toHaveClass('footer-links');
  });
});