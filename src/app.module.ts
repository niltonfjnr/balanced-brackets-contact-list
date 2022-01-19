import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringValidationService } from './services/string-validation/string-validation.service';
import { StringValidationController } from './controllers/string-validation/string-validation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './controllers/person/person.controller';
import { PersonService } from './services/person/person.service';
import { Person } from './domain/entities/person.entity';

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
    TypeOrmModule.forFeature([Person]),
  ],
  controllers: [AppController, StringValidationController, PersonController],
  providers: [AppService, StringValidationService, PersonService],
})
export class AppModule {}
