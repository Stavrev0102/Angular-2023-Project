export interface User {
    email:string;
    password:string;
    id:string | undefined
    tel:string;
    username:string;
    posts:[id:string | undefined];
    followers:{};
    messages:[];
  }
  //yes