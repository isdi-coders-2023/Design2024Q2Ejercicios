import { Response, Test } from 'supertest';
import { INestApplication } from '@nestjs/common';

export interface World {
  app: INestApplication;
  request?: Test;
  response?: Response;
  shouldAuthenticate?: boolean;
  bearerToken?: string;
}
