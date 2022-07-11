import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657417780719 implements MigrationInterface {
    name = 'default1657417780719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earnings" DROP CONSTRAINT "FK_0fc9ed542c30f5caf9ec10ff658"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c"`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "earnings" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "earnings" ADD CONSTRAINT "FK_0fc9ed542c30f5caf9ec10ff658" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
