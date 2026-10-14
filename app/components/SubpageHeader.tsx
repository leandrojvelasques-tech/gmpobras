import { HeaderLogo } from './HeaderLogo';

export function SubpageHeader({ active }: { active: 'proyectos' | 'contacto' }) {
  return <header className="subpage-header">
    <a className="brand" href="/" aria-label="GMP Obras, inicio"><HeaderLogo /></a>
    <nav aria-label="Navegación principal">
      <a href="/">Inicio</a>
      <a href="/proyectos" aria-current={active === 'proyectos' ? 'page' : undefined}>Proyectos</a>
      <a href="/#modelos">Modelos</a>
      <a href="/sistema-cassaforma">Sistema</a>
      <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
      <a href="/contacto" aria-current={active === 'contacto' ? 'page' : undefined}>Contacto</a>
      <a className="header-cta" href="/agendar">Agendar cita</a>
    </nav>
  </header>;
}
