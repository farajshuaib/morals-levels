import { MoralData, MoralValue } from "./../types";
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
} from "firebase/firestore";
import { db } from "../firebase/config";

const _valuesRef = collection(db, "values");

const getValues = () => {
  return new Promise<MoralValue[]>(async (resolve, reject) => {
    try {
      const valuesSnapshot = await getDocs(_valuesRef);
      const valuesList = valuesSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return { id: doc.id, data: doc.data() as MoralData };
        }
      ) as MoralValue[];
      resolve(valuesList);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const addValue = (value: MoralValue) => {
  return new Promise<MoralValue>(async (resolve, reject) => {
    try {
      const docRef = await addDoc(_valuesRef, { ...value });
      const snapShot = await getDoc(docRef);
      resolve({ id: snapShot.id, data: snapShot.data() as MoralData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const deleteValue = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await deleteDoc(doc(db, "values", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const updateValue = (value: MoralValue) => {
  return new Promise<MoralValue>(async (resolve, reject) => {
    try {
      if (!value.id) return;
      await updateDoc(doc(db, "values", value.id), { ...value.data });
      const res = await getDoc(doc(db, "values", value.id));
      resolve({ id: res.id, data: res.data() as MoralData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const getValueById = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getDoc(doc(db, "values", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

export { getValues, addValue, deleteValue, updateValue, getValueById };
