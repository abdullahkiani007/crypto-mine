import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { base64URL } from "../assets/img.js";
import {
  getBlogByID,
  deleteBlog,
  getCommentsById,
  postComment,
  deleteComment,
} from "../api/internal";
import Loader from "./Loader";
import HtmlRenderer from "./HtmlRenderer";
import TextInput from "./TextInput";

function BlogDetails() {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;
  const userName = useSelector((state) => state.user.userName);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogByID(blogId);
        if (response.status === 200) {
          setBlog(response.data.blog);
          setOwnsBlog(response.data.blog.userName === userName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await getCommentsById(blogId);
        if (response.status === 200) {
          setComments(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
    fetchComments();
  }, [blogId, userId]);

  const handleDeleteComment = async (id) => {
    let response;
    console.log(id);
    try {
      response = await deleteComment(id);

      if (response.status === 200) {
        try {
          const response = await getCommentsById(blogId);
          if (response.status === 200) {
            setComments(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      return error;
    }
  };
  const handleDelete = async () => {
    try {
      await deleteBlog(blogId);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComment = async () => {
    try {
      const data = {
        content: newComment,
        author: userId,
        blog: blogId,
      };
      await postComment(data);
      setNewComment("");
      const response = await getCommentsById(blogId);
      if (response.status === 200) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dateString = blog.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(); // Format the date portion
  const formattedTime = date.toLocaleTimeString(); // Format the time portion

  // If you want to combine the date and time in a specific format
  const dateTime = `${formattedDate}  `;

  if (Object.keys(blog).length === 0) {
    return <Loader text="Blog" />;
  } else {
    return (
      <div className="w-full flex flex-col md:items-center p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl mb-1 mr-8 underline">{blog.title}</h1>

          {ownsBlog && (
            <div className="flex mt-2 hover:cursor-pointer">
              <button
                className=" bg-red-800 rounded-lg px-2"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className=" bg-green-800 rounded-lg px-5"
                onClick={() => navigate(`/blog/update/${blogId}`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <img src={blog.photo} className="mb-2 h-56 lg:h-96" />
        <p className="text-sm text-gray-400 mb-4">
          @{blog.userName} on {dateTime}
        </p>
        <div className="w-full max-h-fit">
          <HtmlRenderer htmlString={blog.content} />
          <hr className="m-8 opacity-50 md:w-1/2 mx-auto" />
        </div>
        <div className="flex flex-col w-full items-start p-8">
          <h2 className="font-bold text-lg">Comments:</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <React.Fragment key={comment._id}>
                <Comment data={comment} />
                {comment.author === userName && (
                  <button
                    className="bg-red-800 rounded-lg ml-2 mt-1 px-2 h-6"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No comments</p>
          )}
          <div className="flex flex-col w-full mt-4 items-center overflow-hidden">
            <label className="font-bold text-center w-full text-lg">
              Post a comment:
              <br />
              <input
                type="text"
                placeholder="Comment.."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-background border border-white w-full md:w-1/2 h-20 font-normal text-start mb-2 pl-1 text-sm"
              />
            </label>
            <button
              className="bg-red-900 px-8 mt-1 mb-3 md:mt-3 md:w-80 py-1 rounded-lg w-full"
              onClick={handlePostComment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogDetails;
