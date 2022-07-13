import { createStore } from "easy-peasy";
import MoralsModel from "./moralsModal";
import UsersModel from "./users";
import UserData from "./userData"


export const store = createStore({
  morals: MoralsModel,
  users: UsersModel,
  userData: UserData
});
