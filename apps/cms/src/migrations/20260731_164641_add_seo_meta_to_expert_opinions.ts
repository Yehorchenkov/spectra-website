import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "expert_opinions" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "expert_opinions" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "expert_opinions" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_expert_opinions_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_expert_opinions_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_expert_opinions_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "expert_opinions" ADD CONSTRAINT "expert_opinions_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_expert_opinions_v" ADD CONSTRAINT "_expert_opinions_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "expert_opinions_meta_meta_image_idx" ON "expert_opinions" USING btree ("meta_image_id");
  CREATE INDEX "_expert_opinions_v_version_meta_version_meta_image_idx" ON "_expert_opinions_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "expert_opinions" DROP CONSTRAINT "expert_opinions_meta_image_id_media_id_fk";
  
  ALTER TABLE "_expert_opinions_v" DROP CONSTRAINT "_expert_opinions_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "expert_opinions_meta_meta_image_idx";
  DROP INDEX "_expert_opinions_v_version_meta_version_meta_image_idx";
  ALTER TABLE "expert_opinions" DROP COLUMN "meta_title";
  ALTER TABLE "expert_opinions" DROP COLUMN "meta_description";
  ALTER TABLE "expert_opinions" DROP COLUMN "meta_image_id";
  ALTER TABLE "_expert_opinions_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_expert_opinions_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_expert_opinions_v" DROP COLUMN "version_meta_image_id";`)
}
