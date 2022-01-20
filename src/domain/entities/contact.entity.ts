import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: ['Email', 'Phone', 'Whatsapp'] })
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  value: string;

  @ManyToOne(() => Person, (person) => person.contacts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  person: Person;
}
