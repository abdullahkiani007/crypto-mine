import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogByID } from "../api/internal";
import { updateBlog } from "../api/internal";
import { useFormik } from "formik";
import { blogSchema } from "../schemas/blogSchema";
import Loader from "./Loader";
import TextInput from "./TextInput";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import FileResizer from "react-image-file-resizer";

function UpdateBlog() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    photo: "",
  });

  const [photoChange, setPhotoChange] = useState(false);

  let normal = "bg-red-900 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";
  let disabled = "bg-red-400 px-8 mt-7 mb-3 py-1 rounded-lg max-w-fit";

  const userId = useSelector((state) => state.user._id);
  const [editorValue, setEditorValue] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const blogId = params.id;
  const navigate = useNavigate();
  const imageFileResizer = FileResizer.imageFileResizer;
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogByID(blogId);
        if (response.status === 200) {
          const { title, content, userName, photo } = response.data.blog;
          setBlog({
            title: title,
            content: content,
            author: userName,
            photo: photo,
          });
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBlog();
  }, []);

  const { values, touched, handleBlur, handleChange, errors, setFieldValue } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        author: userId,
        photo: "",
      },
      validationSchema: blogSchema,
    });

  useEffect(() => {
    setFieldValue("title", blog.title);
    setFieldValue("content", blog.content);
    setFieldValue("photo", blog.photo);
  }, [blog]);

  const handleEditorChange = (value) => {
    setFieldValue("content", value);
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
          setPhotoChange(true);
          setFieldValue("photo", base64Data);
        };
      },
      "blob"
    );
  };

  const submitHandler = async () => {
    setLoading(true);
    const data = {
      title: values.title,
      content: values.content,
      photo: photoChange && values.photo,
      author: values.author,
      blogId,
    };
    console.log(data);
    let response;
    try {
      response = await updateBlog(data);
    } catch (error) {
      setLoading(false);
      return error;
    }
    if (response.status === 200) {
      setLoading(false);
      setUpdated(true);
      setTimeout(() => {
        navigate("/blogs");
        setUpdated(false);
      }, 3000);
    }
  };
  if (loading) {
    return <Loader text="blog" Loading="Submitting" />;
  }
  if (updated) {
    return (
      <h1 className=" w-full text-2xl text-center font-bold">
        Blog Updated Successfully
      </h1>
    );
  } else
    return (
      <div className="flex flex-col w-full items-center mt-8">
        <h1 className="text-2xl font-bold">Edit Blog</h1>
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
          value={values.content}
          onBlur={handleBlur}
          onChange={handleEditorChange}
          className="  focus:outline-none bg-background m-2 lg:w-1/2 h-full "
          placeholder="Content"
          error={errors.content || touched.content ? 1 : undefined}
          errormessage={errors.content}
        />
        <div className=" pt-10 mt-8 flex flex-col w-screen justify-center items-center">
          <div className="flex flex-col lg:flex-row  ">
            <label className=" pl-4">
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

            <img src={values.photo} className="p-4 w-80" />
          </div>

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

export default UpdateBlog;
