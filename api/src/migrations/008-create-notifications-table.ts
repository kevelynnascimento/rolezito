import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNotificationsTable1696435900000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "notifications",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "message",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "read",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "placeId",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "userId",
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
            "notifications",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notifications");
    }
}