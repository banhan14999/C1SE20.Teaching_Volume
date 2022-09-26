import  classNames  from "classnames/bind";
import { Link } from "react-router-dom";
// import { FiChevronDown } from "react-icons/fi";

import styles from "./dashboard.module.scss"
import imgLogo from "../../Assets/img/logo-jewel.png";
const cx = classNames.bind(styles)
function DaskBoard() {
  return (
    <div className=" bg-black/70 ">
      <div className="flex justify-around">
        <div className="w-[20%] text-center border-r-[2px] border-black h-screen">
          <div className="w-full">
            <img className="w-[90%] p-5" src={imgLogo}  alt="logo" />
          </div>
          <ul className={`${cx("sidebar")} `}>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard1</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard2</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard3</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard4</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="w-full text-end">
          <ul className={`${cx("sidebar")} `}>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard1</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard1</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard2</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard2</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard3</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard3</Link>
                </li>
              </ul>
            </li>
            <li className={cx("sidebar_list")}>
              <Link to="./">DaskBoard4</Link>
              <ul className={cx("sidebar_list--item")}>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
                <li>
                  <Link to="./">DaskBoard4</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DaskBoard;
