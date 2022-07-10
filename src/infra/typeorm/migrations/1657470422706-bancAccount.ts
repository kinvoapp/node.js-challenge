import { MigrationInterface, QueryRunner, Table } from 'typeorm'
export class bancAccount1657470422706 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bankAccount',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'value',
            type: 'int'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'int'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bancAccount')
  }
}
