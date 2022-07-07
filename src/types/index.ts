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


export interface userData {

}
export interface UserDataModel {
  data: userData | null;
  setUserData: Action<UserDataModel, userData>;
  get: Computed<UserDataModel, userData | null>;
}

export interface StudentData {
  name: string;
  email: string;
  student_id: string;
  status: "approved" | "rejected" | "waiting" | "suspended";
}

export interface Student {
  id: string;
  data: StudentData;
}

export interface StudentModel {
  students: Student[];
  setStudents: Action<MoralsModel, Student[]>;
  getStudents: Thunk<MoralsModel, Student>;
  addStudentToList: Action<MoralsModel, Student>;
  addStudent: Thunk<MoralsModel, Student>;
  removeStudent: Action<MoralsModel, string>;
  deleteStudent: Thunk<MoralsModel, string>;
  updateStudent: Thunk<MoralsModel, Student>;
  setStudent: Action<MoralsModel, Student>;
  getStudentById: Thunk<MoralsModel, string>;
  get_students: Computed<MoralsModel, Student[]>;
}
