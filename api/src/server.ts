import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import { AppDataSource } from './config/database';

// Import controllers
import { PlaceController } from './controllers/place.controller';
import { FavoriteController } from './controllers/favorite.controller';
import { CategoryController } from './controllers/category.controller';
import { NotificationController } from './controllers/notification.controller';
import { ReviewController } from './controllers/review.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware básico
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar routing-controllers
useExpressServer(app, {
  routePrefix: '/api',
  controllers: [
    PlaceController,
    FavoriteController,
    CategoryController,
    NotificationController,
    ReviewController
  ],
  middlewares: [__dirname + '/middleware/*.ts'],
  defaultErrorHandler: false,
  validation: true,
  classTransformer: true,
});

// Gerar documentação Swagger automaticamente
try {
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, {
    controllers: [
      PlaceController,
      FavoriteController,
      CategoryController,
      NotificationController,
      ReviewController
    ],
    routePrefix: '/api',
  }, {
    openapi: '3.0.0',
    info: {
      title: 'Rolezito API',
      description: 'API REST para o app Rolezito',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
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
    },
  });

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  console.log('📚 Swagger gerado automaticamente');
} catch (error) {
  console.error('❌ Erro ao gerar Swagger:', error);
  // Fallback para documentação básica
  const fallbackSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Rolezito API',
      description: 'API REST para o app Rolezito - Modo Básico',
      version: '1.0.0',
    },
    paths: {},
  };
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(fallbackSpec));
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
  });
};

// Try to connect to database, but don't fail if it's not available
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conexão com banco de dados estabelecida');
    startServer();
  })
  .catch((error) => {
    console.warn('⚠️  Banco de dados não disponível, rodando sem BD:', error.message);
    console.log('🔧 Configure as variáveis de ambiente do banco se necessário');
    startServer();
  });