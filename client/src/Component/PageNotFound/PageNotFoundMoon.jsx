import React from "react";
import "./PageNotFoundMoon.css";
import { Link } from "react-router-dom";
export default function PageNotFoundMoon() {
  return (
    <>
      <div className="scene space">
        <div className="planet">
          <div className="crater"></div>
          <div className="crater"></div>
          <div className="crater"></div>
          <div className="crater"></div>
          <div className="crater"></div>
          <div className="rover">
            <div className="body"></div>
            <div className="wheels"></div>
            <div className="trace"></div>
          </div>
          <div className="flag">404</div>
        </div>{" "}
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="message">
          <p>
            Life was wiped form this planet a long time ago,{" "}
            <Link to="/home">
              {" "}
              Let's get you home! <i className="fa fa-rocket"></i>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
