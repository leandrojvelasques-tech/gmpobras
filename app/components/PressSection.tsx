import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import articles from '../data/press.json';
import './PressSection.css';

export function PressSection() {
  return (
    <section className="press-section" id="en-los-medios" aria-labelledby="press-title">
      <p className="section-kicker">Prensa local</p>
      <div className="section-heading"><h2 id="press-title">GMP en los medios</h2></div>
      <p className="press-intro">Notas periodísticas que reflejan parte del trabajo que venimos realizando desde GMP Obras a lo largo de los años.</p>
      <div className="press-grid">
        {articles.map((article) => (
          <a className="press-card" key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`${article.titulo}. Leer en ADNSUR (abre en otra pestaña)`}>
            <div className="press-photo"><Image src={article.foto_local} alt={`Fotografía de ADNSUR para la nota: ${article.titulo}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div>
            <div className="press-copy">
              <Image className="press-logo" src="/prensa/adnsur-logo.png" alt="ADNSUR" width={145} height={36} />
              <time dateTime={article.fecha}>{new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${article.fecha}T12:00:00Z`))}</time>
              <h3>{article.titulo}</h3>
              <span className="press-read">Leer en ADNSUR <ArrowUpRight size={18} aria-hidden="true" /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
