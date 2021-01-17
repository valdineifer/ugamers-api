import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRole1610904281010 implements MigrationInterface {

    private table = new Table({
        name: 'role',
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
                name: 'descricao',
                type: 'varchar',
                isNullable: false,
            },
        ]
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.table);
    }

}
