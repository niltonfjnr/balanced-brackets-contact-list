import { Person } from '../../domain/entities/person.entity';
import { PersonService } from '../../services/person/person.service';

import { PersonController } from './person.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
