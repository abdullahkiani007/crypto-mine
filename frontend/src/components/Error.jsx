import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background w-full ">
      <h1 className="text-4xl font-bold text-red-500">Error</h1>
      <p className="text-white">Oops! Something went wrong.</p>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        onClick={navigateToHome}
      >
        Go Back
      </button>
    </div>
  );
}

export default Error;
