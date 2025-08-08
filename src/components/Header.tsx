interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">🎮 {title}</h1>
      </div>
    </header>
  );
}