import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={80}
        timeout={1000}
      />
    </div>
  );
};

export default Spinner;
