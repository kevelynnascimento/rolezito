import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePlaceTable1696435400000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "place",
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
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "latitude",
                        type: "decimal",
                        precision: 10,
                        scale: 8,
                        isNullable: false
                    },
                    {
                        name: "longitude",
                        type: "decimal",
                        precision: 11,
                        scale: 8,
                        isNullable: false
                    },
                    {
                        name: "openingHours",
                        type: "json",
                        isNullable: true
                    },
                    {
                        name: "isOpen",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "styleChips",
                        type: "json",
                        isNullable: true
                    },
                    {
                        name: "highlights",
                        type: "json",
                        isNullable: true
                    },
                    {
                        name: "averageRating",
                        type: "decimal",
                        precision: 3,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "reviewCount",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "categoryId",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "isFeatured",
                        type: "boolean",
                        default: false
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

        await queryRunner.createForeignKey(
            "place",
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("place");
    }
}