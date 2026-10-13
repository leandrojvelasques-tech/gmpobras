import Image from 'next/image';

export function SubpageHeader({ active }: { active: 'proyectos' | 'contacto' }) {
  return <header className="subpage-header">
    <a className="brand" href="/" aria-label="GMP Obras, inicio"><span className="official-logo" aria-hidden="true"><Image src="/logo-gmp-obras-horizontal-cuadrado-punteado.png" alt="" width={2580} height={888} unoptimized /></span></a>
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
