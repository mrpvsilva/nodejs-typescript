import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class Produto1603547705004 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'produto',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          length: '36'
        },
        {
          name: 'nome',
          type: 'varchar',
          length: '100',
          isUnique: true
        }
      ]

    }), true)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('produto')
  }
}
