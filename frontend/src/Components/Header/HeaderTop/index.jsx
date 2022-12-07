import classNames from "classnames/bind";
import React, { Component }  from 'react';
import styles from "./headertop.module.scss";

const cx= classNames.bind(styles)

function HeaderTop() {
  return (
    <div className={cx("header")}>
      <a
        href="http://localhost:3000/"
        className={cx("header-logo")}
      >
        <img src={require("../../../Assets/img/logo.gif")} alt="mdtu" />
      </a>
      <div className={cx("topmenu")}>
        <ul className={cx("nav")}>
          <li>
            <a href="/">
              <div className="flex items-center">
                <img
                  src={require("../../../Assets/img/iconheader/home.png")}
                  alt="Trang chủ"
                  className="mr-2 w-[15px] h-[15px] object-contain"
                />
                <span>Trang chủ</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <div className="flex items-center">
                <img
                  src={require("../../../Assets/img/iconheader/email.png")}
                  alt="DTU Mail"
                  className="mr-2 w-[15px] h-[15px] object-contain"
                />
                <span>DTU Mail</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <div className="flex items-center">
                <img
                  src={require("../../../Assets/img/iconheader/elearning.png")}
                  alt="Learning"
                  className="mr-2 w-[15px] h-[15px] object-contain"
                />
                <span>Learning</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <div className="flex items-center">
                <img
                  src={require("../../../Assets/img/iconheader/diendan.png")}
                  alt="Forum"
                  className="mr-2 w-[15px] h-[15px] object-contain"
                />
                <span>Forum</span>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <div className="flex items-center">
                <img
                  src={require("../../../Assets/img/iconheader/thuvien.png")}
                  alt="e-Lib"
                  className="mr-2 w-[15px] h-[15px] object-contain"
                />
                <span>e-Lib</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderTop;
