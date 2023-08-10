export interface User {
    email:string;
    password:string;
    id:string | undefined
    tel:string;
    username:string;
    gender:string | undefined
    posts:[id:string | undefined];
    followers:{};
    messages:[];
    sent:[]
  }
  //yes