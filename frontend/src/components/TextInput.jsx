import React from "react";

function TextInput(props) {
  return (
    <div className="p-4">
      <input
        {...props}
        placeholder={props.placeholder}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background md:w-80"
      />
      {props.error && <p className="text-red-500 mt-1">{props.errormessage}</p>}
    </div>
  );
}

export default TextInput;
