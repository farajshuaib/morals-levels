import { action, thunk, computed } from "easy-peasy";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentById,
} from "../services/studentsCRUD";

import { StudentModel } from "../types";

const StudentsModel: StudentModel = {
  students: [],
  get_students: computed((state) => state.students),
  setStudents: action((state, payload) => {
    state.students = payload;
  }),
  getStudents: thunk(async (actions) => {
    const data = await getStudents();
    actions.setStudents(data);
  }),
  addStudentToList: action((state, text) => {
    state.students.push(text);
  }),
  addStudent: thunk(async (actions, payload) => {
    const response = await addStudent(payload);
    actions.addStudentToList(response);
  }),
  removeStudent: action((state, id) => {
    state.students.filter((val) => val.id !== id);
  }),
  deleteStudent: thunk(async (actions, id) => {
    await deleteStudent(id);
    actions.removeStudent(id);
  }),
  setStudent: action((state, payload) => {
    state.students = state.students.map((student) => {
      if (student.id == payload.id) {
        return payload;
      } else {
        return student;
      }
    });
  }),
  updateStudent: thunk(async (actions, payload) => {
    const res = await updateStudent(payload);
    actions.setStudent(res);
  }),
  getStudentById: thunk(async (actions, id) => {
    const res = await getStudentById(id);
    return res;
  }),
};

export default StudentsModel;
