import Joi from "joi";
import fs from "fs";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import blogDTO from "../dto/blog.js";
import BlogDetailsDTO from "../dto/blogDetail.js";

import dotenv from "dotenv";
dotenv.config();

const blogController = {
  async createBlog(req, res, next) {
    // validate req body
    const blogSchema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      content: Joi.string().required(),
      photo: Joi.string().required(),
    });

    const { error } = blogSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // handle photo Storage

    // cliend side --> base 64 encoded string --> decode --> store

    const { title, content, author, photo } = req.body;
    console.log("Create A blog:", req.body);
    // read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    // allot a random name
    const imagePath = `${Date.now()}-${author}.PNG`;
    // save locally
    try {
      fs.writeFileSync(`storage/${imagePath}`, buffer);
    } catch (error) {
      return next(error);
    }

    // add to db
    let newBlog;

    try {
      newBlog = await Blog.create({
        title,
        content,
        photoDest: `${process.env.BACKEND_SERVER_PATH}/storage/${imagePath}`,
        author,
      });
    } catch (error) {
      return next(error);
    }

    const blogdto = new blogDTO(newBlog);
    // return response
    res.status(201).json({
      blog: blogdto,
    });
  },

  // getAllBlog
  async getAllBlog(req, res, next) {
    try {
      const blog = await Blog.find({});
      console.log(blog);
      const blogsDto = blog.map((item) => {
        const newDto = new blogDTO(item);
        return newDto;
      });

      res.status(200).json(blogsDto);
    } catch (error) {
      return next(error);
    }
  },

  async getBlogById(req, res, next) {
    // validate request

    const getByIdSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = getByIdSchema.validate({ id: req.params.id.trim() });

    if (error) {
      return next(error);
    }
    let blog;
    try {
      blog = await Blog.findOne({ _id: req.params.id.trim() }).populate(
        "author"
      );
      res.status(200).json({
        blog: new BlogDetailsDTO(blog),
      });
    } catch (error) {
      return next(error);
    }
  },

  // update blog
  async updateBlog(req, res, next) {
    // validate
    //

    const updateBlogSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      blogId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      photo: Joi.any(),
    });

    const { error } = updateBlogSchema.validate(req.body);
    const { title, content, author, blogId, photo } = req.body;

    if (error) {
      return next(error);
    }

    // save new photo

    let blog;
    try {
      blog = await Blog.findOne({ _id: blogId });
    } catch (error) {
      return next(error);
    }
    if (photo) {
      let previousPhoto = blog.photoDest;
      previousPhoto = previousPhoto.split("/").at(-1);

      // delete previous photo
      fs.unlinkSync(`storage/${previousPhoto}`);

      // read as buffer
      const buffer = Buffer.from(
        photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      // allot a random name
      const imagePath = `${Date.now()}-${author}.png`;
      // save locally
      try {
        fs.writeFileSync(`storage/${imagePath}`, buffer);
      } catch (error) {
        return next(error);
      }

      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
          photoDest: `${process.env.BACKEND_SERVER_PATH}/storage/${imagePath}`,
        }
      );
    } else {
      await Blog.updateOne(
        { _id: blogId },
        {
          title,
          content,
        }
      );
    }

    return res.status(200).json({
      message: "Successfully Updated ",
    });
  },
  async deleteBlog(req, res, next) {
    // valdiate id
    // delete blog
    // delete commments

    const deleteBlogSchema = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = deleteBlogSchema.validate({ id: req.params.id.trim() });
    if (error) {
      return next(error);
    }
    console.log(req.params);
    let { id } = req.params;
    id = id.trim();
    try {
      await Blog.deleteOne({ _id: id });
      await Comment.deleteMany({ blog: id });
    } catch (error) {
      return next(error);
    }

    return res.status(200).json({
      message: "Blog Deleted Successfully",
    });
  },
};

export default blogController;
