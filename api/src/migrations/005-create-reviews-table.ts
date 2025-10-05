import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReviewsTable1696435600000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reviews",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "rating",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "comment",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "userId",
                        type: "uuid",
                        isNullable: false
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
            "reviews",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "reviews",
            new TableForeignKey({
                columnNames: ["placeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "places",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews");
    }
}