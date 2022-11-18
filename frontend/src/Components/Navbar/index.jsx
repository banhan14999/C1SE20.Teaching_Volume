import { useSelector } from "react-redux";
import { FcBusinessman } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";
import { SiWebpack, SiGoogleclassroom, SiManageiq } from "react-icons/si";
import { MdSubject, MdManageAccounts, MdAssignmentInd } from "react-icons/md";
import { RiVoiceRecognitionFill } from "react-icons/ri";
import { GiManacles } from "react-icons/gi";
import { Outlet, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";
import NavLeft from "./Nav";
import axios from "axios";

const cx = classNames.bind(styles);

function Nav() {
  const navigate = useNavigate();

  const IconForm = {
    "Add new User": <AiOutlineUserAdd />,
    "Add new Subject": <MdSubject />,
    "Info webpart": <SiWebpack />,
    "Add New Year": <BsCalendarDate />,
    Division: <MdAssignmentInd />,
    Permission: <RiVoiceRecognitionFill />,
    "Add New Class": <SiGoogleclassroom />,
    "Manager User": <MdManageAccounts />,
    "Manager Subject": <SiManageiq />,
    "Manager Class": <GiManacles />,
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
            <span className="mr-2">{IconForm[form]}</span>
            <span className="leading-[54px]">{update || form}</span>
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
          {/* <Link to="/authentication" className="flex items-center"> */}
            <div
              className={`flex items-center cursor-pointer pr-[15px]  ${cx(
                "out"
              )}`}
              onClick={HandleLogout}
            >
              <AiOutlineLogout
                className={`${cx("logout")} text-slate-600 text-2xl mr-1`}
              ></AiOutlineLogout>
              <p className="font-light">Thoát</p>
            </div>
          {/* </Link> */}
        </Tippy>
      </div>
      <div className="flex border-r-[1px] border-[#D5D5D5] border-solid">
        <NavLeft></NavLeft>
        <div className="w-[726px] mb-3 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Nav;
