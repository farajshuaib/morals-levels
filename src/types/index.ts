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


export interface UserDataModel {
  data: Student | null;
  setUserData: Action<UserDataModel, Student>;
  get: Computed<UserDataModel, Student | null>;
}

export interface StudentData {
  name: string;
  email: string;
  student_id: string;
  status: userStatus;
}

export interface Student {
  id: string;
  data: StudentData;
}

export interface StudentModel {
  students: Student[];
  setStudents: Action<StudentModel, Student[]>;
  getStudents: Thunk<StudentModel, Student>;
  addStudentToList: Action<StudentModel, Student>;
  addStudent: Thunk<StudentModel, Student>;
  removeStudent: Action<StudentModel, string>;
  deleteStudent: Thunk<StudentModel, string>;
  updateStudent: Thunk<StudentModel, Student>;
  setStudent: Action<StudentModel, Student>;
  getStudentById: Thunk<StudentModel, string>;
  get_students: Computed<StudentModel, Student[]>;
}
