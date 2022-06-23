import React from "react";
import Navbar from "../Navbar/Navbar.jsx";

export default function Layout(props) {
  return (
    <div className="Layout">
      <Navbar />
      {props.children}
    </div>
  );
}
