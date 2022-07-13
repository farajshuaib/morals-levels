import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { addValueValidationSchema } from "../services/validation";
import { useStoreActions } from "easy-peasy";
import { MoralData, User, UserData } from "../types";

interface props {
  editItem?: User;
}

const UserForm: React.FC<props> = ({ editItem }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const addUser = useStoreActions<any>(
    (actions) => actions.users.addUser
  );
  const updateUser = useStoreActions<any>(
    (actions) => actions.morals.updateUser
  );
  const [initialValues, setInitialValues] = useState<UserData>({
    name: "",
    email: "",
    student_id: "",
    status:"approved",
    role: "student"
  });

  useEffect(() => {
    if (editItem) {
      setInitialValues(editItem.data);
    }
  }, [editItem]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addValueValidationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSuccessMessage("");
        setErrorMessage("");

        try {
          editItem
            ? await updateUser({ id: editItem?.id, data: values })
            : await addUser(values);
          setSubmitting(false);
          resetForm();
          setSuccessMessage(
            editItem ? "تم التعديل بنجاح" : "تم اضافة الطالب بنجاح "
          );
        } catch (e) {
          setSubmitting(false);
          setErrorMessage("حدث خطأ ما الرجاء الاتصال بالدعم الفني");
          console.log(e);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleReset,
        handleSubmit,
        isSubmitting,
      }: any) => (
        <div>
          {[
            {
              name: "name",
              placeholder: "ادخل اسم الطالب",
              label: "اسم الطالب",
            },
            {
              name: "email",
              type: "email",
              label: "البريد  الالكتروني",
              placeholder: "ادخل البريد الالكتروني الخاص بالطالب",
            },
            {
              name: "student_id",
              type: "number",
              label: "رقم القيد",
              placeholder: "ادخل رقم قيد الطالب",
            },
          ].map((item, index) => (
            <div key={index} className="my-5 w-full">
              <label htmlFor={item.name} className="input-lable">
                {item.label}
              </label>
              <Field
                id={item.name}
                type={item.type || "text"}
                className="input"
                required={true}
                placeholder={item.placeholder}
                value={values[item.name]}
                onBlur={handleBlur(item.name)}
                onChange={handleChange(item.name)}
              />
              <ErrorMessage
                component="span"
                className="text-red-600 text-sm "
                name={item.name}
              />
            </div>
          ))}
          {successMessage && (
            <div className="my-5 px-3 py-2 text-lg rounded-lg text-green-600 flex items-center border border-green-600 bg-green-50">
              <i className="bx bx-check text-3xl"></i>
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="my-5 px-3 py-2 text-lg rounded-lg text-red-600 flex items-center border border-red-600 bg-red-50">
              <i className="bx bx-error"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex mt-8 mb-5 items-center gap-8">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit();
              }}
              className={`${
                isSubmitting && "opacity-60"
              } px-8 py-2 border-2 border-green-600 rounded-lg bg-green-600 text-white`}
            >
              {isSubmitting ? "جاري التحميل..." : "تأكيد"}
            </button>
            <button
              type="button"
              onClick={() => {
                handleReset();
              }}
              className="px-5 py-2 text-red-600 border border-red-600 rounded-lg"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default UserForm;
