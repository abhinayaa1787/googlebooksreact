import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components

export function Form(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}


export function FormBtn(props) {
  return (
    <button {...props} className="btn btn-success">
      {props.children}
    </button>
  );
}
