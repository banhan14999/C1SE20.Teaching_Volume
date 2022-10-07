import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";

import classNames from "classnames/bind";
import styles from "./addsubject.module.scss";
const cx = classNames.bind(styles);
function AddSubject(props) {
  const options = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "DIS", label: "DIS" },
    { value: "LEC+LAB", label: "LEC+LAB" },
  ];
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">{props.title||"Add Subject"}</h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between">
              <label htmlFor="" className="w-[30%]">
                Letter
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Letter" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Number
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Number" className="w-1/2 input "></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Subject
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Subject" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Credit
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Credit" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Type
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="Type"
                class="w-1/2"
                options={options}
              ></SelectForm>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button bgcolor="#950b0b" width="30%" size="large">
                {props.btn || "Add"}
              </Button>
              <Button bgcolor="#950b0b" width="30%" size="large">
                Cancle
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
