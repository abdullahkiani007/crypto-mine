import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;
const errorMessage =
  "password must contain a lowercase , an Uppercase , a digit";

const loginSchema = yup.object().shape({
  userName: yup.string().min(5).max(30).required("username is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, errorMessage)
    .required(),
});

export default loginSchema;
