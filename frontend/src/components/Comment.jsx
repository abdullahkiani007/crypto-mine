import React from "react";

function Comment({ data }) {
  // date
  const dateString = data.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString(); // Format the date portion
  const formattedTime = date.toLocaleTimeString(); // Format the time portion

  // If you want to combine the date and time in a specific format
  const dateTime = `${formattedDate} ${formattedTime} `;

  return (
    <div className=" flex justify-between border border-white rounded-xl mt-4 w-full p-4">
      <div>
        <h2 className="font-bold text-red-700">{data.author}</h2>
        <h6 className="text-xs text-gray-400">{dateTime}</h6>
        <p className="text-base mt-2 pl-2">{data.content}</p>
      </div>
    </div>
  );
}

export default Comment;
