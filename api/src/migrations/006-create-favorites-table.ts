import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateFavoritesTable1696435700000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
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

        await queryRunner.createIndex(
            "favorites",
            new TableIndex({
                name: "IDX_favorites_userId_placeId",
                columnNames: ["userId", "placeId"],
                isUnique: true
            })
        );

        await queryRunner.createForeignKey(
            "favorites",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "favorites",
            new TableForeignKey({
                columnNames: ["placeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "places",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("favorites");
    }
}