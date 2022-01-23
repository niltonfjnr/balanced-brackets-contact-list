import { Person } from '../../../domain/entities/person.entity';
import { ContactSchema } from './contact.schema';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Person' })
export class PersonSchema implements Person {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: [ContactSchema] })
  @OneToMany(() => ContactSchema, (contacts) => contacts.person, {
    primary: true,
    eager: true,
  })
  contacts: ContactSchema[];
}
