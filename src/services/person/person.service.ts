import { Person } from '../../domain/entities/person.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}
  insert(person: Person): Promise<InsertResult> {
    return this.peopleRepository.insert(person);
  }
  update(person: Person): Promise<any> {
    return this.peopleRepository.update(person.id, person);
  }
  getById(id: string): Promise<Person> {
    return this.peopleRepository.findOne(id);
  }
  getAll(validPageParam: number, validLimitParam: number) {
    const query = {
      skip: validPageParam,
      take: validLimitParam,
    };
    return this.peopleRepository.find(query);
  }
  async delete(id: string): Promise<void> {
    await this.peopleRepository.delete(id);
  }
}
