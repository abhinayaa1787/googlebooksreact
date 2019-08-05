import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ViewBtn(props) {
  return (
    <button className="view-btn" {...props} ><a target="_blank" href={props.href}>View</a>
      
    </button>
  );
}

export default ViewBtn;