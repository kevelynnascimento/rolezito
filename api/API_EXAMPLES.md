# Exemplos de Uso da API Rolezito

Este documento contém exemplos práticos de como usar a API refatorada.

## 🔐 Autenticação

### Registrar novo usuário (padrão como 'user')
```json
POST /auth/register
{
  "email": "usuario@exemplo.com",
  "password": "minhasenha123"
}
```

### Registrar promoter (apenas admin pode definir role)
```json
POST /auth/register
{
  "email": "promoter@exemplo.com",
  "password": "minhasenha123",
  "role": "promoter"
}
```

### Login
```json
POST /auth/login
{
  "email": "usuario@exemplo.com",
  "password": "minhasenha123"
}

// Resposta:
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "email": "usuario@exemplo.com",
    "role": "user",
    "isActive": true
  },
  "token": "jwt_token_aqui"
}
```

## 👥 Gerenciamento de Usuários (Admin)

### Listar usuários
```bash
GET /users
Authorization: Bearer jwt_token_admin
```

### Filtrar usuários por role
```bash
GET /users?role=promoter
Authorization: Bearer jwt_token_admin
```

### Alterar role de usuário
```json
PUT /users/{user_id}/role
Authorization: Bearer jwt_token_admin
{
  "role": "promoter"
}
```

### Desativar usuário
```json
PUT /users/{user_id}/status
Authorization: Bearer jwt_token_admin
{
  "isActive": false
}
```

## 📍 Lugares

### Criar novo lugar (Promoter/Admin)
```json
POST /places
Authorization: Bearer jwt_token_promoter
{
  "name": "Restaurante do João",
  "description": "Melhor comida caseira da cidade",
  "address": "Rua das Flores, 123",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "phone": "(11) 99999-9999",
  "categoryId": "uuid_categoria"
}
```

### Ativar destaque (Promoter/Admin)
```json
PUT /places/{place_id}/featured
Authorization: Bearer jwt_token_promoter
{
  "isFeatured": true
}
```

### Buscar lugares em destaque
```bash
GET /places?featured=true
```

## 🔄 Fluxo Completo de Uso

### 1. Admin cria promoter
```bash
# 1. Login como admin
POST /auth/login
{
  "email": "admin@rolezito.com",
  "password": "admin123456"
}

# 2. Criar conta de promoter
POST /auth/register
{
  "email": "promoter@restaurante.com",
  "password": "senha123",
  "role": "promoter"
}
```

### 2. Promoter cadastra lugar
```bash
# 1. Login como promoter
POST /auth/login
{
  "email": "promoter@restaurante.com",
  "password": "senha123"
}

# 2. Criar lugar
POST /places
{
  "name": "Pizza da Casa",
  "description": "As melhores pizzas da região",
  "address": "Av. Principal, 456",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "categoryId": "uuid_categoria_restaurante"
}

# 3. Ativar destaque
PUT /places/{place_id}/featured
{
  "isFeatured": true
}
```

### 3. Usuário final usa o app
```bash
# 1. Registrar como usuário
POST /auth/register
{
  "email": "cliente@email.com",
  "password": "senha123"
}

# 2. Login
POST /auth/login
{
  "email": "cliente@email.com",
  "password": "senha123"
}

# 3. Buscar lugares próximos
GET /places?lat=-23.5505&lng=-46.6333&radius=5

# 4. Favoritar lugar
POST /favorites
{
  "placeId": "uuid_do_lugar"
}

# 5. Avaliar lugar
POST /reviews
{
  "placeId": "uuid_do_lugar",
  "rating": 5,
  "comment": "Excelente lugar!"
}
```

## 🚨 Códigos de Erro Comuns

- `400` - Dados inválidos
- `401` - Token inválido ou expirado
- `403` - Sem permissão (role insuficiente)
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

## 💡 Dicas de Implementação

### Headers necessários
```bash
Content-Type: application/json
Authorization: Bearer {jwt_token}
```

### Verificação de roles no frontend
```javascript
// Verificar se usuário pode criar lugares
const canCreatePlaces = user.role === 'promoter' || user.role === 'admin';

// Verificar se usuário pode gerenciar outros usuários
const canManageUsers = user.role === 'admin';
```

### Tratamento de erros
```javascript
// Exemplo de tratamento no frontend
try {
  const response = await api.post('/places', placeData);
} catch (error) {
  if (error.response?.status === 403) {
    alert('Você não tem permissão para criar lugares');
  } else if (error.response?.status === 401) {
    // Redirecionar para login
    redirectToLogin();
  }
}
```