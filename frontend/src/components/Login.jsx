import React, { useState } from "react";
import TextInput from "./TextInput";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../api/internal";
import { setUser } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  const handleLogin = async () => {
    setLoading(true);
    const data = {
      userName: values.userName,
      password: values.password,
    };
    const response = await login(data);
    if (response.status === 200) {
      // set user state
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        userName: response.data.user.userName,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setLoading(false);
      setError(response.response.data.message);
    } else {
      // display error
      // console.log(response);
      setLoading(false);
      setError(response.data.message);
    }
  };

  let normal = "bg-red-900 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";
  let disabled = "bg-red-400 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";
  if (loading) {
    return <Loader Loading={"validating"} text={"User credentials "} />;
  } else
    return (
      <div className="min-w-full my-10  text-center flex flex-col items-center">
        <h1 className="text-3xl pb-5 pt-24">Login</h1>
        <TextInput
          type="text"
          value={values.userName}
          name="userName"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="username"
          error={errors.userName && touched.userName ? 1 : undefined}
          errormessage={errors.userName}
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
        <button
          className={`${
            errors.userName || errors.password ? disabled : normal
          }sm:max-w-screen-sm max-w-full w-80`}
          onClick={handleLogin}
          disabled={errors.userName || errors.password ? true : false}
        >
          Submit
        </button>
        <span>
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <button className="text-red-700 underline">Register</button>
          </Link>
        </span>
        {error && <p className="text-red-700 mt-5">{error}</p>}
      </div>
    );
}

export default Login;
