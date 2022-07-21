import { Action, Thunk, Computed } from "easy-peasy";

export interface MoralData {
  valueName: String;
  ExaggerateValueName: String;
  DerelictionValueName: String;
  StandardValue: String;
  SourcedValue: String;
  LevelValue: String;
  LadderValue: String;
  SchoolValue: String;
  TypedValue: String;
  ActivationValue: String;
  student_id?: String;
}

export interface MoralValue {
  id: string;
  data: MoralData;
}

export interface MoralsModel {
  values: MoralValue[];
  setValues: Action<MoralsModel, MoralValue[]>;
  getValues: Thunk<MoralsModel, MoralValue>;
  addValueToList: Action<MoralsModel, MoralValue>;
  addValue: Thunk<MoralsModel, MoralValue>;
  removeValue: Action<MoralsModel, string>;
  deleteValue: Thunk<MoralsModel, string>;
  updateValue: Thunk<MoralsModel, MoralValue>;
  setValue: Action<MoralsModel, MoralValue>;
  getValueById: Thunk<MoralsModel, string>;
  get_values: Computed<MoralsModel, MoralValue[]>;
}

export type userStatus = "approved" | "rejected" | "waiting" | "suspended";

// current user
export interface UserDataModel {
  data: User | null;
  setUserData: Action<UserDataModel, User>;
  get: Computed<UserDataModel, User | null>;
}

export type userRole = "student" | "teacher";

export interface UserData {
  name: string;
  email: string;
  student_id: string;
  password: string;
  status: userStatus;
  role: userRole;
}

export interface User {
  id: string;
  data: UserData;
}

export interface UserModel {
  users: User[];
  setUsers: Action<UserModel, User[]>;
  getUsers: Thunk<UserModel, User>;
  addUserToList: Action<UserModel, User>;
  addUser: Thunk<UserModel, User>;
  removeUser: Action<UserModel, string>;
  deleteUser: Thunk<UserModel, string>;
  updateUser: Thunk<UserModel, User>;
  setUser: Action<UserModel, User>;
  getUserById: Thunk<UserModel, string>;
  get_users: Computed<UserModel, User[]>;
}
