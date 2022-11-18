import Captcha from "captcha-image";
import classNames from "classnames/bind";
import { forwardRef, Fragment} from "react";
import styles from "./captcha.module.scss";
const cx = classNames.bind(styles);
let captchaImage = new Captcha(
  "25px Arial",
  "center",
  "middle",
  100,
  30,
  "white",
  "green",
  4
).createImage();
function createMarkup(source) {
  return { __html: source };
}
function MyCaptcha({...props}, ref) {
  return (
    <Fragment>
      <div
        ref={ref}
        className={`${cx("captcha")} captchavalue w-[100%]`}
        dangerouslySetInnerHTML={createMarkup(captchaImage)}
      />
    </Fragment>
  );
}
export default forwardRef(MyCaptcha);
