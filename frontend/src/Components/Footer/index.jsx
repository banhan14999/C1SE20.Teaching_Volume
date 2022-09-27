import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import footer from "../../Assets/img/bg-footer.png";
const cx= classNames.bind(styles)
function Footer() {
    return (
      <div className="ml-[13px]">
        <div className={cx("footer_wrapper")}>
          <img src={footer} alt="Footer" />
        </div>
        <div className="text-center">
          Copyright© 2022 <a href="./">Đại học Duy Tân.</a>
        </div>
      </div>
    );
}

export default Footer;