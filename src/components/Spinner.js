import React from "react";
import loading from "./loading.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading" sizes="5px" />
    </div>
  );
};
export default Spinner;
