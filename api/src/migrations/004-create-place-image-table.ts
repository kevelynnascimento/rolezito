import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePlaceImageTable1696435500000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "place_image",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "url",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "order",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "placeId",
                        type: "uuid",
                        isNullable: false
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "place_image",
            new TableForeignKey({
                columnNames: ["placeId"],
                referencedColumnNames: ["id"],
                referencedTableName: "place",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("place_image");
    }
}