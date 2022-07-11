import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657328671281 implements MigrationInterface {
    name = 'default1657328671281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Balance" ("id" SERIAL NOT NULL, CONSTRAINT "PK_2aa37c798b86e725e0db763c993" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "earnings" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "date" text NOT NULL, "week_day" text NOT NULL, CONSTRAINT "PK_32821f77c2546a1d53f674fe83f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "date" text NOT NULL, "week_day" text NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "earnings"`);
        await queryRunner.query(`DROP TABLE "Balance"`);
    }

}
