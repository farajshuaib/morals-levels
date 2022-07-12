import { StudentData, Student } from "./../types";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
  doc,
  deleteDoc,
  QueryDocumentSnapshot,
  DocumentData,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";

const _studentsRef = collection(db, "students");

const getStudents = () => {
  return new Promise<Student[]>(async (resolve, reject) => {
    try {
      const studentsSnapshot = await getDocs(_studentsRef);
      const studentsList = studentsSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return { id: doc.id, data: doc.data() as StudentData };
        }
      ) as Student[];
      resolve(studentsList);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const addStudent = (student: Student) => {
  return new Promise<Student>(async (resolve, reject) => {
    try {
      const docRef = await addDoc(_studentsRef, { ...student });
      const snapShot = await getDoc(docRef);
      resolve({ id: snapShot.id, data: snapShot.data() as StudentData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const getStudentByEmail = (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(_studentsRef, where("email", "==", email));

      const studentsSnapshot = await getDocs(q);
      const studentsList = studentsSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return { id: doc.id, data: doc.data() as StudentData };
        }
      ) as Student[];
      console.log("studentsList",studentsList)
      if (studentsList.length > 0) {
        resolve(studentsList[0]);
      } else {
        resolve(null);
      }
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const deleteStudent = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await deleteDoc(doc(db, "students", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const updateStudent = (student: Student) => {
  return new Promise<Student>(async (resolve, reject) => {
    try {
      if (!student.id) return;
      await updateDoc(doc(db, "students", student.id), { ...student.data });
      const res = await getDoc(doc(db, "students", student.id));
      resolve({ id: res.id, data: res.data() as StudentData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const getStudentById = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getDoc(doc(db, "students", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

export {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentById,
  getStudentByEmail,
};
