import type { Metadata } from 'next';
import { AppointmentFlow } from '../../components/AppointmentFlow';

export const metadata: Metadata = {
  title: 'Gracias por agendar tu cita | GMP Obras',
  robots: { index: false, follow: false },
};

export default function AppointmentThanksPage() {
  return <AppointmentFlow thankYou />;
}
