import { StringValidationService } from './services/string-validation/string-validation.service';
import { StringValidationController } from './controllers/string-validation/string-validation.controller';
import { PersonModule } from './controllers/person/person.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'node-db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // Do not use in production
    }),
    PersonModule,
  ],
  controllers: [AppController, StringValidationController],
  providers: [AppService, StringValidationService],
})
export class AppModule {}
