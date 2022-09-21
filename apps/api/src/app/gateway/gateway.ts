import { OnModuleInit } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientService } from '../client/client.service';


@WebSocketGateway({ cors: { origin: ['http://localhost:3000', 'http://localhost:4200'] } })
export class WSGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;
  
  constructor( private clientService: ClientService) {
    console.log('1. WSGateway Constructor', this.clientService) // <- Does not execute if I inject into Client Service constructor.
  }
  
  async handleConnection(socket: Socket) {
    console.log('2. WSGateway handleConnection', this.clientService); // undefined
  }

  handleDisconnect(client: any) {
    console.log('3. handleDisconnect');
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('invalidateCache')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit(`invalidateCache-${body.clientId}`, {
      msg: `invalidateCache-${body.clientId}`,
      ...body,
    });
  }
}
