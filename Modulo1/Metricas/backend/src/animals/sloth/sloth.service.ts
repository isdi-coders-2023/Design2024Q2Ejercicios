import { Injectable } from '@nestjs/common';
import { CitiesDbService } from 'src/db/cities-db/cities-db.service';

@Injectable()
export class SlothService {
  constructor(private readonly cities: CitiesDbService) {}

  sleep(debug: boolean): string {
    return JSON.stringify(this.cities.getCities(debug ? 250 : 25000), null, 2);
  }
}
