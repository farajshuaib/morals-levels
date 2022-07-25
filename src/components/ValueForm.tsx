import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { addValueValidationSchema } from "../services/validation";
import { useStoreActions, useStoreState } from "easy-peasy";
import { MoralData, MoralValue } from "../types";

interface props {
  editItem?: MoralValue;
}
const ValueForm: React.FC<props> = ({ editItem }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const addValue = useStoreActions<any>((actions) => actions.morals.addValue);
  const updateValue = useStoreActions<any>(
    (actions) => actions.morals.updateValue
  );
  const userData = useStoreState<any>((actions) => actions.userData.get);
  const [initialValues, setInitialValues] = useState<MoralData>({
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
  });

  useEffect(() => {
    if (editItem) {
      setInitialValues(editItem.data);
    }
  }, [editItem]);

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={addValueValidationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSuccessMessage("");
          setErrorMessage("");
          try {
            editItem
              ? await updateValue({
                  id: editItem?.id,
                  data: { ...values, student_id: userData.student_id },
                })
              : await addValue({ ...values, student_id: userData.student_id });
            setSubmitting(false);
            resetForm();
            setSuccessMessage(
              editItem ? "تم التعديل بنجاح" : "تم الإضافة بنجاح"
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
        }) => (
          <div>
            {/* القيمة */}
            <div className="flex items-center md:justify-between flex-wrap md:flex-nowrap gap-5 my-5">
              <div className="w-full md:w-1/4">
                <label
                  htmlFor="ExaggerateValueName"
                  className="md:text-center block input-lable"
                >
                  المبالغة
                </label>
                <Field
                  id="ExaggerateValueName"
                  type="text"
                  className="input"
                  required={true}
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

              <div className="flex-1 w-full">
                <label
                  htmlFor="valueName"
                  className="md:text-center block input-lable"
                >
                  القيمة
                </label>
                <Field
                  id="valueName"
                  type="text"
                  className="input w-full py-3"
                  placeholder="مثلا: الشجاعة"
                  required={true}
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

              <div className="w-full md:w-1/4">
                <label
                  htmlFor="DerelictionValueName"
                  className="md:text-center block input-lable"
                >
                  التقصير
                </label>
                <Field
                  id="DerelictionValueName"
                  type="text"
                  className="input"
                  required={true}
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
                label: "سلم السعادة",
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
                <label htmlFor={item.name} className="input-lable">
                  {item.label}
                </label>
                <Field
                  as="select"
                  id={item.name}
                  name={item.name}
                  className="input"
                  required={true}
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
              <div className="my-5 px-3 py-2 text-lg rounded-lg text-red-600 flex items-center border border-red-600 bg-red-50">
                <i className="bx bx-error"></i>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex my-5 items-center gap-8">
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
    </div>
  );
};

export default ValueForm;
