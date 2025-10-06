import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorUsersTable1728123600000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remover colunas desnecessárias
        await queryRunner.dropColumn("users", "username");
        await queryRunner.dropColumn("users", "fullName");
        await queryRunner.dropColumn("users", "phone");
        await queryRunner.dropColumn("users", "avatar");
        
        // Adicionar coluna de role
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('user', 'admin', 'promoter')
        `);
        
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "role" "user_role_enum" NOT NULL DEFAULT 'user'
        `);
        
        // Adicionar coluna isActive
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "isActive" boolean NOT NULL DEFAULT true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover colunas adicionadas
        await queryRunner.dropColumn("users", "role");
        await queryRunner.dropColumn("users", "isActive");
        
        // Remover o enum
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        
        // Recriar colunas removidas
        await queryRunner.query(`
            ALTER TABLE "users" 
            ADD COLUMN "username" varchar UNIQUE NOT NULL,
            ADD COLUMN "fullName" varchar NOT NULL,
            ADD COLUMN "phone" varchar,
            ADD COLUMN "avatar" varchar
        `);
    }
}