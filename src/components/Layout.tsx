import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <p>Desarrollado por <strong>Javier Sánchez</strong> | {new Date().getFullYear()}</p>
        <div className="footer-links">
          <a href="https://github.com/jsanchezdaza" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://javisan.dev" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
}