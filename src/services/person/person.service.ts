import { Person } from '../../domain/entities/person.entity';
import { Contact } from '../../domain/entities/contact.entity';
import PersonInsertUtils from './person-insert-utils';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  async insert(person: Person): Promise<InsertResult> {
    const result = await this.peopleRepository.insert(person);
    try {
      const personId = PersonInsertUtils.getGeneratedPersonPrimaryKey(result);
      if (personId) {
        PersonInsertUtils.definePersonPrimaryKeyToContacts(person, personId);
        await this.contactRepository.insert(person.contacts);
      }
    } catch (error) {
      throw error;
    }
    return result;
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
