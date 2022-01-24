import { ContactType } from '../../domain/enums/contact-type.enum';
import { PersonService } from '../../services/person/person.service';
import { PersonSchema } from '../../infra/typeorm/schemas/person.schema';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(readonly personService: PersonService) {}

  @Post()
  @ApiQuery({ name: 'contactsTypes', enum: ContactType, isArray: true })
  async postPerson(
    @Body() person: PersonSchema,
    @Query('contactsTypes') contactsTypes: ContactType | ContactType[],
  ) {
    try {
      const result = await this.personService.insert(person, contactsTypes);
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }

  @Put(':id')
  @ApiQuery({ name: 'contactsTypes', enum: ContactType, isArray: true })
  async putPerson(
    @Param('id') id: string,
    @Body() person: PersonSchema,
    @Query('contactsTypes') contactsTypes: ContactType | ContactType[],
  ) {
    try {
      if (person) person.id = parseInt(id);
      const result = await this.personService.update(person, contactsTypes);
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }

  @Get(':id')
  async getPersonById(@Param('id') id: string) {
    try {
      const result = await this.personService.getById(id);
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }

  @Get()
  async getPeople(
    @Query('page') page: string & number,
    @Query('limit') limit: string & number,
  ) {
    try {
      const validPageParam = page && !isNaN(page) ? parseInt(page) : 0;
      const validLimitParam = limit && !isNaN(limit) ? parseInt(limit) : 10;

      const result = await this.personService.getAll(
        validPageParam,
        validLimitParam,
      );
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: string) {
    try {
      const result = await this.personService.delete(id);
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }
}
