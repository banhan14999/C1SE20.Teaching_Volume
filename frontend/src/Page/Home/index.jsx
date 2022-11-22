import classNames from "classnames/bind";
import styles from "./home.module.scss";
import HeaderTop from "../../Components/Header/HeaderTop";
import SubHeader from "../../Components/Header/SubHeader";
import Footer from "../../Components/Footer";
import NavLeft from "../../Components/Navbar";
import { Navigate } from "react-router-dom";
const cx = classNames.bind(styles);

function Home() {
  const token = localStorage.getItem("Token");
  if (!token) {
    return <Navigate to="/authentication" replace />;
  }
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
