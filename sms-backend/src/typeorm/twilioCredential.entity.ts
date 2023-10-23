import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TwilioCredential {
  @PrimaryColumn()
  clerkId: string;
  @Column()
  accountSid: string;
  @Column()
  authToken: string;
  @Column()
  twilioNumber: string;
}
