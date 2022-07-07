import { action, thunk, computed } from "easy-peasy";

import {
  getValues,
  addValue,
  deleteValue,
  updateValue,
  getValueById,
} from "../services/moralsCRUD";

import { MoralValue, MoralsModel } from "../types";

const MoralsModel: MoralsModel = {
  values: [],
  get_values: computed((state) => state.values),
  setValues: action((state, payload: MoralValue[]) => {
    state.values = payload;
  }),
  getValues: thunk(async (actions) => {
    const data = await getValues();
    actions.setValues(data);
  }),
  addValueToList: action((state, text) => {
    state.values.push(text);
  }),
  addValue: thunk(async (actions, payload) => {
    const response = await addValue(payload);
    actions.addValueToList(response);
  }),
  removeValue: action((state, id) => {
    state.values.filter((val) => val.id !== id);
  }),
  deleteValue: thunk(async (actions, id) => {
    await deleteValue(id);
    actions.removeValue(id);
  }),
  setValue: action((state, payload) => {
    state.values = state.values.map((value) => {
      if (value.id == payload.id) {
        return payload;
      } else {
        return value;
      }
    });
  }),
  updateValue: thunk(async (actions, payload) => {
    const res = await updateValue(payload);
    actions.setValue(res);
  }),
  getValueById: thunk(async (actions, id) => {
    const res = await getValueById(id);
    return res;
  }),
};

export default MoralsModel;
