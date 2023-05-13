import classNames from "classnames/bind";
import styles from "./home.module.scss";
import HeaderTop from "../../Components/Header/HeaderTop";
import SubHeader from "../../Components/Header/SubHeader";
import Footer from "../../Components/Footer";
import NavLeft from "../../Components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const cx = classNames.bind(styles);

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const Head = localStorage.getItem("Head");
  const admin = localStorage.getItem("Admin");
  const lecturer = localStorage.getItem("Lecturer");
  const dean = localStorage.getItem("Dean");

  const url = window.location.pathname;
  localStorage.removeItem("token");
  useEffect(() => {
    const headurl = [
      "/home/approval",
      "/home/manageworkload",
      "/home/divide",
      "/home/manageclass",
      "/home/infowebpart",
      "/home/trainingvolumeplan",
    ];
    const adminurl = [
      "/home/addnewyear",
      "/home/manageyear",
      "/home/addnewuser",
      "/home/manageusers",
      "/home/addnewsubject",
      "/home/managesubject",
      "/home/addnewclass",
      "/home/manageclass",
      "/home/infowebpart",
    ];
    const lecturerurl = [
      "/home/manageclass",
      "/home/manageworkload",
      "/home/infowebpart",
      "/home/trainingvolumeplan",
    ];
    const deanurl = [
      "/home/viewtable",
      "/home/manageclass",
      "/home/manageworkload",
      "/home/infowebpart",
      "/home/trainingvolumeplan",
    ];

    const dem = url.split("/").length - 1;
    const urlhome = (dem === 3 && url.slice(0, url.lastIndexOf("/"))) || false;
    if (!token) {
      return <Navigate to="/authentication" replace />;
    } else {
      if (Head) {
        !headurl.includes(urlhome || url) && navigate("/home/infowebpart");
      } else if (admin) {
        !adminurl.includes(urlhome || url) && navigate("/home/infowebpart");
      } else if (lecturer) {
        !lecturerurl.includes(urlhome || url) && navigate("/home/infowebpart");
      } else if (dean) {
        !deanurl.includes(urlhome || url) && navigate("/home/infowebpart");
      }
    }
  }, [token, Head, url,admin,dean,lecturer,navigate]);

  return (
    <div>
      <header>
        <div className={cx("header")}>
          <HeaderTop />
          <SubHeader />
        </div>
      </header>
      <div className={`max-w-[984px] m-auto ${cx("navleft")}`}>
        <NavLeft></NavLeft>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Home;
