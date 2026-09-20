import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const consultations = sqliteTable('consultations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  status: text('status').notNull().default('pendiente'),
  projectType: text('project_type').notNull(),
  city: text('city').notNull(),
  address: text('address').notNull(),
  projectDetail: text('project_detail').notNull(),
  projectStages: text('project_stages').notNull(),
  stageDetail: text('stage_detail'),
  materialLink: text('material_link'),
  budget: text('budget').notNull(),
  meetingMode: text('meeting_mode').notNull(),
  preferredDay: text('preferred_day').notNull(),
  preferredTime: text('preferred_time').notNull(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
