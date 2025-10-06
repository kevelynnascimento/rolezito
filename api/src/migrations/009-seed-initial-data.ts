import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1696436000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Inserir categorias iniciais
        await queryRunner.query(`
            INSERT INTO "category" (id, name, icon, filters) VALUES
            ('550e8400-e29b-41d4-a716-446655440001', 'Restaurantes', 'restaurant', '[{"id": "price", "label": "Preço"}, {"id": "cuisine", "label": "Culinária"}]'),
            ('550e8400-e29b-41d4-a716-446655440002', 'Bares', 'local_bar', '[{"id": "atmosphere", "label": "Ambiente"}, {"id": "music", "label": "Música"}]'),
            ('550e8400-e29b-41d4-a716-446655440003', 'Cafés', 'local_cafe', '[{"id": "wifi", "label": "Wi-Fi"}, {"id": "workspace", "label": "Espaço de trabalho"}]'),
            ('550e8400-e29b-41d4-a716-446655440004', 'Shopping', 'shopping_bag', '[{"id": "brands", "label": "Marcas"}, {"id": "size", "label": "Tamanho"}]'),
            ('550e8400-e29b-41d4-a716-446655440005', 'Entretenimento', 'movie', '[{"id": "type", "label": "Tipo"}, {"id": "age_group", "label": "Faixa etária"}]'),
            ('550e8400-e29b-41d4-a716-446655440006', 'Cultura', 'museum', '[{"id": "exhibitions", "label": "Exposições"}, {"id": "guided_tours", "label": "Visitas guiadas"}]'),
            ('550e8400-e29b-41d4-a716-446655440007', 'Esportes', 'sports_soccer', '[{"id": "sport_type", "label": "Tipo de esporte"}, {"id": "equipment", "label": "Equipamento"}]'),
            ('550e8400-e29b-41d4-a716-446655440008', 'Parques', 'park', '[{"id": "activities", "label": "Atividades"}, {"id": "facilities", "label": "Facilidades"}]')
        `);

        // Inserir usuário administrador de exemplo
        await queryRunner.query(`
            INSERT INTO "user" (id, email, password, role, "isActive") VALUES
            ('550e8400-e29b-41d4-a716-446655440100', 'admin@rolezinho.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', true)
        `);

        // Inserir alguns lugares de exemplo
        await queryRunner.query(`
            INSERT INTO "place" (id, name, description, address, phone, latitude, longitude, "openingHours", "isOpen", "styleChips", highlights, "averageRating", "reviewCount", "categoryId") VALUES
            ('550e8400-e29b-41d4-a716-446655440200', 'Pizzaria do João', 'A melhor pizza da cidade com ingredientes frescos e ambiente familiar', 'Rua das Flores, 123 - Centro', '+5511987654321', -23.5505199, -46.6333094, '{"today": "11:00 - 23:00", "week": ["11:00 - 23:00", "11:00 - 23:00", "11:00 - 23:00", "11:00 - 23:00", "11:00 - 23:00", "11:00 - 00:00", "18:00 - 23:00"]}', true, '[{"label": "Familiar"}, {"label": "Pizza artesanal"}]', '["Massa artesanal", "Ingredientes frescos", "Ambiente familiar"]', 4.5, 127, '550e8400-e29b-41d4-a716-446655440001'),
            
            ('550e8400-e29b-41d4-a716-446655440201', 'Bar do Zé', 'Boteco tradicional com cerveja gelada e petiscos deliciosos', 'Av. Paulista, 456 - Bela Vista', '+5511987654322', -23.5617782, -46.6556722, '{"today": "17:00 - 02:00", "week": ["Fechado", "17:00 - 02:00", "17:00 - 02:00", "17:00 - 02:00", "17:00 - 02:00", "17:00 - 03:00", "17:00 - 03:00"]}', true, '[{"label": "Boteco"}, {"label": "Cerveja gelada"}]', '["Chopp gelado", "Petiscos caseiros", "Música ao vivo"]', 4.2, 89, '550e8400-e29b-41d4-a716-446655440002'),
            
            ('550e8400-e29b-41d4-a716-446655440202', 'Café Central', 'Café especial com ambiente aconchegante para trabalhar', 'Rua Augusta, 789 - Consolação', '+5511987654323', -23.5558695, -46.6624103, '{"today": "07:00 - 20:00", "week": ["07:00 - 20:00", "07:00 - 20:00", "07:00 - 20:00", "07:00 - 20:00", "07:00 - 20:00", "08:00 - 22:00", "08:00 - 18:00"]}', true, '[{"label": "Wi-Fi grátis"}, {"label": "Café especial"}]', '["Wi-Fi rápido", "Ambiente silencioso", "Café premium"]', 4.7, 156, '550e8400-e29b-41d4-a716-446655440003')
        `);

        // Inserir algumas imagens de exemplo para os lugares
        await queryRunner.query(`
            INSERT INTO "place_image" (id, url, "order", "placeId") VALUES
            ('550e8400-e29b-41d4-a716-446655440300', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 0, '550e8400-e29b-41d4-a716-446655440200'),
            ('550e8400-e29b-41d4-a716-446655440301', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 1, '550e8400-e29b-41d4-a716-446655440200'),
            
            ('550e8400-e29b-41d4-a716-446655440302', 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 0, '550e8400-e29b-41d4-a716-446655440201'),
            
            ('550e8400-e29b-41d4-a716-446655440303', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 0, '550e8400-e29b-41d4-a716-446655440202')
        `);

        // Inserir algumas reviews de exemplo
        await queryRunner.query(`
            INSERT INTO "review" (id, rating, comment, "userId", "placeId") VALUES
            ('550e8400-e29b-41d4-a716-446655440400', 5, 'Pizza excelente! Massa fininha e ingredientes de qualidade. Voltarei com certeza!', '550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440200'),
            ('550e8400-e29b-41d4-a716-446655440401', 4, 'Ambiente familiar e aconchegante. O atendimento é muito bom. Recomendo!', '550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440200'),
            ('550e8400-e29b-41d4-a716-446655440402', 4, 'Ótimo lugar para relaxar depois do trabalho. Cerveja sempre gelada!', '550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440201'),
            ('550e8400-e29b-41d4-a716-446655440403', 5, 'Melhor café da região! Wifi rápido e ambiente perfeito para trabalhar.', '550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440202')
        `);

        // Inserir alguns eventos de exemplo
        await queryRunner.query(`
            INSERT INTO "event" (id, title, description, date, price, type, "placeId") VALUES
            ('550e8400-e29b-41d4-a716-446655440500', 'Noite da Pizza', 'Todas as pizzas pela metade do preço! Válido das 19h às 22h.', '2024-12-15 19:00:00', 'Promoção especial', 'promocao', '550e8400-e29b-41d4-a716-446655440200'),
            ('550e8400-e29b-41d4-a716-446655440501', 'Música ao Vivo - Samba', 'Grupo de samba local se apresenta no bar. Entrada gratuita!', '2024-12-20 20:00:00', 'Gratuito', 'show', '550e8400-e29b-41d4-a716-446655440201'),
            ('550e8400-e29b-41d4-a716-446655440502', 'Workshop de Café', 'Aprenda sobre diferentes métodos de preparo de café com nosso barista especialista.', '2024-12-10 15:00:00', 'R$ 45,00', 'workshop', '550e8400-e29b-41d4-a716-446655440202')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover dados em ordem reversa devido às foreign keys
        await queryRunner.query(`DELETE FROM "event"`);
        await queryRunner.query(`DELETE FROM "review"`);
        await queryRunner.query(`DELETE FROM "place_image"`);
        await queryRunner.query(`DELETE FROM "place"`);
        await queryRunner.query(`DELETE FROM "user"`);
        await queryRunner.query(`DELETE FROM "category"`);
    }
}