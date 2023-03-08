import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1678305409844 implements MigrationInterface {
    name = 'InitialMigration1678305409844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "social_media" ("id" SERIAL NOT NULL, "linkedln" character varying(50) NOT NULL, "github" character varying(50) NOT NULL, "youtube" character varying(120) NOT NULL, "instagram" character varying(50) NOT NULL, "discord" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "PK_54ac0fd97432069e7c9ab567f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "nickname" character varying(30) NOT NULL, "password" character varying(120) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "description" text, "avatar" character varying(150) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "socialMediaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "REL_80f28c2ec0a21f81e323e96e47" UNIQUE ("socialMediaId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_projects_team" ("id" SERIAL NOT NULL, "maxUsers" integer NOT NULL, "waiting" boolean NOT NULL DEFAULT true, "addedAt" date NOT NULL DEFAULT now(), "projectId" integer, "userId" integer, CONSTRAINT "PK_c09841cb9e52e644a928f21073f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('Aberto', 'Em andamento', 'Finalizado')`);
        await queryRunner.query(`CREATE TYPE "public"."projects_devtype_enum" AS ENUM('Front-end', 'Back-end', 'Full-stack')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'Aberto', "devType" "public"."projects_devtype_enum" NOT NULL, "cover" character varying(150) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "ownerId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technologies" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_technologies" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL, "userId" integer, "technologyId" integer, CONSTRAINT "PK_0216cd62ab5f3228a8efc1f31cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_technologies" ("id" SERIAL NOT NULL, "createdAt" date NOT NULL, "userId" integer, "technologyId" integer, CONSTRAINT "PK_958d4d90a76dec48d6088a3394b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_80f28c2ec0a21f81e323e96e47c" FOREIGN KEY ("socialMediaId") REFERENCES "social_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects_team" ADD CONSTRAINT "FK_dc82997aed05497c94fee62c7b0" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects_team" ADD CONSTRAINT "FK_fac46efaba6cc84485c722ff18a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_1739462642224a6407e36d2d31f" FOREIGN KEY ("userId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" ADD CONSTRAINT "FK_ce70572e4e2f1a4ba2bd5f055ce" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_technologies" ADD CONSTRAINT "FK_4629b9847cd08d04f2bae226825" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_4629b9847cd08d04f2bae226825"`);
        await queryRunner.query(`ALTER TABLE "users_technologies" DROP CONSTRAINT "FK_d33dd73ff3ee2296b3060abd58b"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_ce70572e4e2f1a4ba2bd5f055ce"`);
        await queryRunner.query(`ALTER TABLE "projects_technologies" DROP CONSTRAINT "FK_1739462642224a6407e36d2d31f"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"`);
        await queryRunner.query(`ALTER TABLE "users_projects_team" DROP CONSTRAINT "FK_fac46efaba6cc84485c722ff18a"`);
        await queryRunner.query(`ALTER TABLE "users_projects_team" DROP CONSTRAINT "FK_dc82997aed05497c94fee62c7b0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_80f28c2ec0a21f81e323e96e47c"`);
        await queryRunner.query(`DROP TABLE "users_technologies"`);
        await queryRunner.query(`DROP TABLE "projects_technologies"`);
        await queryRunner.query(`DROP TABLE "technologies"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_devtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TABLE "users_projects_team"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "social_media"`);
    }

}
