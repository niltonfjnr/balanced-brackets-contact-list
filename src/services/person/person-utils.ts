import { ContactSchema } from 'src/infra/typeorm/schemas/contact.schema';
import { ContactType } from 'src/domain/enums/contact-type.enum';

export default class PersonUtils {
  static defineContactsType(
    contacts: ContactSchema[],
    contactsTypes: ContactType | ContactType[],
  ) {
    for (let index = 0; index < contacts.length; index++) {
      const contact = contacts[index];
      contact.type =
        contactsTypes && Array.isArray(contactsTypes) && contactsTypes[index]
          ? contactsTypes[index]
          : contactsTypes && typeof contactsTypes === 'string'
          ? contactsTypes
          : ContactType.EMAIL;
    }
  }
}
