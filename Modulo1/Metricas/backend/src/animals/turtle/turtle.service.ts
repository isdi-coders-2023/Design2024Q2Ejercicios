import { Injectable } from '@nestjs/common';
import { CitiesDbService } from 'src/db/cities-db/cities-db.service';

@Injectable()
export class TurtleService {
  constructor(private readonly cities: CitiesDbService) {}

  crawl(debug: boolean): string {
    return JSON.stringify(this.cities.getCities(debug ? 250 : 2500), null, 2);
  }
}
