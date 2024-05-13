import request from 'supertest';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'node:assert';
import { World } from './World';

export const MOCKED_TOKEN = 'some-token';
Given(
  'que el usuario tiene acceso a la API de gestión de tareas',
  function (this: World) {
    this.shouldAuthenticate = true;
    this.bearerToken = MOCKED_TOKEN;
  },
);

When(
  'el usuario envía una solicitud GET al endpoint {string}',
  async function (this: World, url: string) {
    this.request = request(this.app?.getHttpServer()).get(url);
    if (this.shouldAuthenticate)
      this.request.auth(this.bearerToken ?? '', {
        type: 'bearer',
      });

    this.response = await this.request.send();
  },
);

When(
  'el usuario envía una solicitud POST al endpoint {string} con el siguiente JSON:',
  async function (this: World, url: string, body: string) {
    this.request = request(this.app?.getHttpServer()).post(url);
    const data: object = JSON.parse(body);
    this.request = this.request.set('Content-Type', 'application/json');
    if (this.shouldAuthenticate)
      this.request.auth(this.bearerToken ?? '', {
        type: 'bearer',
      });

    this.response = await this.request.send(data);
  },
);

Then(
  'la solicitud debe ser exitosa con un código de respuesta {int}',
  async function (this: World, status: number) {
    assert.strictEqual(
      this.response?.status === status,
      true,
      `Expected status ${status}, but recieved ${this.response?.status}`,
    );
  },
);

Then(
  'el contenido de la respuesta debe ser:',
  function (this: World, body: string) {
    assert.deepEqual(this.response?.body, JSON.parse(body));
  },
);
