import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService, ClientService],
})
export class AppModule {}
