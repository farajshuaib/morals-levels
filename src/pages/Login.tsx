import React, { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../services/validation";

// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import banner from "../assets/Banner.jpeg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

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
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              setSubmitting(false);
              navigate("/");
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

                {!!error && <p className="error-alert">{error}</p>}

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
