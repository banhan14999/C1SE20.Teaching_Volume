import Captcha from "captcha-image";
import classNames from "classnames/bind";
import { forwardRef, Fragment } from "react";

import styles from "./captcha.module.scss";
const cx = classNames.bind(styles)
 

function createMarkup(source) {
  return { __html: source };
}
 function MyCaptcha({ Renderctc, ...props }, ref) {
     let captchaImage = new Captcha(
       "25px Arial",
       "center",
       "middle",
       100,
       32,
       "white",
       "green",
       4
     ).createImage();
       console.log(captchaImage);

   return (
     <Fragment>
         <div
           ref={ref}
           className={`${cx("captcha")} captchavalue`}
           dangerouslySetInnerHTML={createMarkup(captchaImage)}
         />
     </Fragment>
   );
 }
export default forwardRef(MyCaptcha);