import classNames from "classnames/bind";

import styles from "./home.module.scss";
import HeaderTop from "../../Components/Header/HeaderTop";
import SubHeader from "../../Components/Header/SubHeader";
import Footer from "../../Components/Footer"
import NavLeft from "../../Components/Navbar";

const cx = classNames.bind(styles);
function Home() {
  return (
    <div>
      <header>
        <div className={cx("header")}>
          <HeaderTop />
          <SubHeader />
        </div>
      </header>
      <div className="w-[984px] m-auto">
        <NavLeft></NavLeft>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Home;
