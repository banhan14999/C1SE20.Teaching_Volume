import { useSelector } from "react-redux";
import { FcBusinessman, FcApproval } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineUserAdd ,AiOutlineFolderView} from "react-icons/ai";
import { SiWebpack, SiGoogleclassroom, SiManageiq } from "react-icons/si";
import { MdSubject, MdManageAccounts, MdAssignmentInd } from "react-icons/md";
import { RiVoiceRecognitionFill } from "react-icons/ri";
import { GiManacles, GiNetworkBars } from "react-icons/gi";
import { Outlet, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";
import NavLeft from "./Nav";
import axios from "axios";
import React from "react";
const cx = classNames.bind(styles);

function Nav() {
  const navigate = useNavigate();

  const IconForm = {
    "Add New User": <AiOutlineUserAdd />,
    "Add New Subject": <MdSubject />,
    "Info webpart": <SiWebpack />,
    "Add New Year": <BsCalendarDate />,
    Divide: <MdAssignmentInd />,
    Permission: <RiVoiceRecognitionFill />,
    "Add New Class": <SiGoogleclassroom />,
    "Manage Users": <MdManageAccounts />,
    "Manage Subject": <SiManageiq />,
    "Manage Class": <GiManacles />,
    "Manage Year": <GiManacles />,
    "View Table": <AiOutlineFolderView />,
    "Manage Workload": <GiNetworkBars />,
    Approval: <FcApproval />,
  };
  const Head = JSON.parse(localStorage.getItem("Head"));
  const Admin = JSON.parse(localStorage.getItem("Admin"));
  const Dean = JSON.parse(localStorage.getItem("Dean"));
  const Lecturer = JSON.parse(localStorage.getItem("Lecturer"));
  const forms = useSelector((data) => data.form);
  const updates = useSelector((data) => data.update);
  const { update } = updates;
  const { form } = forms;
  
function HandleLogout(){
  const token = JSON.parse(localStorage.getItem("Token"))
   axios.post(
     "http://127.0.0.1:8000/api/logout",
     {},
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   ).then(res=>{
     if(res.data.status === 200){
       localStorage.clear("Token")
       navigate("/authentication")
     }
   })
}
  return (
    <div className={cx("container")}>
      <div
        className={`flex justify-between select-none relative ${cx(
          "nav_sitemap"
        )}`}
      >
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
            <span className="mr-2">{IconForm[form]}</span>
            <span>{update || form}</span>
          </div>
        </div>
        <Tippy
          content={
            <span className="bg-gray-300 px-[15px] py-[2px] block mt-[-18px] border-1 border-gray-600">
              Exit
            </span>
          }
          delay={100}
          placement="bottom"
        >
          <div
            className={`flex items-center cursor-pointer pr-[15px]  ${cx(
              "out"
            )}`}
            onClick={HandleLogout}
          >
            <AiOutlineLogout
              className={`${cx("logout")} text-slate-600 text-2xl mr-1`}
            ></AiOutlineLogout>
            <p className="font-light">Exit</p>
          </div>
        </Tippy>
      </div>
      <div className="flex border-r-[1px] border-[#D5D5D5] border-solid">
        <NavLeft></NavLeft>
        <div className={`w-[726px] mb-3 ${cx("outlet")}`}>
          {/* <React.Suspense fallback={<Loading></Loading>}>
            <Autlet></Autlet>
          </React.Suspense> */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Nav;
