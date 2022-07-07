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
  get_values: Computed<MoralsModel, MoralValue[]>
}
