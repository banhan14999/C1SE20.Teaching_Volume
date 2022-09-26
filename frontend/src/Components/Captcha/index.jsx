import Captcha from "captcha-image";
import classNames from "classnames/bind";
import { forwardRef } from "react";

import styles from "./captcha.module.scss";
const cx = classNames.bind(styles)

const captchaImage = new Captcha(
  "24px Arial",
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
 function MyCaptcha(props, ref) {
   return (
     <div
       ref={ref}
       className={`${cx("captcha")} captchavalue`}
       dangerouslySetInnerHTML={createMarkup(captchaImage)}
     />
   );
 }
export default forwardRef(MyCaptcha);