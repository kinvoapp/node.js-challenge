import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657415002212 implements MigrationInterface {
    name = 'default1657415002212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "week_day"`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "week_day"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "value" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "value" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD CONSTRAINT "FK_0fc9ed542c30f5caf9ec10ff658" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earnings" DROP CONSTRAINT "FK_0fc9ed542c30f5caf9ec10ff658"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c"`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "date" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "date" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "week_day" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "week_day" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
