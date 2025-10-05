import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rolezito API',
      version: '1.0.0',
      description: 'API REST para o aplicativo Rolezito - Descubra os melhores lugares',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Place: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            openingHours: {
              type: 'object',
              properties: {
                today: { type: 'string' },
                week: { 
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            },
            isOpen: { type: 'boolean' },
            styleChips: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: { type: 'string' }
                }
              }
            },
            highlights: {
              type: 'array',
              items: { type: 'string' }
            },
            averageRating: { type: 'number' },
            reviewCount: { type: 'number' },
            categoryId: { type: 'string' },
            category: { $ref: '#/components/schemas/Category' },
            reviews: {
              type: 'array',
              items: { $ref: '#/components/schemas/Review' }
            },
            images: {
              type: 'array',
              items: { $ref: '#/components/schemas/PlaceImage' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            rating: { type: 'number' },
            comment: { type: 'string' },
            userId: { type: 'string' },
            placeId: { type: 'string' },
            user: { $ref: '#/components/schemas/User' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        PlaceImage: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            url: { type: 'string' },
            alt: { type: 'string' },
            placeId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            username: { type: 'string' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            phone: { type: 'string' },
            avatar: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { 
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com'
            },
            password: { 
              type: 'string',
              example: 'minhasenha123'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password', 'fullName'],
          properties: {
            username: { 
              type: 'string',
              example: 'usuario123'
            },
            email: { 
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com'
            },
            password: { 
              type: 'string',
              example: 'minhasenha123'
            },
            fullName: { 
              type: 'string',
              example: 'João Silva'
            },
            phone: { 
              type: 'string',
              example: '(11) 99999-9999'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    },
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

export const specs = swaggerJSDoc(options);