import { Contact } from '../../../domain/entities/contact.entity';
import { PersonSchema } from './person.schema';

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Contact' })
export class ContactSchema implements Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ApiProperty()
  @Column()
  value: string;

  @ManyToOne(() => PersonSchema, (person) => person.contacts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  person: PersonSchema;
}
