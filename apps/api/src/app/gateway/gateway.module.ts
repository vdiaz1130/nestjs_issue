import { Module } from '@nestjs/common';
import { WSGateway } from './gateway';
import { ClientService } from '../client/client.service';

@Module({
  providers: [WSGateway, ClientService],
  exports: [WSGateway],
})
export class GatewayModule {
  static count = 0;
  constructor() {
    GatewayModule.count += 1;
    console.log('GatewayModule Constructor: ', GatewayModule.count);
  }
}
