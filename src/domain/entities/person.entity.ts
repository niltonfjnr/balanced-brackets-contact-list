import { Contact } from './contact.entity';

export interface Person {
  id: number;
  name: string;
  contacts: Contact[];
}
