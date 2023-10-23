import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './typeorm/company.entity';
import { CompaniesModule } from './companies/companies.module';
import { TwilioCredential } from './typeorm/twilioCredential.entity';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_URL'),
        port: +configService.get<number>('5432'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [Company, TwilioCredential],
        synchronize: true,
        ssl: true,
        options: {
          trustServerCertificate: true,
        },
      }),
      inject: [ConfigService],
    }),
    CompaniesModule,
  ],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    JwtService,
  ],
})
export class AppModule {}
