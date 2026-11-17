import type { Metadata } from 'next';
import { AppointmentFlow } from '../../components/AppointmentFlow';

export const metadata: Metadata = {
  title: 'Vista previa de agendamiento | GMP Obras',
  robots: { index: false, follow: false },
};

export default function BookingPreview() {
  return <AppointmentFlow preview />;
}
