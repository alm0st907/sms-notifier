import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { messageDto } from './companies/dtos/message.dto';
import { request } from 'express';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  postHello(@Req() request: Request): string {
    // console.log(request.headers['authorization']);
    // console.log(request['user']);
    console.log(request.body);
    return this.appService.getHello();
  }

  //allows us to send the message from swagger for test purposes
  @Post('send-sms')
  @ApiBody({ type: messageDto })
  async sendSms(
    @Body() incomingMessage: messageDto,
    @Req() request: Request,
  ): Promise<string> {
    const recipientNumber = incomingMessage.phoneNumber;
    const msgBody = incomingMessage.msg;
    const userId = request['user'].sub;
    const result = await this.appService.sendSms(
      msgBody,
      recipientNumber,
      userId,
    );
    if (!result) throw new Error('SMS failed to send');
    return 'SMS sent successfully';
  }
}
