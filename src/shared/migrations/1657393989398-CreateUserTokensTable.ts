import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTokensTable1657393989398 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'token',
            type: 'varchar'
          },
          {
            name: 'expires_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],

        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }]
        })
      )
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens')
    }

}
