import React from "react";
import "./style.css";
import { PromiseProvider } from "mongoose";

function Jumbotron({children}) {
  return (
    <div className="jumbotron text-center">
{children}    </div>
  );
}

export default Jumbotron;
