import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { addValueValidationSchema } from "../services/validation";
import MoralValues from "../models/moralValues";

const AddValueForm: React.FC = () => {
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
      onSubmit={(values, { setSubmitting }) => {
        try {
          const moralValues = new MoralValues(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, handleBlur, handleReset, handleSubmit }) => (
        <div>
          {/* القيمة */}
          <div className="flex items-center justify-between gap-5 my-5">
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
                require
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
            <div className="flex-1">
              <label htmlFor="valueName" className="text-center block">
                القيمة
              </label>
              <Field
                id="valueName"
                type="text"
                className="input py-3"
                placeholder="مثلا: الشجاعة"
                require
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
                htmlFor="ExaggerateValueName"
                className="text-center block"
              >
                المبالغة
              </label>
              <Field
                id="ExaggerateValueName"
                type="text"
                className="input"
                require
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
                require
                placeholder={item.placeholder}
                onBlur={handleBlur(item.name)}
                onChange={handleChange(item.name)}
              >
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
