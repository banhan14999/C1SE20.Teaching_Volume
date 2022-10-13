
import { AiFillCaretRight } from "react-icons/ai";
import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";

import { useDispatch } from "react-redux";
import {ShowForm} from "../../../Redux/Actions/index"
import { SetUpdate } from "../../../Redux/Actions/index";

const cx = classNames.bind(styles);

function NavLeft() {
  const dispatch = useDispatch();

   const Head = localStorage.getItem("Head");
   const Admin = localStorage.getItem("Admin");
   const Dean = localStorage.getItem("Dean");
   const Lecturer = localStorage.getItem("Lecturer");

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
          let navLeftItem = [...document.getElementsByClassName(`${styles.nav_left_item}`)];
            navLeftItem.forEach((item) => {
              item.style.height = "0px";
              item.onclick = (e) => {
                if (e.stopPropagation) e.stopPropagation();
                const li = item.querySelectorAll("li");
                li.forEach((text) => {
                  text.onclick = (e) => {
                    dispatch(ShowForm(e.target.textContent));
                    dispatch(SetUpdate());
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
        {/* {Lecturer && (
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
                <p>Manager Year</p>
              </li>
            </ul>
          </li>
        )} */}

        {Admin && (
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
                <p>Manager User</p>
              </li>
            </ul>
          </li>
        )}

        {Admin && (
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
                <p>Manager Subject</p>
              </li>
            </ul>
          </li>
        )}

        {Lecturer || Admin || Head || Dean ? (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Class
            </p>
            {Admin && (
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
            )}
            {Head && (
              <ul className={`${cx("nav_left_item")} text-[14px] `}>
                <li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Division</p>
                </li>
                <li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Manager Class</p>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <></>
        )}
        {Lecturer && (
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
        {Dean || Head || Lecturer ? (
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
        ) : (
          <></>
        )}
        {/* {Dean && (
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
        )} */}
      </ul>
    </div>
  );
}

export default NavLeft;
