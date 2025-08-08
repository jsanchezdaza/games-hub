interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">🎮 {title}</h1>
        <p className="subtitle">Una colección de juegos creados con pasión</p>
      </div>
    </header>
  );
}