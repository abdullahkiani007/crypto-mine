class BlogDetailsDTO {
  constructor(blog) {
    this._id = blog._id;
    this.title = blog.title;
    this.content = blog.content;
    this.photo = blog.photoDest;
    this.createdAt = blog.createdAt;
    this.userName = blog.author.userName;
    this.name = blog.author.name;
  }
}

export default BlogDetailsDTO;
