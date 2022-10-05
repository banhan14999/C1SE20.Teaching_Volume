import classNames from "classnames/bind";
import styles from "./load.module.scss"
const cx = classNames.bind(styles)

function Loading() {
    return (
      <div className={`${cx("loading")}`}>
        <div className={`${cx("lds-ring")}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
}

export default Loading;
