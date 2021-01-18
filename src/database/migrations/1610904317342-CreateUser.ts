import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUser1610904317342 implements MigrationInterface {

    private table = new Table({
        name: 'user',
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
                name: 'email',
                type: 'varchar',
                isNullable: false,
                isUnique: true,
            },
            {
                name: 'username',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'status',
                type: 'boolean',
                isNullable: false,
            },
            {
                name: 'password',
                type: 'varchar',
                isNullable: false,
            },
            {
                name: 'confirmationToken',
                type: 'varchar',
                length: '64',
                isNullable: true,
            },
            {
                name: 'recoverToken',
                type: 'varchar',
                length: '64',
                isNullable: true,
            },
            {
                name: 'roleId',
                type: 'int',
                default: 1, // Default role: User
                isNullable: false,
            },
            {
                name: 'createdAt',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updatedAt',
                type: 'timestamptz',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'deletedAt',
                type: 'timestamptz',
                isNullable: true,
            }
        ]
    });

    private roleFk = new TableForeignKey({
        columnNames: ['roleId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL'
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.table);
        await queryRunner.createForeignKey('user', this.roleFk);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.table);
    }

}
