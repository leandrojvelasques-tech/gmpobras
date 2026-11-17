import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

export function ProjectCards({ nested = false }: { nested?: boolean }) {
  const Heading = nested ? 'h3' : 'h2';
  return <>
      {projects.map(project => {
        const image = project.heroImage ?? project.images.at(-1) ?? project.images[0];
        return <article className="project-index-card" key={project.slug}>
          <a className="project-index-image" href={`/proyectos/${project.slug}`} aria-label={`Ver ${project.title}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 730px) 100vw, (max-width: 1000px) 50vw, 33vw" />
          </a>
          <div className="project-index-copy">
            <p className="project-index-status">{project.status}</p>
            <Heading><a href={`/proyectos/${project.slug}`}>{project.title}</a></Heading>
            <p>{project.subtitle}</p>
            <a className="project-index-link" href={`/proyectos/${project.slug}`}>Ver proyecto y fotos <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </article>;
      })}
  </>;
}
