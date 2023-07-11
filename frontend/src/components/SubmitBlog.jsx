import React from "react";
import { blogSchema } from "../schemas/blogSchema";
import { useFormik } from "formik";
import TextInput from "./TextInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { submitBlog } from "../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import FileResizer from "react-image-file-resizer";

function SubmitBlog() {
  const modules = {
    clipboard: {
      matchVisual: false, // Allow pasting text only (no formatting)
    },
  };
  const imageFileResizer = FileResizer.imageFileResizer;
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const author = useSelector((state) => state.user._id);
  const [editorValue, setEditorValue] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  let normal = "bg-red-900 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";
  let disabled = "bg-red-400 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";

  const { values, touched, handleBlur, handleChange, errors, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        photo: "",
        author,
      },
      validationSchema: blogSchema,
    });

  const handleEditorChange = (value) => {
    setEditorValue(value);
    setFieldValue("content", value);
  };

  const submitHandler = async () => {
    setLoading(true);
    const data = {
      title: values.title,
      content: values.content,
      photo: values.photo,
      author: values.author,
    };
    let response;
    try {
      response = await submitBlog(data);
    } catch (error) {
      setLoading(false);
      return error;
    }
    if (response.status === 201) {
      setLoading(false);
      setUploaded(true);
      setTimeout(() => {
        navigate("/blogs");
        setUploaded(false);
      }, 3000);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const maxWidth = 800;
    const maxHeight = 600;
    const quality = 75;

    imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      quality,
      0,
      (resizedFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(resizedFile);
        reader.onload = () => {
          const base64Data = reader.result;
          setFieldValue("photo", base64Data);
        };
      },
      "blob"
    );
  };
  if (loading) {
    return <Loader text="blog" Loading="Submitting" />;
  }
  if (uploaded) {
    return (
      <h1 className=" w-full text-2xl text-center font-bold">
        Blog Uploaded Successfully
      </h1>
    );
  } else
    return (
      <div className="flex flex-col w-full items-center mt-8">
        <h1 className="text-2xl font-bold">Create a Blog !</h1>
        <TextInput
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title || touched.title ? 1 : undefined}
          errormessage={errors.title}
        />

        <ReactQuill
          modules={modules}
          value={values.content}
          onBlur={handleBlur}
          onChange={handleEditorChange}
          className="  focus:outline-none bg-background m-2 lg:w-1/2 h-full "
          placeholder="Content"
          error={errors.content || touched.content ? 1 : undefined}
          errormessage={errors.content}
        />
        <div className="p-10 mt-8 flex flex-col justify-center items-center">
          <label className="ml-auto">
            Choose a photo &nbsp; &nbsp;
            <input
              error={errors.photo || touched.photo ? 1 : undefined}
              errormessage={errors.photo}
              type="file"
              accept="image/*"
              className=""
              onChange={(event) => handleImageChange(event)}
            />
          </label>
          <button
            className={`${
              errors.title || errors.content ? disabled : normal
            } sm:max-w-screen-sm max-w-full w-80 m-20`}
            onClick={() => submitHandler()}
            disabled={
              errors.title || errors.content || errors.photo ? true : false
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
}

export default SubmitBlog;
