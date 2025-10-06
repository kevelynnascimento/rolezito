import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcryptjs';

export class CreateInitialAdminUser1728123800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('admin123456', 10);
        
        await queryRunner.query(`
            INSERT INTO "users" ("id", "email", "password", "role", "isActive", "createdAt", "updatedAt")
            VALUES (
                uuid_generate_v4(),
                'admin@rolezito.com',
                '${hashedPassword}',
                'admin',
                true,
                NOW(),
                NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" 
            WHERE "email" = 'admin@rolezito.com' AND "role" = 'admin'
        `);
    }
}