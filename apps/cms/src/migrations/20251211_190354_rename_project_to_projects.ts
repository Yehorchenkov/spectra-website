import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`user_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_avatar_url\` text,
  	\`sizes_avatar_width\` numeric,
  	\`sizes_avatar_height\` numeric,
  	\`sizes_avatar_mime_type\` text,
  	\`sizes_avatar_filesize\` numeric,
  	\`sizes_avatar_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`user_media_created_at_idx\` ON \`user_media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`user_media_filename_idx\` ON \`user_media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`user_media_sizes_avatar_sizes_avatar_filename_idx\` ON \`user_media\` (\`sizes_avatar_filename\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`website\` text,
  	\`description\` text,
  	\`logo_id\` integer,
  	\`country\` text,
  	\`city\` text NOT NULL,
  	\`lat\` numeric NOT NULL,
  	\`lon\` numeric NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`news_tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`news_tags_name_idx\` ON \`news_tags\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`news_tags_created_at_idx\` ON \`news_tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`social_platforms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform_name\` text NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`social_platforms_platform_name_idx\` ON \`social_platforms\` (\`platform_name\`);`)
  await db.run(sql`CREATE INDEX \`social_platforms_created_at_idx\` ON \`social_platforms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`scientific_platforms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform_name\` text NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`scientific_platforms_platform_name_idx\` ON \`scientific_platforms\` (\`platform_name\`);`)
  await db.run(sql`CREATE INDEX \`scientific_platforms_created_at_idx\` ON \`scientific_platforms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`project_roles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role_name\` text NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`project_roles_role_name_idx\` ON \`project_roles\` (\`role_name\`);`)
  await db.run(sql`CREATE INDEX \`project_roles_created_at_idx\` ON \`project_roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_project_acknowledgement\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`acknowledgement_logo_id\` integer,
  	\`acknowledgement_formula\` text,
  	FOREIGN KEY (\`acknowledgement_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_project_acknowledgement_order_idx\` ON \`projects_project_acknowledgement\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_acknowledgement_parent_id_idx\` ON \`projects_project_acknowledgement\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_acknowledgement_acknowledgement_logo_idx\` ON \`projects_project_acknowledgement\` (\`acknowledgement_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_project_participants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`participant_name_id\` integer,
  	\`participant_role_id\` integer,
  	\`is_responsible\` integer DEFAULT false,
  	FOREIGN KEY (\`participant_name_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`participant_role_id\`) REFERENCES \`project_roles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_project_participants_order_idx\` ON \`projects_project_participants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_participants_parent_id_idx\` ON \`projects_project_participants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_participants_participant_name_idx\` ON \`projects_project_participants\` (\`participant_name_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_participants_participant_role_idx\` ON \`projects_project_participants\` (\`participant_role_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_project_acknowledgement\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`acknowledgement_logo_id\` integer,
  	\`acknowledgement_formula\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`acknowledgement_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_acknowledgement_order_idx\` ON \`_projects_v_version_project_acknowledgement\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_acknowledgement_parent_id_idx\` ON \`_projects_v_version_project_acknowledgement\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_acknowledgement_acknowledgem_idx\` ON \`_projects_v_version_project_acknowledgement\` (\`acknowledgement_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_project_participants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`participant_name_id\` integer,
  	\`participant_role_id\` integer,
  	\`is_responsible\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`participant_name_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`participant_role_id\`) REFERENCES \`project_roles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_participants_order_idx\` ON \`_projects_v_version_project_participants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_participants_parent_id_idx\` ON \`_projects_v_version_project_participants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_participants_participant_nam_idx\` ON \`_projects_v_version_project_participants\` (\`participant_name_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_project_participants_participant_rol_idx\` ON \`_projects_v_version_project_participants\` (\`participant_role_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform_id\` integer NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`platform_id\`) REFERENCES \`social_platforms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_social_links_order_idx\` ON \`team_members_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_social_links_parent_id_idx\` ON \`team_members_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_social_links_platform_idx\` ON \`team_members_social_links\` (\`platform_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_scientific_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform_id\` integer NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`platform_id\`) REFERENCES \`scientific_platforms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_scientific_links_order_idx\` ON \`team_members_scientific_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_scientific_links_parent_id_idx\` ON \`team_members_scientific_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_scientific_links_platform_idx\` ON \`team_members_scientific_links\` (\`platform_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`photo_id\` integer,
  	\`profile\` text,
  	\`email\` text NOT NULL,
  	\`address\` text,
  	\`additional_info\` text,
  	\`show_on_landing_page\` integer DEFAULT true,
  	\`order\` numeric DEFAULT 0,
  	\`slug\` text,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`user_media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_photo_idx\` ON \`team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`team_members_slug_idx\` ON \`team_members\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders_folder_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_order_idx\` ON \`payload_folders_folder_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_parent_idx\` ON \`payload_folders_folder_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_name_idx\` ON \`payload_folders\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_idx\` ON \`payload_folders\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_updated_at_idx\` ON \`payload_folders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_created_at_idx\` ON \`payload_folders\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_news_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`news_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_tags_id\`) REFERENCES \`news_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_news_rels\`("id", "order", "parent_id", "path", "projects_id", "news_tags_id") SELECT "id", "order", "parent_id", "path", "projects_id", "news_tags_id" FROM \`news_rels\`;`)
  await db.run(sql`DROP TABLE \`news_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_news_rels\` RENAME TO \`news_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`news_rels_order_idx\` ON \`news_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_parent_idx\` ON \`news_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_path_idx\` ON \`news_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_projects_id_idx\` ON \`news_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_news_tags_id_idx\` ON \`news_rels\` (\`news_tags_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__news_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` integer,
  	\`news_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_news_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_tags_id\`) REFERENCES \`news_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__news_v_rels\`("id", "order", "parent_id", "path", "projects_id", "news_tags_id") SELECT "id", "order", "parent_id", "path", "projects_id", "news_tags_id" FROM \`_news_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_news_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__news_v_rels\` RENAME TO \`_news_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_order_idx\` ON \`_news_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_parent_idx\` ON \`_news_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_path_idx\` ON \`_news_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_projects_id_idx\` ON \`_news_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_news_tags_id_idx\` ON \`_news_v_rels\` (\`news_tags_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`program_id\` integer,
  	\`start_date\` text,
  	\`finish_date\` text,
  	\`project_logo_id\` integer,
  	\`title\` text,
  	\`acronym\` text,
  	\`project_website\` text,
  	\`content\` text,
  	\`project_state\` text DEFAULT 'ongoing',
  	\`excerpt\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`publish_date\` text,
  	\`publisher\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`program_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_projects\`("id", "program_id", "start_date", "finish_date", "project_logo_id", "title", "acronym", "project_website", "content", "project_state", "excerpt", "slug", "slug_lock", "meta_title", "meta_description", "meta_image_id", "creator", "updator", "process", "publish_date", "publisher", "created_at", "updated_at", "_status") SELECT "id", "program_id", "start_date", "finish_date", "project_logo_id", "title", "acronym", "project_website", "content", "project_state", "excerpt", "slug", "slug_lock", "meta_title", "meta_description", "meta_image_id", "creator", "updator", "process", "publish_date", "publisher", "created_at", "updated_at", "_status" FROM \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`ALTER TABLE \`__new_projects\` RENAME TO \`projects\`;`)
  await db.run(sql`CREATE INDEX \`projects_program_idx\` ON \`projects\` (\`program_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_logo_idx\` ON \`projects\` (\`project_logo_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_meta_meta_image_idx\` ON \`projects\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_program_id\` integer,
  	\`version_start_date\` text,
  	\`version_finish_date\` text,
  	\`version_project_logo_id\` integer,
  	\`version_title\` text,
  	\`version_acronym\` text,
  	\`version_project_website\` text,
  	\`version_content\` text,
  	\`version_project_state\` text DEFAULT 'ongoing',
  	\`version_excerpt\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_creator\` text,
  	\`version_updator\` text,
  	\`version_process\` text,
  	\`version_publish_date\` text,
  	\`version_publisher\` text,
  	\`version_created_at\` text,
  	\`version_updated_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_program_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__projects_v\`("id", "parent_id", "version_program_id", "version_start_date", "version_finish_date", "version_project_logo_id", "version_title", "version_acronym", "version_project_website", "version_content", "version_project_state", "version_excerpt", "version_slug", "version_slug_lock", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_creator", "version_updator", "version_process", "version_publish_date", "version_publisher", "version_created_at", "version_updated_at", "version__status", "created_at", "updated_at", "latest") SELECT "id", "parent_id", "version_program_id", "version_start_date", "version_finish_date", "version_project_logo_id", "version_title", "version_acronym", "version_project_website", "version_content", "version_project_state", "version_excerpt", "version_slug", "version_slug_lock", "version_meta_title", "version_meta_description", "version_meta_image_id", "version_creator", "version_updator", "version_process", "version_publish_date", "version_publisher", "version_created_at", "version_updated_at", "version__status", "created_at", "updated_at", "latest" FROM \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__projects_v\` RENAME TO \`_projects_v\`;`)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_program_idx\` ON \`_projects_v\` (\`version_program_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_project_logo_idx\` ON \`_projects_v\` (\`version_project_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_meta_version_meta_image_idx\` ON \`_projects_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`user_media_id\` integer,
  	\`partners_id\` integer,
  	\`news_id\` integer,
  	\`news_tags_id\` integer,
  	\`social_platforms_id\` integer,
  	\`scientific_platforms_id\` integer,
  	\`project_roles_id\` integer,
  	\`programs_id\` integer,
  	\`projects_id\` integer,
  	\`pages_id\` integer,
  	\`team_members_id\` integer,
  	\`payload_folders_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`user_media_id\`) REFERENCES \`user_media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_tags_id\`) REFERENCES \`news_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`social_platforms_id\`) REFERENCES \`social_platforms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`scientific_platforms_id\`) REFERENCES \`scientific_platforms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_roles_id\`) REFERENCES \`project_roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programs_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`team_members_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_folders_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "user_media_id", "partners_id", "news_id", "news_tags_id", "social_platforms_id", "scientific_platforms_id", "project_roles_id", "programs_id", "projects_id", "pages_id", "team_members_id", "payload_folders_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "user_media_id", "partners_id", "news_id", "news_tags_id", "social_platforms_id", "scientific_platforms_id", "project_roles_id", "programs_id", "projects_id", "pages_id", "team_members_id", "payload_folders_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_user_media_id_idx\` ON \`payload_locked_documents_rels\` (\`user_media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`news_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_social_platforms_id_idx\` ON \`payload_locked_documents_rels\` (\`social_platforms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_scientific_platforms_id_idx\` ON \`payload_locked_documents_rels\` (\`scientific_platforms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_project_roles_id_idx\` ON \`payload_locked_documents_rels\` (\`project_roles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programs_id_idx\` ON \`payload_locked_documents_rels\` (\`programs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_members_id_idx\` ON \`payload_locked_documents_rels\` (\`team_members_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`creator\` text,
  	\`updator\` text,
  	\`process\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`folder_id\` integer,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_tablet_url\` text,
  	\`sizes_tablet_width\` numeric,
  	\`sizes_tablet_height\` numeric,
  	\`sizes_tablet_mime_type\` text,
  	\`sizes_tablet_filesize\` numeric,
  	\`sizes_tablet_filename\` text,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media\`("id", "alt", "creator", "updator", "process", "created_at", "updated_at", "folder_id", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y", "sizes_thumbnail_url", "sizes_thumbnail_width", "sizes_thumbnail_height", "sizes_thumbnail_mime_type", "sizes_thumbnail_filesize", "sizes_thumbnail_filename", "sizes_card_url", "sizes_card_width", "sizes_card_height", "sizes_card_mime_type", "sizes_card_filesize", "sizes_card_filename", "sizes_tablet_url", "sizes_tablet_width", "sizes_tablet_height", "sizes_tablet_mime_type", "sizes_tablet_filesize", "sizes_tablet_filename") SELECT "id", "alt", "creator", "updator", "process", "created_at", "updated_at", "folder_id", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y", "sizes_thumbnail_url", "sizes_thumbnail_width", "sizes_thumbnail_height", "sizes_thumbnail_mime_type", "sizes_thumbnail_filesize", "sizes_thumbnail_filename", "sizes_card_url", "sizes_card_width", "sizes_card_height", "sizes_card_mime_type", "sizes_card_filesize", "sizes_card_filename", "sizes_tablet_url", "sizes_tablet_width", "sizes_tablet_height", "sizes_tablet_mime_type", "sizes_tablet_filesize", "sizes_tablet_filename" FROM \`media\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`media_folder_idx\` ON \`media\` (\`folder_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`slug\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`slug_lock\` integer DEFAULT true;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_slug_idx\` ON \`users\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`news\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`news\` ADD \`process\` text;`)
  await db.run(sql`ALTER TABLE \`_news_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_news_v\` ADD \`version_process\` text;`)
  await db.run(sql`ALTER TABLE \`programs\` ADD \`process\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`process\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_process\` text;`)
  await db.run(sql`ALTER TABLE \`hero\` ADD \`process\` text;`)
  await db.run(sql`ALTER TABLE "news" RENAME COLUMN "project" TO "projects"`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`creator\` text,
  	\`updator\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_name_idx\` ON \`tags\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`user_media\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`news_tags\`;`)
  await db.run(sql`DROP TABLE \`social_platforms\`;`)
  await db.run(sql`DROP TABLE \`scientific_platforms\`;`)
  await db.run(sql`DROP TABLE \`project_roles\`;`)
  await db.run(sql`DROP TABLE \`projects_project_acknowledgement\`;`)
  await db.run(sql`DROP TABLE \`projects_project_participants\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_project_acknowledgement\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_project_participants\`;`)
  await db.run(sql`DROP TABLE \`team_members_social_links\`;`)
  await db.run(sql`DROP TABLE \`team_members_scientific_links\`;`)
  await db.run(sql`DROP TABLE \`team_members\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_folders_folder_type\`;`)
  await db.run(sql`DROP TABLE \`payload_folders\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`creator\` text,
  	\`updator\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_tablet_url\` text,
  	\`sizes_tablet_width\` numeric,
  	\`sizes_tablet_height\` numeric,
  	\`sizes_tablet_mime_type\` text,
  	\`sizes_tablet_filesize\` numeric,
  	\`sizes_tablet_filename\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media\`("id", "alt", "creator", "updator", "created_at", "updated_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y", "sizes_thumbnail_url", "sizes_thumbnail_width", "sizes_thumbnail_height", "sizes_thumbnail_mime_type", "sizes_thumbnail_filesize", "sizes_thumbnail_filename", "sizes_card_url", "sizes_card_width", "sizes_card_height", "sizes_card_mime_type", "sizes_card_filesize", "sizes_card_filename", "sizes_tablet_url", "sizes_tablet_width", "sizes_tablet_height", "sizes_tablet_mime_type", "sizes_tablet_filesize", "sizes_tablet_filename") SELECT "id", "alt", "creator", "updator", "created_at", "updated_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y", "sizes_thumbnail_url", "sizes_thumbnail_width", "sizes_thumbnail_height", "sizes_thumbnail_mime_type", "sizes_thumbnail_filesize", "sizes_thumbnail_filename", "sizes_card_url", "sizes_card_width", "sizes_card_height", "sizes_card_mime_type", "sizes_card_filesize", "sizes_card_filename", "sizes_tablet_url", "sizes_tablet_width", "sizes_tablet_height", "sizes_tablet_mime_type", "sizes_tablet_filesize", "sizes_tablet_filename" FROM \`media\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_tablet_sizes_tablet_filename_idx\` ON \`media\` (\`sizes_tablet_filename\`);`)
  await db.run(sql`CREATE TABLE \`__new_news_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_news_rels\`("id", "order", "parent_id", "path", "tags_id") SELECT "id", "order", "parent_id", "path", "tags_id" FROM \`news_rels\`;`)
  await db.run(sql`DROP TABLE \`news_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_news_rels\` RENAME TO \`news_rels\`;`)
  await db.run(sql`CREATE INDEX \`news_rels_order_idx\` ON \`news_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_parent_idx\` ON \`news_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_path_idx\` ON \`news_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`news_rels_tags_id_idx\` ON \`news_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__news_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_news_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__news_v_rels\`("id", "order", "parent_id", "path", "tags_id") SELECT "id", "order", "parent_id", "path", "tags_id" FROM \`_news_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_news_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__news_v_rels\` RENAME TO \`_news_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_order_idx\` ON \`_news_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_parent_idx\` ON \`_news_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_path_idx\` ON \`_news_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_news_v_rels_tags_id_idx\` ON \`_news_v_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`news_id\` integer,
  	\`tags_id\` integer,
  	\`programs_id\` integer,
  	\`projects_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`programs_id\`) REFERENCES \`programs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "news_id", "tags_id", "programs_id", "projects_id", "pages_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "news_id", "tags_id", "programs_id", "projects_id", "pages_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_programs_id_idx\` ON \`payload_locked_documents_rels\` (\`programs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`DROP INDEX \`users_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`slug\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`slug_lock\`;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`coordinator_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`projects_coordinator_idx\` ON \`projects\` (\`coordinator_id\`);`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`acronym\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`project_website\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`process\`;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` ADD \`version_coordinator_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_coordinator_idx\` ON \`_projects_v\` (\`version_coordinator_id\`);`)
  await db.run(sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_acronym\`;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_project_website\`;`)
  await db.run(sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_process\`;`)
  await db.run(sql`ALTER TABLE \`news\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`news\` DROP COLUMN \`process\`;`)
  await db.run(sql`ALTER TABLE \`_news_v\` DROP COLUMN \`version_excerpt\`;`)
  await db.run(sql`ALTER TABLE \`_news_v\` DROP COLUMN \`version_process\`;`)
  await db.run(sql`ALTER TABLE \`programs\` DROP COLUMN \`process\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`process\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_process\`;`)
  await db.run(sql`ALTER TABLE \`hero\` DROP COLUMN \`process\`;`)
  await db.run(sql`ALTER TABLE "news" RENAME COLUMN "projects" TO "project"`)
}
