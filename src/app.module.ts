import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringValidationService } from './services/string-validation/string-validation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StringValidationService],
})
export class AppModule {}
