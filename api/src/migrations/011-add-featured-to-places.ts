import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFeaturedToPlaces1728123700000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "places" 
            ADD COLUMN "isFeatured" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("places", "isFeatured");
    }
}