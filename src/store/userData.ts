import { action, thunk, computed } from "easy-peasy";
import { UserDataModel } from "../types";

const userData: UserDataModel = {
  data: null,
  setUserData: action((state, payload) => {
    state.data = payload;
  }),
  get: computed((state) => state.data),
};

export default userData;
