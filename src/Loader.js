import React from "react";

const Loader = ({ height }) => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100%", height: height, alignItems: "center" }}
    >
      <div
        className="spinner-border text-primary"
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
