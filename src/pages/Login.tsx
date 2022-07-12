import React, { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../services/validation";

// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import banner from "../assets/Banner.jpeg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useStoreActions } from "easy-peasy";
import { getStudentByEmail } from "../services/studentsCRUD";
import { toast } from "react-toastify";
import { Student, userStatus } from "../types";


const notifyDataUpdate = (status: userStatus) => {
  switch (status) {
    case "approved": {
      toast.success("تم تسجيل الدخول بنجاح");
      break;
    }
    case "rejected": {
      toast.error("لا يمكنك تسجيل الدخول، تم رفضك من قبل استاذ المادة");
      break;
    }
    case "suspended": {
      toast.error("لا يمكنك تسجيل الدخول، تم ايقاف حسابك من قبل استاذ المادة");
      break;
    }
    case "waiting": {
      toast.error(
        "لا يمكنك تسجيل الدخول، لم يتم قبولك بعد من قبل استاذ المادة"
      );
      break;
    }
    default: {
    }
  }
};



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const setUserData = useStoreActions<any>(
    (actions) => actions.userData.setUserData
  );

  return (
    <div
      data-testid="loginComponent"
      className="flex items-center justify-center h-screen w-full"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          const auth = getAuth();
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log("user", user);
              if (!user.email) {
                setError("المستخدم غير موجود");
                return;
              }
              try {
                const userData = await getStudentByEmail(user.email) as Student;
                if (userData) {
                  setUserData(userData);
                  notifyDataUpdate(userData.data.status);
                } else {
                  setError("المستخدم غير موجود");
                }
                setSubmitting(false);
              } catch (err) {
                setError("حدث خطأ ما الرجاء الاتصال بالدعم الفني");
              }
            })
            .catch((error) => {
              setError(error.message);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex items-center md:h-3/4 w-11/12 md:w-3/4 bg-gray-50 rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 lg:p-16">
              <Form>
                <div className="my-5">
                  <label htmlFor="email" className="input-lable">
                    البريد الالكتروني
                  </label>
                  <input
                    required
                    id="email"
                    type="text"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    className={`input my-1 ${
                      errors.email && touched.email && "border-red-600"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="error-text">{errors.email}</p>
                  )}
                </div>
                <div className="my-5">
                  <label htmlFor="password" className="input-lable">
                    كلمة المرور
                  </label>
                  <input
                    required
                    name="password"
                    type="password"
                    id="password"
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    autoComplete="current-password"
                    className={`input my-1 ${
                      errors.password && touched.password && "border-red-600"
                    }`}
                  />
                  {errors.password && touched.password && (
                    <p className="error-text">{errors.password}</p>
                  )}
                </div>

                {error && (
                  <div className="my-5 px-3 py-2 text-lg rounded-lg text-red-600 flex items-center border border-red-600 bg-red-50">
                    <i className="bx bx-error"></i>
                    <span>{error}</span>
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
                    <span>دخول</span>
                  )}
                </button>
              </Form>
              <div className="mt-8 flex items-center text-center justify-center text-gray700 text-sm">
                <p> لا تملك حساب؟</p>
                <button
                  type="button"
                  className="font-bold mx-1 underline"
                  onClick={() => navigate("/sign-up")}
                >
                  انشاء حساب جديد
                </button>
              </div>
            </div>
            <img
              alt=""
              src={banner}
              loading="lazy"
              decoding="async"
              className="hidden md:block w-1/2 h-full object-cover"
            />
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
