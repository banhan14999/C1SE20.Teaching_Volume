import { default as Button } from "../../Button";

import classNames from "classnames/bind";
import styles from "./addyear.module.scss";
const cx = classNames.bind(styles);
function AddYear() {
 
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">Year Infomation</h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between">
              <label htmlFor="" className="w-[30%]">
                ID
              </label>
              <span className="text-lg font-bold">:</span>
              <input
                placeholder="ID"
                className="w-1/2 input"
              ></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Start
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Start" className="w-1/2 input"></input>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button bgcolor="#950b0b" width="30%" size="large">
                Add
              </Button>
              <Button bgcolor="#950b0b" width="30%" size="large">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddYear;
