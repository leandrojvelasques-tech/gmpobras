import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

const requiredAssets = [
  'public/gustavo-presentacion-poster.png',
  'public/testimonio-nadia-web.mp4',
  'public/testimonio-nadia-poster.png',
  'public/testimonio-gabriel-web.mp4',
  'public/gustavo-presentacion-web.mp4',
  'public/testimonio-gabriel-ambrozy-poster.jpg',
  'public/vivienda-gabriel-ambrozy.jpg',
  'public/vivienda-gabriel-ambrozy-hero.jpg',
  'public/volar-sin-escalas-hero.jpg',
  'public/volar-sin-escalas-platea.jpg',
  'public/volar-sin-escalas-montaje-paneles.jpg',
  'public/volar-sin-escalas-calefaccion-piso.jpg',
  'public/volar-sin-escalas-interior-consultorio.jpg',
];

test('includes the local testimonial assets', () => {
  for (const relativePath of requiredAssets) {
    assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);
  }
});

test('models Gabriel Ambrozy testimonial and its project facts', () => {
  const source = readFileSync(join(root, 'app/data/projects.ts'), 'utf8');

  assert.match(source, /Gabriel Ambrozy/);
  assert.match(source, /Vivienda unifamiliar/);
  assert.match(source, /188 m²/);
  assert.match(source, /testimonio-gabriel-web\.mp4/);
  assert.match(source, /vivienda-gabriel-ambrozy-hero\.jpg/);
});

test('models Nadia testimonial in the Volar Sin Escalas project', () => {
  const source = readFileSync(join(root, 'app/data/projects.ts'), 'utf8');

  assert.match(source, /Nadia Snidersich/);
  assert.match(source, /Así fue construir Volar Sin Escalas\./);
  assert.match(source, /testimonio-nadia-web\.mp4/);
  assert.match(source, /volar-sin-escalas-montaje-paneles\.jpg/);
});

test('renders the Home testimonial and project media components', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');
  const detail = readFileSync(join(root, 'app/proyectos/[slug]/page.tsx'), 'utf8');

  assert.match(home, /home-testimonial/);
  assert.match(home, /testimonialProjects/);
  assert.match(home, /Ver testimonio anterior/);
  assert.match(home, /Ver testimonio siguiente/);
  assert.match(home, /ProfileVideo/);
  assert.match(home, /Testimonio de \{testimonialProject\.testimonial\.person\}/);
  assert.doesNotMatch(home, /home-testimonial-person/);
  assert.doesNotMatch(home, /home-testimonial-project/);
  assert.match(home, /Conocer el proyecto/);
  assert.match(home, /testimonialProject\.details\.workType/);
  assert.match(home, /testimonialProject\.details\.area/);
  assert.match(home, /testimonialProject\.details\.floors/);
  assert.match(home, /testimonialProject\.details\.delivery/);
  assert.ok(
    home.indexOf('className="home-testimonial"') < home.indexOf('className="works"'),
    'the testimonial should appear before Proyectos reales',
  );
  assert.match(detail, /ProjectImageCarousel/);
  assert.doesNotMatch(detail, /Texto provisorio/);
  assert.match(detail, /VideoTestimonial/);
});

test('uses local Sansation as the primary site typeface', () => {
  const layout = readFileSync(join(root, 'app/layout.tsx'), 'utf8');
  const styles = readFileSync(join(root, 'app/globals.css'), 'utf8');

  assert.doesNotMatch(layout, /Manrope/);
  assert.match(layout, /Sansation_Regular\.ttf/);
  assert.match(layout, /Sansation_Bold\.ttf/);
  assert.match(styles, /body[^}]+font-family: var\(--font-sansation\)/s);
});

test('uses the approved Nadia frame as the video poster', () => {
  const component = readFileSync(join(root, 'app/components/VideoTestimonial.tsx'), 'utf8');

  assert.match(component, /poster=\{testimonial\.posterSrc\}/);
  assert.match(component, /videoRef\.current\?\.play\(\)/);
  assert.match(component, /Reproducir testimonio de/);
  assert.match(component, /video-testimonial-play/);
});

test('Gustavo poster has a central play control that starts the video', () => {
  const component = readFileSync(join(root, 'app/components/ProfileVideo.tsx'), 'utf8');

  assert.match(component, /useRef<HTMLVideoElement>/);
  assert.match(component, /videoRef\.current\?\.play\(\)/);
  assert.match(component, /aria-label="Reproducir presentación de Gustavo Pinto"/);
  assert.match(component, /profile-video-play/);
});
