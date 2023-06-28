class CommentDto {
  constructor(comment) {
    this._id = comment._id;
    this.createdAt = comment.createdAt;
    this.author = comment.author.userName;
    this.content = comment.content;
  }
}

export default CommentDto;
