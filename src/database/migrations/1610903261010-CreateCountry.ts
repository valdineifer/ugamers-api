import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCountry1610903261010 implements MigrationInterface {
  private table = new Table({
    name: 'country',
    columns: [
      {
        name: 'id',
        type: 'int',
        generationStrategy: 'increment',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'isoCode',
        type: 'varchar',
        length: '2',
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.table);
  }
}
