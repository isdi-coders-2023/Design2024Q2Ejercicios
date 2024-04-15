import { Module } from '@nestjs/common';
import { AnimalsModule } from './animals/animals.module';
import { AppController } from './app.controller';
import { DbModule } from './db/db.module';
import { PeopleDbService } from './db/people-db/people-db.service';
import { CitiesDbService } from './db/cities-db/cities-db.service';

@Module({
  imports: [AnimalsModule, DbModule],
  controllers: [AppController],
  providers: [PeopleDbService, CitiesDbService],
})
export class AppModule {}
