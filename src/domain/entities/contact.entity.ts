import { Person } from './person.entity';

export interface Contact {
  id: number;
  type: string;
  value: string;
  person: Person;
}
