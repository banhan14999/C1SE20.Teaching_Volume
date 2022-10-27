import { useSelector } from "react-redux";
import { FcBusinessman } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";
import { SiWebpack, SiGoogleclassroom, SiManageiq } from "react-icons/si";
import { MdSubject, MdManageAccounts, MdAssignmentInd } from "react-icons/md";
import { RiVoiceRecognitionFill } from "react-icons/ri";
import { GiManacles } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";

import styles from "./nav.module.scss";
import NavLeft from "./Nav";



const cx = classNames.bind(styles);

function Nav() {
   const Head = JSON.parse(localStorage.getItem("Head"));
   const Admin = JSON.parse(localStorage.getItem("Admin"));
   const Dean = JSON.parse(localStorage.getItem("Dean"));
   const Lecturer = JSON.parse(localStorage.getItem("Lecturer"));
  const forms = useSelector((data) => data.form);
  const updates = useSelector((data) => data.update);
  const { update } = updates;
  const { form } = forms;

  return (
    <div className={cx("container")}>
      <div className="flex justify-between select-none">
        <div className="flex items-center">
          <div
            className={`${cx(
              "container_heading"
            )} flex justify-start items-center`}
          >
            <FcBusinessman fontSize={40} className="mr-1 "></FcBusinessman>
            <span>{Head || Admin || Dean || Lecturer}</span>
          </div>
          <div className={`${cx("sitemap")}`}>
            <span>
              {form === "Add new User" && <AiOutlineUserAdd className="mr-2" />}
              {form === "Add new Subject" && <MdSubject className="mr-2" />}
              {form === "Info webpart" && <SiWebpack className="mr-2" />}
              {form === "Add New Year" && <BsCalendarDate className="mr-2" />}
              {form === "Division" && <MdAssignmentInd className="mr-2" />}
              {form === "Permission" && (
                <RiVoiceRecognitionFill className="mr-2" />
              )}
              {form === "Add New Class" && (
                <SiGoogleclassroom className="mr-2" />
              )}
              {form === "Manager User" && <MdManageAccounts className="mr-2" />}
              {form === "Manager Subject" && <SiManageiq className="mr-2" />}
              {form === "Manager Class" && <GiManacles className="mr-2" />}
            </span>
            <span className="leading-[54px]">{ update || form}</span>
          </div>
        </div>
        <Tippy
          content={
            <span className="bg-gray-300 px-[15px] py-[2px] block mt-[-18px] border-1 border-gray-600">
              Thoát
            </span>
          }
          delay={300}
          placement="bottom"
        >
          <Link to="/authentication" className="flex items-center">
            <div
              className={`flex items-center cursor-pointer pr-[15px] ${cx(
                "out"
              )}`}
            >
              <AiOutlineLogout
                className={`${cx("logout")} text-slate-600 text-2xl mr-1`}
              ></AiOutlineLogout>
              <p className="font-light">Thoát</p>
            </div>
          </Link>
        </Tippy>
      </div>
      <div className="flex border-r-[1px] border-[#D5D5D5] border-solid">
        <NavLeft></NavLeft>
        <div className="w-[726px] mb-3 ">
          {/* {param.includes("manager") ? (
            <>
              <Suspense fallback={<Loading />}>
                {form === "Manager Subject" && <ManagerSubject hide={update} />}
              </Suspense>

              <Suspense fallback={<Loading />}>
                {Admin && form === "Manager Class" && (
                  <ManagerClass hide={update} />
                )}
              </Suspense>
              <Suspense fallback={<Loading />}>
                {form === "Manager Class" && <WorkVolume />}
              </Suspense>

              <Suspense fallback={<Loading />}>
                {form === "Manager Year" && <ManagerYear hide={update} />}
              </Suspense>

              <Suspense fallback={<Loading />}>
                {form === "Manager User" && <ManagerUser hide={update} />}
              </Suspense>
            </>
          ) : ( */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Nav;
