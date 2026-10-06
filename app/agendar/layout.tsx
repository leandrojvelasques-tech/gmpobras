import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Agendá una consulta sobre tu obra | GMP Obras',
  description:
    'Coordiná una reunión con GMP Obras para conversar sobre tu proyecto, presencial o por Google Meet. Elegí un horario y contanos qué obra estás evaluando.',
};

export default function BookingLayout({ children }: { children: ReactNode }) {
  return children;
}
