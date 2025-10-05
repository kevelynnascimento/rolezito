import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEventsTable1696435800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "events",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "date",
                        type: "timestamp",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "type",
                        type: "varchar",
                        default: "'event'"
                    },
                    {
                        name: "placeId",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "events",
            new TableForeignKey({
                columnNames: ["placeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "places",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events");
    }
}