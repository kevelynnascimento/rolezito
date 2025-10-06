import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1696435200000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar o enum para role
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('user', 'admin', 'promoter')
        `);

        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "admin", "promoter"],
                        default: "'user'",
                        isNullable: false
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true,
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
        // Remover o enum
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }
}