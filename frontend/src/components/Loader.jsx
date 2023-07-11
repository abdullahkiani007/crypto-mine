import React from "react";
import { TailSpin } from "react-loader-spinner";
function Loader({ Loading = "loading", text }) {
  return (
    <div className="flex  flex-col max-w-full w-full items-center">
      <h2 className="font-bold text-3xl mt-20 mb-20">
        {Loading} {text}
      </h2>
      <TailSpin
        height="80"
        width="80"
        color="#7F1D1D"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
