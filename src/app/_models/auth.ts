export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Auth {
  token: string;
  user: User;
}
