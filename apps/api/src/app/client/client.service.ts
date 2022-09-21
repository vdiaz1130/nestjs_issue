import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';

@Injectable()
export class ClientService {
  constructor(@Inject(REQUEST) protected readonly request: Request) {
  // constructor() {
    // super(request);
    console.log('ClientService Constructor');
  }
}
