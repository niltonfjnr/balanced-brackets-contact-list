import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: [Contact] })
  @OneToMany(() => Contact, (contact) => contact.person, {
    primary: true,
    eager: true,
  })
  contacts: Contact[];
}
