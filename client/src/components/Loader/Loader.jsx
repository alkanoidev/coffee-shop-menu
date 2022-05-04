import React from 'react'
import {ReactComponent as LoaderSvg} from "./Eclipse-1s-200px.svg";
import "./style.css";

export default function Loader() {
  return (
    <div className='loader'>
        <LoaderSvg />
    </div>
  )
}
