import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { getAllBlog } from "../api/internal";
import img from "../assets/model.png";
import HtmlRenderer from "./HtmlRenderer";
import { useNavigate } from "react-router-dom";

function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  console.log(blogs[0]);

  useEffect(() => {
    //IIFI
    (async function () {
      const response = await getAllBlog();

      if (response.status === 200) {
        setBlogs(response.data);
      }
    })();

    // cleanUP
    setBlogs([]);
  }, []);

  if (blogs.length === 0) {
    return <Loader text={"blogs"} />;
  } else
    return (
      <div className="flex  flex-wrap w-full justify-center items-center px-2 ">
        {blogs.map((blog) => {
          return (
            <div
              className="flex  flex-col  items-center border border-white w-96 h-96 m-10  p-3 rounded-xl hover:shadow-custom hover:cursor-pointer"
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <h2 className="font-bold mb-2">{blog.title}</h2>
              <div className="h-full min-h-72 flex items-center justify-center overflow-hidden">
                <img
                  src={blog.photo}
                  alt={blog.title}
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 mb-4">@{blog.author}</p>
              <button className="text-blue-700 my-auto">Readmore</button>
            </div>
          );
        })}
      </div>
    );
}

export default Blog;
