import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Company {
  @Column()
  name: string;

  @PrimaryColumn()
  clerkId: string;

  @Column()
  messageHeader: string;

  @Column()
  messageFooter: string;
}
