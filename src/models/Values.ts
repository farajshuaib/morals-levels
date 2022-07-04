import { MoralValue } from "./../types/index";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  where,
  query,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

class Values {
  private values: MoralValue[] = [];

  public async getValuesFromStorage() {
    try {
      const valuesSnapshot = await getDocs(collection(db, "values"));
      const valuesList = valuesSnapshot.docs.map((doc) =>
        doc.data()
      ) as MoralValue[];
      this.values = valuesList;
    } catch (e) {
      console.error("error", e);
    }
  }

  public async delete(id: string) {
    // filter out deleted user and save
    this.values = this.values.filter((moral: MoralValue) => moral.id !== id);
  }

  public add(value: MoralValue) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await addDoc(collection(db, "values"), { ...value });
        this.values.push(value);
        resolve();
      } catch (e) {
        console.error("error", e);
        toast.error(
          "حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني"
        );
        reject(e);
      }
    });
  }
  public async update(value: MoralValue, id: String) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const docRef = doc(db, "values");

        // getDoc();
        await updateDoc(docRef, { ...value });
        this.values = this.values.map((moral: MoralValue) => {
          if (moral.id == value.id) {
            return value;
          } else {
            return moral;
          }
        }) as MoralValue[];
        resolve();
      } catch (e) {
        console.error("error", e);
        toast.error(
          "حدث خطأ ما، الرجاء اعادة المحاولة او الاتصال بالدعم الفني"
        );
        reject(e);
      }
    });
  }

  public async getById(id: string) {
    const docRef = doc(db, "values");
    const document = await getDoc(docRef);
    return this.values.find((value) => value.id == id);
  }

  public getValues(): Array<MoralValue> {
    return this.values;
  }
}

export default Values;
