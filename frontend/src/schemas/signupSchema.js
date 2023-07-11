import { useParams } from "react-router-dom";
import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;
const errorMessage =
  "password must contain a lowercase , an Uppercase , a digit";
export const signupSchema = yup.object().shape({
  name: yup.string().max(30).required("name is required"),
  userName: yup.string().min(5).max(30).required("username is required"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords donot match")
    .required("password is required"),
});
