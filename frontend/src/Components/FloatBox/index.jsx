import classNames from "classnames/bind";
import {AiOutlineInfoCircle} from "react-icons/ai"
import styles from "./foatbox.module.scss"
const cx= classNames.bind(styles)

function FloatBox() {
    return (
      <div className="w-full mr-auto text-center">
        <div className="w-[300px] h-[200px] bg-slate-700 py-[20px]">
          <p>Are you oke</p>
          <p className="flex justify-center ">
            <button className="w-[50%] bg-slate-50 py-[10px]">YES</button>
            <button className="w-[50%] bg-slate-50 py-[10px]">YES</button>
          </p>
        </div>
      </div>
    );
}

export default FloatBox;