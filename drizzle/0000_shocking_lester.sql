CREATE TABLE `consultations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text DEFAULT 'pendiente' NOT NULL,
	`project_type` text NOT NULL,
	`city` text NOT NULL,
	`address` text NOT NULL,
	`project_detail` text NOT NULL,
	`project_stages` text NOT NULL,
	`stage_detail` text,
	`material_link` text,
	`budget` text NOT NULL,
	`meeting_mode` text NOT NULL,
	`preferred_day` text NOT NULL,
	`preferred_time` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
