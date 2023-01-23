import { User } from "./user";

export interface PeriodicElement {
    position: number;
    user: User;
  }


   
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, user : new User()},
   ];