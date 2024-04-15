export interface People {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  friends?: People[];
}
