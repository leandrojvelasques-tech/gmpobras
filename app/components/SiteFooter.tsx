import Image from 'next/image';
import { projects } from '../data/projects';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand brand-footer" href="/" aria-label="GMP Obras, inicio">
          <span className="official-logo footer-logo" aria-hidden="true">
          <Image src="/logo-gmp-obras-vertical.png" alt="" width={1834} height={1503} unoptimized />
          </span>
        </a>
      </div>
      <div className="footer-details">
        <div className="footer-identity">
          <p>Gustavo Pinto Caetano · Maestro mayor de obras</p>
          <p className="footer-registration">Mat. Mun. 159 · Mat. P. 1206 · Cat. 2°</p>
        </div>
        <a href="/">www.gmpobras.com.ar</a>
        <a href="mailto:gpinto@gmpobras.com">gpinto@gmpobras.com</a>
        <span>Ramos Mejía 298 · Comodoro Rivadavia</span>
        <a href="https://www.instagram.com/gmpobras/" target="_blank" rel="noreferrer">Instagram · @gmpobras</a>
      </div>
      <nav className="footer-navigation" aria-label="Páginas del sitio">
        <div>
          <p>Páginas</p>
          <div className="footer-link-row">
          <a href="/">Inicio</a>
          <a href="/proyectos">Proyectos</a>
          <a href="/contacto">Contacto</a>
          <a href="/sistema-cassaforma">Sistema Cassaforma</a>
          <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
          <a href="/agendar">Agendar una consulta</a>
          </div>
        </div>
        <div>
          <p>Obras</p>
          <div className="footer-link-row">
          {projects.map((project) => <a key={project.slug} href={`/proyectos/${project.slug}`}>{project.title}</a>)}
          </div>
        </div>
      </nav>
    </footer>
  );
}
