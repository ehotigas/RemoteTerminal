import { TerminalModule } from './Terminal/TerminalModule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TerminalModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
