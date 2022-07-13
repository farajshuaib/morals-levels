import { action, thunk, computed } from "easy-peasy";

import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserById,
} from "../services/usersCRUD";

import { UserModel } from "../types";

const UsersModel: UserModel = {
  users: [],
  get_users: computed((state) => state.users),
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
  getUsers: thunk(async (actions) => {
    const data = await getUsers();
    actions.setUsers(data);
  }),
  addUserToList: action((state, text) => {
    state.users.push(text);
  }),
  addUser: thunk(async (actions, payload) => {
    const response = await addUser(payload);
    actions.addUserToList(response);
  }),
  removeUser: action((state, id) => {
    state.users.filter((val) => val.id !== id);
  }),
  deleteUser: thunk(async (actions, id) => {
    await deleteUser(id);
    actions.removeUser(id);
  }),
  setUser: action((state, payload) => {
    state.users = state.users.map((User) => {
      if (User.id == payload.id) {
        return payload;
      } else {
        return User;
      }
    });
  }),
  updateUser: thunk(async (actions, payload) => {
    const res = await updateUser(payload);
    actions.setUser(res);
  }),
  getUserById: thunk(async (actions, id) => {
    const res = await getUserById(id);
    return res;
  }),
};

export default UsersModel;
