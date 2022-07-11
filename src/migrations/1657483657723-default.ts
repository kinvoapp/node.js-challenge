import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657483657723 implements MigrationInterface {
    name = 'default1657483657723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" ADD "calculated_balance" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "calculated_balance"`);
    }

}
