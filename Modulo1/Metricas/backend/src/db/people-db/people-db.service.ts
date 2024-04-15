import { Injectable } from '@nestjs/common';
import { People } from './people';
import { faker } from '@faker-js/faker';

@Injectable()
export class PeopleDbService {
  generatePeople(n: number): People[] {
    return Array.from({ length: n }, () => ({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement([
        'user',
        'administrator',
        'company',
        'spy',
      ]),
      friends: [],
    }));
  }

  connectPeople(people: People[], maxFriends: number): void {
    people.forEach((person) => {
      const numberOfFriends = Math.random() * maxFriends + 1;
      person.friends = faker.helpers
        .shuffle(people)
        .slice(0, numberOfFriends)
        .map((friend) => friend.id);
    });
  }

  getPeople(n: number, maxFriends: number = 5): People[] {
    const people: People[] = this.generatePeople(n);

    this.connectPeople(people, maxFriends);

    return people;
  }
}
