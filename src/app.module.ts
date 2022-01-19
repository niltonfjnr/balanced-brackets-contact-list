import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StringValidationService } from './services/string-validation/string-validation.service';
import { StringValidationController } from './controllers/string-validation/string-validation.controller';

@Module({
  imports: [],
  controllers: [AppController, StringValidationController],
  providers: [AppService, StringValidationService],
})
export class AppModule {}
