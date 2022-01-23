import { Person } from '../../domain/entities/person.entity';
import { InsertResult } from 'typeorm';

export default class PersonInsertUtils {
  static getGeneratedPersonPrimaryKey(result: InsertResult) {
    const { raw } = result;
    const personId = raw && raw.length && raw[0].id;
    return personId;
  }

  static definePersonPrimaryKeyToContacts(person: Person, personId: number) {
    person.id = personId;
    for (let index = 0; index < person.contacts.length; index++) {
      const contact = person.contacts[index];
      contact.person = person;
    }
  }
}
