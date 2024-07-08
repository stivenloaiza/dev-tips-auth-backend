// Importa las dependencias necesarias
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module'; 

describe('ApiKeyMiddleware (Integration)', () => {
    let app;
  
    // Configurar el entorno de prueba antes de cada prueba
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule], // Importa el módulo principal de tu aplicación
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    // Prueba para verificar que el middleware responda con 401 con clave API válida
    it('should respond with 401 with valid API key', () => {
      return request(app.getHttpServer())
        .get('/test')
        .set('api-key', 'valid_api_key')
        .expect(401); // Espera que se reciba un código de estado 401
    });
  
    // Prueba para verificar que el middleware responda con 401 con clave API inválida
    it('should respond with 401 with invalid API key', () => {
      return request(app.getHttpServer())
        .get('/test') 
        .set('api-key', 'invalid_api_key')
        .expect(401); // Espera que se reciba un código de estado 401
    });
  
    
    afterEach(async () => {
      await app.close();
    });
  });
