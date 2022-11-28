export interface User {
  name: string;
  email: string;
  account: UserAccount;
}

export interface Auth {
  token: string;
}

export enum UserAccount {
  FREE = 'FREE',
  PAID = 'PAID'
}
