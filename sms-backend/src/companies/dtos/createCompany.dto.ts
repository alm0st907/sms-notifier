import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ClerkId: string;

  messageHeader: string;

  messageFooter: string;
}
