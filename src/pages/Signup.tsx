import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { loginSchema } from "../services/validation";

// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import banner from "../assets/Banner.jpeg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useStoreActions } from "easy-peasy";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string>("");
  const addUser = useStoreActions<any>(
    (actions) => actions.users.addUser
  );

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          student_id: "",
          status: "waiting",
          role: "student",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async (userCredential) => {
              const user = userCredential.user;
              try {
                await addUser({
                  ...values,
                  id: user.uid,
                });
                setSubmitting(false);
                setSuccessMessage(
                  "تم التسجيل بنجاح، الرجاء الانتظار لحين قبولك من قبل استاذ المادة"
                );
              } catch (e) {
                setError("حدث خطأ ما الرجاء الاتصال بالدعم الفني");
              }
            })
            .catch((error) => {
              setSubmitting(false);
              console.log("fire error =>", error.code, error.message);
              setError(error.message);
            });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }: /* and other goodies */
        any) => (
          <div className="flex items-center md:h-3/4 w-11/12 md:w-3/4 bg-gray-50 rounded-lg shadow-md border border-gray-100 overflow-auto">
            <div className="w-full p-5 sm:p-8 md:p-10 lg:p-16">
              <Form>
                {[
                  {
                    name: "name",
                    label: "الاسم",
                    placeholder: "ادخل اسمك كاملاً",
                    type: "text",
                  },
                  {
                    name: "email",
                    label: " البريد الالكتروني",
                    placeholder: "ادخل البريد الالكتروني الخاص بك",
                    type: "email",
                  },
                  {
                    name: "password",
                    label: "كلمة المرور",
                    placeholder: "******",
                    type: "password",
                  },
                  {
                    name: "student_id",
                    label: "رقم القيد",
                    placeholder: "ادخل رقم قيدك لهذا الفصل",
                    type: "number",
                  },
                ].map((item, index) => (
                  <div key={index} className="my-5">
                    <label htmlFor={item.name} className="input-lable">
                      {item.label}
                    </label>
                    <input
                      required
                      id={item.name}
                      type={item.type}
                      name={item.name}
                      autoComplete={item.type}
                      placeholder={item.placeholder}
                      onChange={handleChange(item.name)}
                      onBlur={handleBlur(item.name)}
                      value={values[item.name]}
                      className={`input my-1`}
                    />
                    <ErrorMessage
                      component="span"
                      className="text-red-600 text-sm block"
                      name={item.name}
                    />
                  </div>
                ))}

                {error && (
                  <div className="my-5 px-3 py-2 text-lg rounded-lg text-red-600 flex items-center border border-red-600 bg-red-50">
                    <i className="bx bx-error"></i>
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="my-5 px-3 py-2 text-lg rounded-lg text-green-600 flex items-center border border-green-600 bg-green-50">
                    <i className="bx bx-check text-3xl"></i>
                    <span>{successMessage}</span>
                  </div>
                )}

                <button
                  onClick={() => handleSubmit()}
                  className="text-white btn-primary  w-full rounded-lg py-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <i className="bx bx-loader-alt bx-spin text-xl "></i>
                  ) : (
                    <span>انشاء حساب جديد</span>
                  )}
                </button>
              </Form>
              <div className="mt-8 flex items-center text-center justify-center text-gray700 text-sm">
                <p> هل تملك حساب من قبل؟</p>
                <button
                  type="button"
                  className="font-bold mx-1 underline"
                  onClick={() => navigate("/login")}
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
