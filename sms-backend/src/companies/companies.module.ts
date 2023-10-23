import { Module } from '@nestjs/common';
import { companiesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../typeorm/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [companiesService],
})
export class CompaniesModule {}
