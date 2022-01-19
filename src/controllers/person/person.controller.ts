import { Person } from '../../domain/entities/person.entity';
import { PersonService } from '../../services/person/person.service';

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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(readonly personService: PersonService) {}

  @Post()
  async postPerson(@Body() person: Person) {
    try {
      const result = await this.personService.insert(person);
      return result;
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }

  @Put(':id')
  async putPerson(@Param('id') id: string, @Body() person: Person) {
    try {
      if (person) person.id = parseInt(id);
      const result = await this.personService.update(person);
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
