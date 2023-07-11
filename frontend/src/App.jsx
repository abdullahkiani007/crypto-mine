import { useState } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Protected from "./components/protected/Protected";
import Error from "./components/Error";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Signup from "./components/Signup";
import Crypto from "./components/Crypto";
import SubmitBlog from "./components/SubmitBlog";
import BlogDetails from "./components/BlogDetails";
import UpdateBlog from "./components/UpdateBlog";

function App() {
  const isAuth = useSelector((state) => state.user.auth);

  return (
    <div className="flex flex-col min-h-screen bg-background text-color">
      <ScrollToTop />
      <BrowserRouter>
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="flex flex-grow  ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="crypto" element={<Crypto />} />

              {/* Protected Routes */}
              <Route
                path="/blogs"
                element={
                  <Protected isAuth={isAuth}>
                    <Blog />
                  </Protected>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <Protected isAuth={isAuth}>
                    <BlogDetails />
                  </Protected>
                }
              />
              <Route
                path="/blog/update/:id"
                element={
                  <Protected isAuth={isAuth}>
                    <UpdateBlog />
                  </Protected>
                }
              />
              <Route
                path="submit"
                element={
                  <Protected isAuth={isAuth}>{<SubmitBlog />}</Protected>
                }
              />

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
