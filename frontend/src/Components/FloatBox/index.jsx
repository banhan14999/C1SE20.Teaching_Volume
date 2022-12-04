import classNames from "classnames/bind";
import { useRef } from "react";
import styles from "./foatbox.module.scss"
import Button from "../Button"
import {IoNotificationsCircleOutline} from "react-icons/io5"
const cx= classNames.bind(styles)

function FloatBox({ setConfirm, handleClickConfirm, Title }) {
  const refModal = useRef();
  window.onclick = function (event) {
    if (event.target === refModal.current) {
      setConfirm(false);
    }
  };
  return (
    <div id="myModal" ref={refModal} className={`${cx("modal")}`}>
      <div className={`${cx("modal-content")}`}>
        <span
          className={`${cx("close")}`}
          onClick={(e) => {
            setConfirm(false);
          }}
        >
          ×
        </span>
        <div>
          <p className="flex justify-center">
            <IoNotificationsCircleOutline
              size={100}
              color="#a81818"
            ></IoNotificationsCircleOutline>
          </p>
          <h3 className="text-center font-medium text-[24px] h-10 leading-10 mb-3">
            Bạn có muốn {Title || "xóa"} không!!!
          </h3>
          <p className="flex justify-around">
            <Button
              bgcolor="green"
              width="40%"
              weight={500}
              onClick={() => {
                setConfirm(false);
                handleClickConfirm();
              }}
            >
              Yes
            </Button>
            <Button
              bgcolor="gray"
              width="40%"
              weight={500}
              onClick={(e) => {
                setConfirm(false);
                refModal.current.style.display = "none";
              }}
            >
              No
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FloatBox;