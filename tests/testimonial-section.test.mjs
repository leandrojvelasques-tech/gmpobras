import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
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
  'public/volar-sin-escalas-final.jpg',
  'public/volar-sin-escalas-platea.jpg',
  'public/volar-sin-escalas-montaje-paneles.jpg',
  'public/volar-sin-escalas-calefaccion-piso.jpg',
  'public/volar-sin-escalas-interior-consultorio.jpg',
];

test('includes the local testimonial assets', () => {
  for (const relativePath of requiredAssets) {
    assert.equal(existsSync(join(root, relativePath)), true, `${relativePath} is missing`);
  }

  const stageAssets = readdirSync(join(root, 'public'))
    .filter((name) => /^volar-sin-escalas-etapa-\d{3}\.jpg$/.test(name))
    .sort();
  assert.equal(stageAssets.length, 39, 'the complete first-stage photo sequence should be present');
  assert.equal(stageAssets[0], 'volar-sin-escalas-etapa-012.jpg');
  assert.equal(stageAssets.at(-1), 'volar-sin-escalas-etapa-668.jpg');
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
  assert.match(source, /volar-sin-escalas-final\.jpg/);
  assert.match(source, /volar-sin-escalas-etapa-012\.jpg/);
  assert.match(source, /sequence: 12/);
  assert.match(source, /volar-sin-escalas-etapa-668\.jpg/);
  assert.match(source, /sequence: 668/);
});

test('renders the integrated Home project showcase', () => {
  const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');
  const showcase = readFileSync(join(root, 'app/components/HomeProjectShowcase.tsx'), 'utf8');
  const detail = readFileSync(join(root, 'app/proyectos/[slug]/page.tsx'), 'utf8');

  assert.match(home, /HomeProjectShowcase/);
  assert.doesNotMatch(home, /home-testimonial/);
  assert.match(home, /ProfileVideo/);
  assert.doesNotMatch(home, /Conocer el proyecto/);
  assert.match(showcase, /VideoTestimonial/);
  assert.match(showcase, /Proyecto en dos etapas/);
  assert.match(showcase, /Proyecto en una etapa/);
  assert.match(showcase, /Ver fotos de la obra/);
  assert.match(showcase, /Etapa 1/);
  assert.match(showcase, /Etapa 2/);
  assert.match(showcase, /Etapa única/);
  assert.match(showcase, /type="range"/);
  assert.match(showcase, /Ir a una foto/);
  assert.match(showcase, /stage2Images/);
  assert.match(detail, /ProjectImageCarousel/);
  assert.doesNotMatch(detail, /Texto provisorio/);
  assert.match(detail, /VideoTestimonial/);
  assert.ok(
    detail.indexOf('ProjectImageCarousel') < detail.indexOf('detail-testimonial-section'),
    'the photo sequence should appear before Nadia video on the project page',
  );
  assert.ok(
    detail.indexOf('ProjectImageCarousel') < detail.indexOf('detail-facts'),
    'the technical facts should appear below the photo sequence',
  );
  assert.ok(
    detail.indexOf('detail-facts') < detail.indexOf('detail-testimonial-section'),
    'Nadia experience should follow the project facts',
  );
  assert.match(detail, /Agendar una cita/);
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

test('supports photo sequence navigation beyond the arrow controls', () => {
  const carousel = readFileSync(join(root, 'app/components/ProjectImageCarousel.tsx'), 'utf8');

  assert.match(carousel, /type="range"/);
  assert.match(carousel, /aria-valuetext/);
  assert.match(carousel, /aria-label=\{`Foto anterior de \$\{projectTitle\}`\}/);
});

test('uses the finished Volar facade as the Home opening image without replacing the stage sequence', () => {
  const showcase = readFileSync(join(root, 'app/components/HomeProjectShowcase.tsx'), 'utf8');
  const data = readFileSync(join(root, 'app/data/projects.ts'), 'utf8');

  assert.match(showcase, /project\.heroImage \?\? project\.images\.at\(-1\)/);
  assert.match(showcase, /stage2Images/);
  assert.match(data, /heroImage: \{ src: '\/volar-sin-escalas-final\.jpg'/);

  const stageAssets = readdirSync(join(root, 'public'))
    .filter((name) => /^volar-sin-escalas-etapa-\d{3}\.jpg$/.test(name));
  assert.equal(stageAssets.length, 39, 'the complete stage photo sequence should remain available');
});

test('Gustavo poster has a central play control that starts the video', () => {
  const component = readFileSync(join(root, 'app/components/ProfileVideo.tsx'), 'utf8');

  assert.match(component, /useRef<HTMLVideoElement>/);
  assert.match(component, /videoRef\.current\?\.play\(\)/);
  assert.match(component, /aria-label="Reproducir presentación de Gustavo Pinto"/);
  assert.match(component, /profile-video-play/);
});
