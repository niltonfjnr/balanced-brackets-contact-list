import { ContactSchema } from '../../infra/typeorm/schemas/contact.schema';
import { PersonSchema } from '../../infra/typeorm/schemas/person.schema';

import { Repository } from 'typeorm';

export default class PersonUpdateUtils {
  static async settledContactsUpdates(
    person: PersonSchema,
    contactRepository: Repository<ContactSchema>,
  ) {
    const contactsPromises = [];
    for (let index = 0; index < person.contacts.length; index++) {
      const contact = person.contacts[index];
      contactsPromises.push(contactRepository.update(contact.id, contact));
    }
    await Promise.allSettled(contactsPromises);
    delete person.contacts;
  }
}
