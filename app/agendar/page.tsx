import type { Metadata } from 'next';
import { AppointmentFlow } from '../components/AppointmentFlow';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.gmpobras.com.ar/agendar' },
};

export default function AppointmentPage() {
  return <AppointmentFlow />;
}
