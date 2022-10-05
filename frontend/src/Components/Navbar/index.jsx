import { useSelector } from "react-redux";
import { FcBusinessman } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLogout} from "react-icons/ai";
import Tippy from "@tippyjs/react";
import {  useNavigate } from "react-router-dom";

import WorkVolume from "../WorkVolume";
import ClassInformation from "../Form/ClassInformation";
import AddSubject from "../Form/AddSubject";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";
// import ManagerClassLecturer from "../Table/ManagerClassLecturer";
import ManagerClass from "../Table/ManagerClass";
import InfoWebpart from "../InfoWebpart";
import ManagerWorkload from "../Table/ManagerWorkload";
import Permission from "../Table/Permission";
import AddUser from "../Form/AddUser"
import ManagerYear from "../Table/ManagerYear";
import AddYear from "../Form/AddYear";
import NavLeft from "./Nav";
import ManagerUser from "../Table/ManagerUser"
import ManagerSubject from "../Table/ManagerSubject";

const cx = classNames.bind(styles);

function Nav() {
  const forms = useSelector((data)=>data.form);
  const updates = useSelector((data) => data.update);
  const {update}= updates
  const {form}=forms;

  const navigate = useNavigate();
  const admin = localStorage.getItem("admin")
  const lecturer = localStorage.getItem("lecturer")

  const handlelogout = () => {
    localStorage.clear("lecturer");
    localStorage.clear("admin");
    navigate("/authentication");
    
  };
  return (
    <div className={cx("container")}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div
            className={`${cx(
              "container_heading"
            )} flex justify-start items-center`}
          >
            <FcBusinessman fontSize={40} className="mr-1 "></FcBusinessman>
            <span>Lê Anh Khánh</span>
          </div>
          <div className={`${cx("sitemap")}`}>
            <span>
              <BsCalendarDate className="mr-2"></BsCalendarDate>
            </span>
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
          tabIndex="-1"
          placement="bottom"
        >
          <div
            className={`flex items-center cursor-pointer pr-[15px] ${cx(
              "out"
            )}`}
            onClick={handlelogout}
          >
            <AiOutlineLogout
              className={`${cx("logout")} text-slate-600 text-2xl mr-1`}
            ></AiOutlineLogout>
            <p className="font-light">Thoát</p>
          </div>
        </Tippy>
      </div>
      <div className="flex border-r-[1px] border-[#D5D5D5] border-solid">
        <NavLeft></NavLeft>
        <div className="w-[726px] mb-3 ">
          {form === "Info webpart" && <InfoWebpart />}

          {form === "Add new Subject" && <AddSubject />}
          {form === "Manager Subject" && <ManagerSubject hide={update} />}

          {form === "Add New Class" && <ClassInformation />}
          {lecturer && form === "Manager Class" && <WorkVolume />}
          {admin && form === "Manager Class" && <ManagerClass hide={update} />}

          {form === "Add New Year" && <AddYear />}
          {form === "Manager Year" && <ManagerYear hide={update} />}

          {form === "Add new User" && <AddUser />}
          {form === "Manager User" && <ManagerUser hide={update} />}

          {form === "Manager Workload" && <ManagerWorkload />}
          {form === "Permission" && <Permission />}
        </div>
      </div>
    </div>
  );
}

export default Nav;
