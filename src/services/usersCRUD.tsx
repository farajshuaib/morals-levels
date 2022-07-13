import { UserData, User } from "./../types";
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

const _usersRef = collection(db, "users");

const getUsers = () => {
  return new Promise<User[]>(async (resolve, reject) => {
    try {
      const usersSnapshot = await getDocs(_usersRef);
      const usersList = usersSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return { id: doc.id, data: doc.data() as UserData };
        }
      ) as User[];
      resolve(usersList);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const addUser = (User: User) => {
  return new Promise<User>(async (resolve, reject) => {
    try {
      const docRef = await addDoc(_usersRef, { ...User });
      const snapShot = await getDoc(docRef);
      resolve({ id: snapShot.id, data: snapShot.data() as UserData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const getUserByEmail = (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(_usersRef, where("email", "==", email));

      const usersSnapshot = await getDocs(q);
      const usersList = usersSnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          return { id: doc.id, data: doc.data() as UserData };
        }
      ) as User[];
      console.log("usersList",usersList)
      if (usersList.length > 0) {
        resolve(usersList[0]);
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

const deleteUser = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await deleteDoc(doc(db, "users", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const updateUser = (User: User) => {
  return new Promise<User>(async (resolve, reject) => {
    try {
      if (!User.id) return;
      await updateDoc(doc(db, "users", User.id), { ...User.data });
      const res = await getDoc(doc(db, "users", User.id));
      resolve({ id: res.id, data: res.data() as UserData });
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

const getUserById = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await getDoc(doc(db, "users", id));
      resolve(res);
    } catch (e) {
      console.error("error", e);
      toast.error("حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني");
      reject(e);
    }
  });
};

export {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserById,
  getUserByEmail,
};
