import { PersonSchema } from '../../infra/typeorm/schemas/person.schema';
import { ContactSchema } from '../../infra/typeorm/schemas/contact.schema';
import { PersonService } from '../../services/person/person.service';

import { PersonController } from './person.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PersonSchema, ContactSchema])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
