import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isAuth, children }) {
  console.log(children);
  console.log(isAuth);
  if (isAuth) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default Protected;
