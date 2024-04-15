import { Module } from '@nestjs/common';
import { CitiesDbService } from './cities-db/cities-db.service';
import { PeopleDbService } from './people-db/people-db.service';

@Module({
  providers: [CitiesDbService, PeopleDbService],
  exports: [CitiesDbService, PeopleDbService],
})
export class DbModule {}
