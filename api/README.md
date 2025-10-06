# Rolezito API

API backend para o aplicativo Rolezito - Sistema de descoberta de lugares com sistema de roles simplificado.

## 📋 Funcionalidades

### Sistema de Usuários e Roles
- **User**: Usuário padrão que pode descobrir lugares, favoritar e avaliar
- **Promoter**: Pode cadastrar novos lugares e gerenciar destaques
- **Admin**: Acesso total, pode gerenciar usuários e todas as funcionalidades

### Recursos Principais
- Autenticação JWT com roles
- CRUD de lugares (apenas Promoters/Admins)
- Sistema de favoritos
- Avaliações e reviews
- Gerenciamento de destaques
- Busca por geolocalização
- Categorização de lugares

## 🚀 Estrutura de Usuários Refatorada

A API foi refatorada para ter uma estrutura de usuários mais simples:

### Antes (campos removidos):
- `username`
- `fullName`
- `phone`
- `avatar`

### Após refatoração:
- `email` (único identificador)
- `password`
- `role` (enum: user, admin, promoter)
- `isActive` (boolean)

## 🗄️ Setup do Banco de Dados

```sql
CREATE DATABASE rolezito;
CREATE USER rolezito WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE rolezito TO rolezito;
```

## 🔑 Usuário Admin Padrão

Após executar as migrações, um usuário admin será criado automaticamente:

```
Email: admin@rolezito.com
Senha: admin123456
Role: admin
```

**⚠️ IMPORTANTE: Altere a senha padrão após o primeiro login!**

## 📚 Endpoints Principais

### Autenticação
- `POST /auth/register` - Registro de usuários
- `POST /auth/login` - Login

### Gerenciamento de Usuários (Admin apenas)
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca usuário por ID
- `PUT /users/:id/role` - Atualiza role do usuário
- `PUT /users/:id/status` - Ativa/desativa usuário
- `DELETE /users/:id` - Remove usuário

### Lugares
- `GET /places` - Lista lugares
- `GET /places/:id` - Busca lugar por ID
- `POST /places` - Cria lugar (Promoter/Admin)
- `PUT /places/:id/featured` - Gerencia destaques (Promoter/Admin)

### Outros
- `GET /categories` - Lista categorias
- `POST /favorites` - Gerencia favoritos
- `POST /reviews` - Cria avaliações

## 🔐 Níveis de Permissão

| Recurso | User | Promoter | Admin |
|---------|------|----------|-------|
| Visualizar lugares | ✅ | ✅ | ✅ |
| Favoritar lugares | ✅ | ✅ | ✅ |
| Avaliar lugares | ✅ | ✅ | ✅ |
| Cadastrar lugares | ❌ | ✅ | ✅ |
| Gerenciar destaques | ❌ | ✅ | ✅ |
| Gerenciar usuários | ❌ | ❌ | ✅ |
| Alterar roles | ❌ | ❌ | ✅ |

## 🛠️ Instalação e Execução

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrações
npm run migration:run

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📝 Variáveis de Ambiente

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=rolezito
DATABASE_USER=rolezito
DATABASE_PASSWORD=password
JWT_SECRET=your_jwt_secret_here
PORT=3001
```