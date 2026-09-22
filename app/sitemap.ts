import type { MetadataRoute } from 'next';
import { projects } from './data/projects';

const siteUrl = 'https://www.gmpobras.com.ar';
const publicPages = ['/', '/agendar', '/sistema-cassaforma'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicPages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...projects.map((project) => ({
      url: `${siteUrl}/proyectos/${project.slug}`,
    })),
  ];
}
