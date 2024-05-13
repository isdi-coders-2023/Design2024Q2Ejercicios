import { After, Before } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { World } from './World';

Before({ timeout: 10 * 1000 }, async function (this: World) {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  this.app = moduleFixture.createNestApplication();
  this.app.useLogger(false);

  await this.app.init();
});

After(async function (this: World) {
  await this.app?.close();
});
