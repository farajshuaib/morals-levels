import { toast } from "react-toastify";
import MoralValues from "./moralValue";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  where,
  query,
  getDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

class Values {
  private values: Array<MoralValues> = [];

  public async getValuesFromStorage() {
    try {
      const valuesSnapshot = await getDocs(collection(db, "values"));
      const valuesList = valuesSnapshot.docs.map((doc) =>
        doc.data()
      ) as MoralValues[];
      console.log("valuesList", valuesList);
      this.values = valuesList;
    } catch (e) {
      console.error("error", e);
    }
  }

  public async delete(id: string) {
    // filter out deleted user and save
    this.values = this.values.filter(
      (moral: MoralValues) => moral.getId() !== id
    );
  }

  public add(value: MoralValues) {
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
  public async update(value: MoralValues, id: String) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const docRef = doc(db, "values");

        // getDoc();
        await updateDoc(docRef, { ...value });
        this.values = this.values.map((moral: MoralValues) => {
          if (moral.getId() == value.getId()) {
            return value;
          } else {
            return moral;
          }
        });
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
    return this.values.find((value) => value.getId() == id);
  }

  public getValues(): Array<MoralValues> {
    return this.values;
  }
}

export default Values;
