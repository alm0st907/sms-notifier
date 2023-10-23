import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendSms(
    msgBody: string,
    recipientNumber: string,
    userId: string,
  ): Promise<boolean> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
    const myNumber = process.env.MY_NUMBER;
    const client = new Twilio(accountSid, authToken);
    console.log('userId: ' + userId);
    try {
      const result = await client.messages.create({
        from: twilioNumber,
        to: recipientNumber,
        body: msgBody,
      });
      console.log(result);
      if (result.status != 'failed') {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
