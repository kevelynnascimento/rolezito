# API Rolezito - Refatorada com Routing Controllers

Esta API foi refatorada para usar `routing-controllers`, que simplifica a criação de controllers e gera automaticamente a documentação Swagger.

## 🚀 O que mudou?

### Antes (com Express tradicional)
- Controllers com métodos `static`
- Rotas definidas manualmente em arquivos separados
- Documentação Swagger escrita manualmente com comentários `@swagger`
- Validação manual dos dados de entrada

### Depois (com routing-controllers)
- Controllers com decorators `@JsonController`, `@Get`, `@Post`, etc.
- Rotas geradas automaticamente pelos decorators
- Documentação Swagger gerada automaticamente
- Validação automática usando `class-validator`
- DTOs (Data Transfer Objects) para tipagem e validação

## 📁 Nova Estrutura

```
src/
├── controllers/           # Controllers refatorados com decorators
│   ├── auth.controller.ts    # ✅ Refatorado
│   ├── place.controller.ts   # ✅ Refatorado  
│   ├── category.controller.ts # ✅ Refatorado
│   ├── favorite.controller.ts # 🔄 Precisa refatorar
│   └── notification.controller.ts # 🔄 Precisa refatorar
├── dtos/                 # 🆕 Data Transfer Objects
│   ├── auth.dto.ts
│   ├── place.dto.ts
│   ├── category.dto.ts
│   └── common.dto.ts
├── middleware/
│   └── auth.middleware.ts    # ✅ Refatorado para routing-controllers
├── entities/             # Entities atualizadas
└── routes/               # 🗑️ Arquivos antigos renomeados (.old)
```

## 🎯 Principais Melhorias

### 1. Controllers Simplificados
```typescript
// Antes
export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      // lógica manual...
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro' });
    }
  }
}

// Depois
@JsonController('/auth')
export class AuthController {
  @Post('/register')
  @HttpCode(201)
  @ResponseSchema(AuthResponseDto, { statusCode: 201 })
  async register(@Body() data: RegisterDto): Promise<AuthResponseDto> {
    // lógica simplificada...
    return result;
  }
}
```

### 2. Validação Automática
```typescript
export class RegisterDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;
}
```

### 3. Documentação Swagger Automática
- Não precisa mais escrever comentários `@swagger`
- Schemas gerados automaticamente a partir dos DTOs
- Documentação sempre atualizada com o código

### 4. Middleware de Autenticação Melhorado
```typescript
@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  // implementação com melhor tratamento de erros
}
```

## 🛠️ Como Usar

### 1. Iniciar o Servidor
```bash
npm run dev
```

### 2. Acessar a Documentação
Abra no navegador: `http://localhost:3000/api-docs`

### 3. Endpoints Disponíveis

#### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

#### Categorias  
- `GET /api/categories` - Listar categorias
- `POST /api/categories` - Criar categoria (requer auth)

#### Lugares
- `GET /api/places` - Listar lugares (com filtros)
- `GET /api/places/:id` - Buscar lugar por ID
- `POST /api/places` - Criar lugar (requer auth)

### 4. Exemplo de Requisição

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Usuário Teste",
    "password": "123456"
  }'

# Fazer login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "test@example.com",
    "password": "123456"
  }'
```

## 🎉 Benefícios da Refatoração

1. **Menos Código**: Redução de ~40% no código boilerplate
2. **Melhor Manutenibilidade**: Código mais limpo e organizado
3. **Documentação Automática**: Swagger sempre atualizado
4. **Validação Robusta**: Validação automática com mensagens personalizadas
5. **Tipagem Forte**: DTOs garantem type safety
6. **Melhor DX**: Desenvolvimento mais rápido e menos propenso a erros

## 🔄 Próximos Passos

1. **Refatorar controllers restantes**:
   - `FavoriteController`
   - `NotificationController`

2. **Criar DTOs para os controllers restantes**

3. **Remover arquivos de rota antigos** (atualmente renomeados para .old)

4. **Adicionar mais middlewares** se necessário

5. **Implementar paginação** nos endpoints de listagem

## 📚 Documentação de Referência

- [Routing Controllers](https://github.com/typestack/routing-controllers)
- [Class Validator](https://github.com/typestack/class-validator)
- [Routing Controllers OpenAPI](https://github.com/epiphone/routing-controllers-openapi)

## 🔧 Troubleshooting

### Erro "Cannot find name 'xxx'"
- Verifique se todos os imports estão corretos
- Execute `npm install` para garantir que todas as dependências estão instaladas

### Swagger não carrega
- Verifique se o servidor está rodando
- Acesse `http://localhost:3000/api-docs`
- Verifique o console para erros

### Validação não funciona
- Certifique-se de que `validation: true` está habilitado no `useExpressServer`
- Verifique se os decorators de validação estão importados corretamente