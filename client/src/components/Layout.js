import React from "react";
import Navbar from "./Navbar.js";

export default function Layout(props) {
  return (
    <div className="bg-white h-full w-full">
      <Navbar />
      {props.children}
    </div>
  );
}
