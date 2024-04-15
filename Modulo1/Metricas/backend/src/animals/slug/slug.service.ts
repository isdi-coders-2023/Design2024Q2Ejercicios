import { Injectable } from '@nestjs/common';
import { People } from 'src/db/people-db/people';
import { PeopleDbService } from 'src/db/people-db/people-db.service';

@Injectable()
export class SlugService {
  constructor(private readonly people: PeopleDbService) {}

  getFriendsInBunch(people: People, bunch: People[]): People[] {
    return bunch.filter((bunchMember) =>
      bunchMember.friends.includes(people.id),
    );
  }

  selectABunchOfPeople(bunch: People[]): string {
    const selected = bunch
      .filter(() => Math.random() > 0.1)
      .map((people: People) => ({
        ...people,
        friends: undefined,
      }));

    const withFriends = bunch
      .filter((people) => {
        for (const selectedPerson of selected) {
          const friends = this.getFriendsInBunch(selectedPerson, bunch);

          for (const friend of friends) {
            if (friend.id === people.id) {
              return true;
            }
          }
        }
      })
      .map((people: People) => ({
        ...people,
        friends: this.getFriendsInBunch(people, bunch),
      }))
      .concat(selected);

    const serializedResult =
      '[' +
      withFriends
        .map((people) => JSON.stringify(people, null, 2))
        .reduce((acc, people) => acc + ',' + people) +
      ']';

    return serializedResult;
  }

  creep(debug: boolean): string {
    return this.selectABunchOfPeople(this.people.getPeople(debug ? 100 : 1000));
  }
}
