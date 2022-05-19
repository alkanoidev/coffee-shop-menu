import React from "react";
import Navbar from "./Navbar/Navbar.jsx";

export default function Layout(props) {
  return (
    <div className="bg-white h-full w-full">
      <Navbar />
      {props.children}
    </div>
  );
}
