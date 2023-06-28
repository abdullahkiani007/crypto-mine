class Blog {
  constructor(blog) {
    this._id = blog._id;
    this.title = blog.title;
    this.author = blog.author;
    this.content = blog.content;
    this.photo = blog.photoPath;
  }
}

export default Blog;
