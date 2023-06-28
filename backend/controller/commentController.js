import Joi from "joi";
import Comment from "../models/comment.js";
import CommentDto from "../dto/comment.js";

const commentController = {
  async create(req, res, next) {
    const commentSchema = Joi.object({
      content: Joi.string().required(),
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      blog: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    const { error } = commentSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { content, author, blog } = req.body;
    let comment;
    try {
      comment = await Comment.create({
        content,
        author,
        blog,
      });
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({
      comment: new CommentDto(comment),
      //   comments: await Comment.find({})
      //     .populate("author")
      //     .populate("blog")
      //     .exec(),
    });
  },

  async getById(req, res, next) {
    // validate
    const idValidation = Joi.object({
      id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    });

    console.log(req.params);
    const { error } = idValidation.validate({ id: req.params.id.trim() });

    if (error) {
      console.log("errorr ");
      return next(error);
    }

    let comment;
    try {
      comment = await Comment.find({ blog: req.params.id }).populate("author");
    } catch (error) {
      return next(error);
    }

    const comments = comment.map((item) => {
      return new CommentDto(item);
    });
    return res.status(200).json({
      data: comments,
    });
  },
};

export default commentController;
