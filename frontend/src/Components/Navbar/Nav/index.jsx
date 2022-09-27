
import { AiFillCaretRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";

import { useDispatch } from "react-redux";
import {ShowForm} from "../../../Redux/Actions/index"

const cx = classNames.bind(styles);

function NavLeft() {
    const dispatch = useDispatch();

  const lecturer = localStorage.getItem("lecturer");
  const admin = localStorage.getItem("admin");

    useEffect(() => {
      let dem=0;
      const navs = document.querySelectorAll(`.${styles.nav_left}>li`);
      navs.forEach((value) => {
        value.onclick = () => {
           let back = value.querySelector(`.${styles.item}`);

            // dem the li trong ul cua value
           let val = value.querySelectorAll("ul li");
           dem = val.length * 41;

          let item = value.querySelector("ul");

          if (back.style.backgroundPosition === "-1px -297px" && item) {
            back.style.backgroundPosition = "-1px -252px";
            item.style.height ="0px"
          } else {
            let navLeftItem = document.querySelectorAll(`.${styles.nav_left_item}`);
            navLeftItem.forEach((item) => {
              item.style.height = "0px";
              item.onclick = (e) => {
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();

                const li = item.querySelectorAll("li");
                li.forEach((text) => {
                  text.onclick = (e) => {
                    dispatch(ShowForm(e.target.textContent));
                  };
                });
                
              };
            });
            navs.forEach((backgroundback)=>{
                let back = backgroundback.querySelector(`.${styles.item}`);
                back.style.backgroundPosition = "-1px -252px";
            })  

            back.style.backgroundPosition = "-1px -297px";
            value.style.color = "#fff";
            item.style.height = `${dem}px`;
            if (item) {
              if (item.style.height === "0px") {
                item.style.height = "unset";
              }
            }
          }
        };
      });
    });

  return (
    <div className="w-[223px] mr-[12px] min-h-[420px] bg-[#E5E5E5] ">
      <ul className={`${cx("nav_left")}`}>
        {admin && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Year
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Add New Year</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p> Update Year</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manager Year</p>
              </li>
            </ul>
          </li>
        )}

        {admin && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-[41px] items-center font-medium text-[14px] select-none `}
            >
              User
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Add new User</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Update User</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manager User</p>
              </li>
            </ul>
          </li>
        )}

        {admin && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Subject
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Add new Subject</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p> Manager Subject</p>
              </li>
            </ul>
          </li>
        )}

        {lecturer || admin ? (
            <li>
              <p
                className={`${cx(
                  "item"
                )} flex pl-4 items-center font-medium text-[14px] select-none `}
              >
                Class
              </p>
              <ul className={`${cx("nav_left_item")} text-[14px] `}>
                <li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Add New Class</p>
                </li>
                <li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Manager Class</p>
                </li>
              </ul>
            </li>
          ):<></>}
        {lecturer && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Personal Detail
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Subject</p>
              </li>
            </ul>
          </li>
        )}
        {lecturer && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Workload
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manager Workload</p>
              </li>
            </ul>
          </li>
        )}
        {admin && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Permission
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Permission</p>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavLeft;
