import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1696435300000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "icon",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "filters",
                        type: "json",
                        isNullable: true
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category");
    }
}