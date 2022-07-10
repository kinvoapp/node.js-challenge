import { MigrationInterface, QueryRunner, Table } from 'typeorm'
export class bancAccount1657470422706 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bancAccount',
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
            type: 'number'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'number'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bancAccount')
  }
}
