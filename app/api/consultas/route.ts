import { getDb } from '../../../db';
import { consultations } from '../../../db/schema';

type ConsultationPayload = {
  projectType?: unknown;
  city?: unknown;
  address?: unknown;
  projectDetail?: unknown;
  projectStages?: unknown;
  stageDetail?: unknown;
  materialLink?: unknown;
  budget?: unknown;
  meetingMode?: unknown;
  preferredDay?: unknown;
  preferredTime?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
};

function cleanText(value: unknown, maximum: number) {
  return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ConsultationPayload;
    const projectStages = Array.isArray(payload.projectStages)
      ? payload.projectStages.filter((stage): stage is string => typeof stage === 'string').map((stage) => stage.trim().slice(0, 120)).slice(0, 8)
      : [];

    const values = {
      projectType: cleanText(payload.projectType, 100),
      city: cleanText(payload.city, 100),
      address: cleanText(payload.address, 220),
      projectDetail: cleanText(payload.projectDetail, 4000),
      projectStages: JSON.stringify(projectStages),
      stageDetail: cleanText(payload.stageDetail, 2000) || null,
      materialLink: cleanText(payload.materialLink, 1000) || null,
      budget: cleanText(payload.budget, 120),
      meetingMode: cleanText(payload.meetingMode, 100),
      preferredDay: cleanText(payload.preferredDay, 10),
      preferredTime: cleanText(payload.preferredTime, 40),
      name: cleanText(payload.name, 160),
      phone: cleanText(payload.phone, 80),
      email: cleanText(payload.email, 254).toLowerCase(),
    };

    if (!values.projectType || !values.city || !values.address || !values.projectDetail || projectStages.length === 0 || !values.budget || !values.meetingMode || !values.preferredDay || !values.preferredTime || !values.name || !values.phone || !values.email) {
      return Response.json({ error: 'Completá todos los datos obligatorios.' }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDay) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      return Response.json({ error: 'Revisá la fecha y el correo electrónico.' }, { status: 400 });
    }

    const db = getDb();
    const [consultation] = await db.insert(consultations).values(values).returning({
      id: consultations.id,
      createdAt: consultations.createdAt,
    });

    return Response.json({ consultation }, { status: 201 });
  } catch (error) {
    console.error('No se pudo registrar la consulta', error);
    return Response.json({ error: 'No pudimos guardar la solicitud. Conservamos tus datos en pantalla para que puedas volver a intentar.' }, { status: 500 });
  }
}
