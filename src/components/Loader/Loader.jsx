import React from "react";
import { ReactComponent as LoaderSvg } from "../../assets/Eclipse-1s-200px.svg";
import "./style.scss";

export default function Loader() {
  return (
    <div className="loader">
      <LoaderSvg />
    </div>
  );
}
