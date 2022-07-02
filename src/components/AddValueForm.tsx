import React, { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { addValueValidationSchema } from "../services/validation";
import MoralValues from "../models/moralValues";

const AddValueForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        valueName: "",
        ExaggerateValueName: "",
        DerelictionValueName: "",
        StandardValue: "",
        SourcedValue: "",
        LevelValue: "",
        LadderValue: "",
        SchoolValue: "",
        TypedValue: "",
        ActivationValue: "",
      }}
      validationSchema={addValueValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        try {
          const moralValues = new MoralValues(values);
          console.log(moralValues);
          setSubmitting(false);
          resetForm()
          setSuccessMessage("تم الإضافة بنجاح");
        } catch (e) {
          setSubmitting(false);
          setErrorMessage("حدث خطأ ما الرجاء الاتصال بالدعم الفني");
          console.log(e);
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleReset, handleSubmit }) => (
        <div>
          {/* القيمة */}
          <div className="flex items-center justify-between gap-5 my-5">
            <div>
              <label
                htmlFor="ExaggerateValueName"
                className="text-center block"
              >
                المبالغة
              </label>
              <Field
                id="ExaggerateValueName"
                type="text"
                className="input"
                require={true}
                placeholder="مثلا: تهور"
                value={values.ExaggerateValueName}
                onBlur={handleBlur("ExaggerateValueName")}
                onChange={handleChange("ExaggerateValueName")}
              />
              <ErrorMessage
                component="span"
                className="text-red-600 text-sm "
                name="ExaggerateValueName"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="valueName" className="text-center block">
                القيمة
              </label>
              <Field
                id="valueName"
                type="text"
                className="input py-3"
                placeholder="مثلا: الشجاعة"
                require={true}
                value={values.valueName}
                onBlur={handleBlur("valueName")}
                onChange={handleChange("valueName")}
              />
              <ErrorMessage
                component="span"
                className="text-red-600 text-sm "
                name="valueName"
              />
            </div>

            <div>
              <label
                htmlFor="DerelictionValueName"
                className="text-center block"
              >
                التقصير
              </label>
              <Field
                id="DerelictionValueName"
                type="text"
                className="input"
                require={true}
                placeholder="مثلا: جٌبن"
                value={values.DerelictionValueName}
                onBlur={handleBlur("DerelictionValueName")}
                onChange={handleChange("DerelictionValueName")}
              />
              <ErrorMessage
                component="span"
                className="text-red-600 text-sm "
                name="DerelictionValueName"
              />
            </div>
          </div>

          {[
            {
              label: "القيم بمعايير الرقي",
              name: "StandardValue",
              placeholder: "",
              values: [
                "الإنسان",
                "الدين",
                "المادة",
                "الحياة",
                "الآخر",
                "العلم",
                "العدل",
                "الزمن",
              ],
            },
            {
              label: "مصدر القيم",
              name: "SourcedValue",
              placeholder: "",
              values: [
                "الدين",
                "التقاليد و الاعراف",
                "القانون",
                "المشاعر (الفطرة)",
              ],
            },
            {
              label: "مستوى القيم",
              name: "LevelValue",
              placeholder: "",
              values: ["الحرب", "التواصل", "التعايش", "الأساس"],
            },
            {
              label: "سلم القيم",
              name: "LadderValue",
              placeholder: "",
              values: ["العقل", "القلب", "الجوارح"],
            },
            {
              label: "مدرسة القيم",
              name: "SchoolValue",
              placeholder: "",
              values: ["الحدث", "الغاية"],
            },
            {
              label: "نوع القيم",
              name: "TypedValue",
              placeholder: "",
              values: ["مهنية", "شخصية"],
            },
            {
              label: "واقع القيمة",
              name: "ActivationValue",
              placeholder: "",
              values: ["مفعلة", "مجردة"],
            },
          ].map((item, index) => (
            <div key={index} className="my-5 w-full">
              <label htmlFor={item.name} className="">
                {item.label}
              </label>
              <Field
                as="select"
                id={item.name}
                name={item.name}
                className="input"
                require={true}
                placeholder={item.placeholder}
                onBlur={handleBlur(item.name)}
                onChange={handleChange(item.name)}
              >
                <option></option>
                {item.values.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>

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
            <div className="my-5 px-3 py-2 text-lg rounded-lg text-red-600 flex items-cente border border-red-600 bg-red-50">
              <i className="bx bx-error"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex my-5 items-center gap-8">
            <button
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
              className="px-8 py-2 border-2 border-green-700 rounded-lg bg-green-600 text-white"
            >
              تأكيد
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

export default AddValueForm;
