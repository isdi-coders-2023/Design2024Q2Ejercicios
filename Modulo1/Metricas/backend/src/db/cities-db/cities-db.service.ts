import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { City } from './city';

@Injectable()
export class CitiesDbService {
  createNewCity(): City {
    return {
      name: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      population: parseInt(
        faker.string.numeric({ length: { min: 5, max: 6 } }),
      ),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timeZone: faker.location.timeZone(),
    };
  }

  generateCities(n: number): City[] {
    const result: City[] = Array.from({ length: n }).map(() => return {
      name: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      population: parseInt(
        faker.string.numeric({ length: { min: 5, max: 6 } }),
      ),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timeZone: faker.location.timeZone(),
    };
    );

    return result;
  }

  getCities(n: number): City[] {
    return this.generateCities(n);
  }
}
