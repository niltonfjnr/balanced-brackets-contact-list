import { ContactType } from '../../domain/enums/contact-type.enum';
import { PersonSchema } from '../../infra/typeorm/schemas/person.schema';
import { ContactSchema } from '../../infra/typeorm/schemas/contact.schema';
import PersonUtils from './person-utils';
import PersonInsertUtils from './person-insert-utils';
import PersonUpdateUtils from './person-update-utils';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonSchema)
    private peopleRepository: Repository<PersonSchema>,
    @InjectRepository(ContactSchema)
    private contactRepository: Repository<ContactSchema>,
  ) {}
  async insert(
    person: PersonSchema,
    contactsTypes: ContactType | ContactType[],
  ): Promise<InsertResult> {
    const result = await this.peopleRepository.insert(person);
    try {
      const personId = PersonInsertUtils.getGeneratedPersonPrimaryKey(result);
      if (personId) {
        PersonInsertUtils.definePersonPrimaryKeyToContacts(person, personId);
        PersonUtils.defineContactsType(person.contacts, contactsTypes);
        await this.contactRepository.insert(person.contacts);
      }
    } catch (error) {
      throw error;
    }
    return result;
  }

  async update(
    person: PersonSchema,
    contactsTypes: ContactType | ContactType[],
  ): Promise<any> {
    PersonUtils.defineContactsType(person.contacts, contactsTypes);
    await PersonUpdateUtils.settledContactsUpdates(
      person,
      this.contactRepository,
    );
    const result = await this.peopleRepository.update(person.id, person);
    return result;
  }

  getById(id: string): Promise<PersonSchema> {
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
