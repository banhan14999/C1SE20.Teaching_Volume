import { useSelector } from "react-redux";
import { FcBusinessman } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineUserAdd } from "react-icons/ai";
import { SiWebpack, SiGoogleclassroom, SiManageiq } from "react-icons/si";
import { RiVoiceRecognitionFill } from "react-icons/ri";
import { GiManacles } from "react-icons/gi";
import { MdSubject, MdManageAccounts } from "react-icons/md";
import Tippy from "@tippyjs/react";
import WorkVolume from "../WorkVolume";
import ClassInformation from "../Form/ClassInformation";
import AddSubject from "../Form/AddSubject";
import classNames from "classnames/bind";
import styles from "./nav.module.scss";
import InfoWebpart from "../InfoWebpart";
import ManagerWorkload from "../Table/ManagerWorkload";
import Permission from "../Table/Permission";
import AddUser from "../Form/AddUser"
import AddYear from "../Form/AddYear";
import NavLeft from "./Nav";
import { lazy, Suspense } from "react";
import Loading from "../Loading";
import Division from "../Form/Division";
import { Link } from "react-router-dom";



const ManagerSubject = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../Table/ManagerSubject")), 1000);
  });
});

const ManagerClass = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../Table/ManagerClass")), 1000);
  });
});

const ManagerUser = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../Table/ManagerUser")), 1000);
  });
});

const ManagerYear = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../Table/ManagerYear")), 1000);
  });
});



const cx = classNames.bind(styles);

function Nav() {
  const forms = useSelector((data)=>data.form);
  const updates = useSelector((data) => data.update);
  const {update}= updates
  const {form}=forms;

  const Head = JSON.parse(localStorage.getItem("Head"));
  const Admin = JSON.parse(localStorage.getItem("Admin"));
  const Dean = JSON.parse(localStorage.getItem("Dean"));
  const Lecturer = JSON.parse(localStorage.getItem("Lecturer"));

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
            <span>{Head || Admin || Dean || Lecturer}</span>
          </div>
          <div className={`${cx("sitemap")}`}>
            <span>
              {form === "Add new User" && <AiOutlineUserAdd className="mr-2" />}
              {form === "Add new Subject" && <MdSubject className="mr-2" />}
              {form === "Info webpart" && <SiWebpack className="mr-2" />}
              {form === "Add New Year" && <BsCalendarDate className="mr-2" />}
              {form === "Division" && <AiOutlineUserAdd className="mr-2" />}
              {form === "Permission" && <RiVoiceRecognitionFill className="mr-2" />}
              {form === "Add New Class" && <SiGoogleclassroom className="mr-2" />}
              {form === "Manager User" && <MdManageAccounts className="mr-2" />}
              {form === "Manager Subject" && <SiManageiq className="mr-2" />}
              {form === "Manager Class" && <GiManacles className="mr-2" />}
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
          {form === "Info webpart" && <InfoWebpart />}

          {form === "Add new Subject" && <AddSubject />}

          <Suspense fallback={<Loading />}>
            {form === "Manager Subject" && <ManagerSubject hide={update} />}
          </Suspense>

          {form === "Add New Class" && <ClassInformation />}
          {Lecturer || Head ? (
            form === "Manager Class" && <WorkVolume />
          ) : (
            <></>
          )}

          <Suspense fallback={<Loading />}>
            {Admin && form === "Manager Class" && (
              <ManagerClass hide={update} />
            )}
          </Suspense>

          {form === "Add New Year" && <AddYear />}
          <Suspense fallback={<Loading />}>
            {form === "Manager Year" && <ManagerYear hide={update} />}
          </Suspense>

          {form === "Add new User" && <AddUser />}
          <Suspense fallback={<Loading />}>
            {form === "Manager User" && <ManagerUser hide={update} />}
          </Suspense>
          {form === "Manager Workload" && <ManagerWorkload />}
          {form === "Permission" && <Permission />}
          {form === "Division" && <Division />}
        </div>
      </div>
    </div>
  );
}

export default Nav;
