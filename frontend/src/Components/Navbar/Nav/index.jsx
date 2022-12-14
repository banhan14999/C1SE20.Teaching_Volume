import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiFillCaretRight } from "react-icons/ai";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import styles from "./nav.module.scss";
import { ShowForm } from "../../../Redux/Actions/index";
import { SetUpdate } from "../../../Redux/Actions/index";

const cx = classNames.bind(styles);

function NavLeft() {
  const dispatch = useDispatch();
  const Head = localStorage.getItem("Head");
  const Admin = localStorage.getItem("Admin");
  const Dean = localStorage.getItem("Dean");
  const Lecturer = localStorage.getItem("Lecturer");
  const navigate = useNavigate();

  useEffect(() => {
    const navs = document.querySelectorAll(`.${styles.nav_left}>li`);
    navs.forEach((value) => {
      value.onclick = (e) => {
        let back = value.querySelector(`.${styles.item}`);
        let val = value.querySelectorAll("ul li");
        let dem = val.length * 41;
        let item = value.querySelector("ul");
        if (back.style.backgroundPosition === "-1px -297px" && item) {
          back.style.backgroundPosition = "-1px -252px";
          item.style.height = "0px";
          back.style.color = "#000";
        } else {
          let navLeftItem = [
            ...document.getElementsByClassName(`${styles.nav_left_item}`),
          ];
          navLeftItem.forEach((item) => {
            item.style.height = "0px";
            item.onclick = (e) => {
              document.title = e.target.textContent;
              dispatch(ShowForm(e.target.textContent));
              dispatch(SetUpdate());
              if (e.stopPropagation) e.stopPropagation();
              const text = e.target.textContent
                .toLowerCase()
                .split("")
                .filter((value) => value !== " ")
                .join("");
              navigate(text);
            };
          });
          navs.forEach((backgroundback) => {
            let back = backgroundback.querySelector(`.${styles.item}`);
            back.style.backgroundPosition = "-1px -252px";
            back.style.color = "#000";

          });
          back.style.backgroundPosition = "-1px -297px";
          back.style.color = "#fff"
          value.style.color = "#fff";
          item.style.height = `${dem}px`;
          if (item) {
            if (item.style.height === "0px") {
              item.style.height = "unset";
             back.style.color = "#000";
            }
          }
        }
      };
    });
  }, [navigate,dispatch]);

  return (
    // width : 223px
    <div className="w-[23.21%] mr-[8px] min-h-[420px] bg-[#E5E5E5] ">
      <ul className={`${cx("nav_left")}`}>
        {Admin && (
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
                <p>Manage Year</p>
              </li>
            </ul>
          </li>
        )}
        {Dean && (
          <li>
            <p
              className={`${cx(
                "item"
              )} flex pl-4 items-center font-medium text-[14px] select-none `}
            >
              Dashboard
            </p>
            <ul className={`${cx("nav_left_item")} text-[14px] `}>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>View Table</p>
              </li>
            </ul>
          </li>
        )}
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
                <p>Add New User</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manage Users</p>
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
                <p>Add New Subject</p>
              </li>
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manage Subject</p>
              </li>
            </ul>
          </li>
        )}

        {Admin || Head || Dean || Lecturer ? (
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
                  <p>Manage Class</p>
                </li>
              </ul>
            )}
            {Head|| Dean || Lecturer ?(
              <ul className={`${cx("nav_left_item")} text-[14px] `}>
                {Head && <li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Divide</p>
                </li>}
               {(Head|| Dean || Lecturer) ?<li className="flex">
                  <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                  <p>Manage Class</p>
                </li>:<></>}
              </ul>
            ):<></>}
          </li>
        ) : (
          <></>
        )}
        {/* {Lecturer && (
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
        )} */}
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
             { Head &&<li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Approval</p>
              </li>}
              <li className="flex">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight>
                <p>Manage Workload</p>
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
