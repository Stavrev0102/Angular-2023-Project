interface Company {
  bs: string;
  catchPhrase:string;
  name:string;
}

export interface UserId {
  company: Company;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
