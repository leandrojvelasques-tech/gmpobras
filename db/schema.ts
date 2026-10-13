import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const contactMessages = sqliteTable('contact_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(), email: text('email').notNull(), message: text('message').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
export const emailNotifications = sqliteTable('email_notifications', {
  id: text('id').primaryKey(), kind: text('kind').notNull(), reference: integer('reference').notNull(),
  contactEmail: text('contact_email').notNull(), payload: text('payload').notNull(), mode: text('mode').notNull(),
  status: text('status').notNull().default('pending'), providerIds: text('provider_ids'), createdAt: text('created_at').notNull(),
});

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
  detailsTokenHash: text('details_token_hash'),
  detailsTokenExpiresAt: text('details_token_expires_at'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [uniqueIndex('confirmed_slot').on(table.preferredDay, table.preferredTime).where(sql`${table.status} = 'confirmada'`)]);
