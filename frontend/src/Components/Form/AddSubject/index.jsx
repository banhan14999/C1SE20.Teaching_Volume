import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";

import classNames from "classnames/bind";
import styles from "./addsubject.module.scss";
const cx = classNames.bind(styles);
function AddSubject() {
  const options = [
    { value: "2021-2022", label: "2021-2022" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2024-2025" },
  ];
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">Add Subject</h2>
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
              <input  placeholder="Number" className="w-1/2 input "></input>
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
                Add
              </Button>
              <Button bgcolor="#950b0b" width="30%" size="large">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
