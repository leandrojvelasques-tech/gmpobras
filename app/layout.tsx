import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['500', '600'],
});

const sansation = localFont({
  variable: '--font-sansation',
  display: 'swap',
  src: [
    { path: './fonts/Sansation_Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Sansation_Bold.ttf', weight: '700', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  title: 'Construcción en Comodoro Rivadavia y Rada Tilly | GMP Obras',
  description:
    'GMP Obras diseña y ejecuta viviendas, ampliaciones, consultorios y locales en Comodoro Rivadavia y Rada Tilly. Conocé sus obras y consultá por tu proyecto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L4L8THHBE6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L4L8THHBE6');
            `,
          }}
        />
      </head>
      <body className={`${plexMono.variable} ${sansation.variable}`}>
        {children}
      </body>
    </html>
  );
}
