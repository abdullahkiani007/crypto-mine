import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, "Character should be more then 5")
    .max(70, "Only 70 Characters allowed")
    .required("Title cannot be empty"),
  content: yup.string().min(5).required("Content cannot be Empty"),
  author: yup.string().required(),
  photo: yup.string().required("Please Select an Image"),
});
