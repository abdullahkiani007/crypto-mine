import React from "react";
import { signupSchema } from "../schemas/signupSchema.js";
import TextInput from "./TextInput";
import { useState } from "react";
import { useFormik } from "formik";
import { setUser } from "../store/UserSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../api/internal.js";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  let normal = "bg-red-900 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit  ";
  let disabled = "bg-red-400 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit ";

  const handleSignup = async () => {
    const data = {
      name: values.name,
      userName: values.userName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      const response = await signUp(data);
      if (response.status === 201) {
        const user = {
          _id: response.data.user._id,
          email: response.data.user.email,
          userName: response.data.user.userName,
          auth: response.data.auth,
        };

        dispatch(setUser(user));
        navigate("/");
      } else {
        // Handle other non-201 responses here
        setError(response.response.data.message);
      }
    } catch (error) {
      // Handle network or other errors here
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });
  return (
    <div className="min-w-full mb-10  text-center flex flex-col items-center">
      <h1 className="text-3xl pb-5 pt-16">Create an account</h1>
      <TextInput
        type="text"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="name"
        error={errors.name ? 1 : undefined}
        errormessage={errors.name}
      />
      <TextInput
        type="text"
        value={values.userName}
        name="userName"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.userName ? 1 : undefined}
        errormessage={errors.userName}
      />
      <TextInput
        type="email"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="email"
        error={errors.email || touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        value={values.password}
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <TextInput
        type=" password"
        value={values.confirmPassword}
        name="confirmPassword"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
      <button
        className={`${
          errors.userName ||
          errors.password ||
          errors.name ||
          errors.confirmPassword ||
          errors.email
            ? disabled
            : normal
        }
        w-80
        max-w-full`}
        onClick={handleSignup}
        disabled={
          errors.userName ||
          errors.password ||
          errors.name ||
          errors.confirmPassword ||
          errors.email
            ? true
            : false
        }
      >
        Submit
      </button>
      <span>
        Alreay have an account?{" "}
        <Link to={"/login"}>
          <button className="text-red-700 underline">Login</button>
        </Link>
      </span>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}

export default Signup;
