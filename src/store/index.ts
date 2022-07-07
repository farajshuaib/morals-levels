import { createStore } from "easy-peasy";
import MoralsModel from "./moralsModal";
import StudentsModel from "./students";
import UserData from "./userData"


export const store = createStore({
  morals: MoralsModel,
  students: StudentsModel,
  userData: UserData
});
