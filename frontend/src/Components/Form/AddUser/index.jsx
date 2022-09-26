import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";

import classNames from "classnames/bind";
import styles from "./adduser.module.scss";
const cx = classNames.bind(styles);
function AddUser() {
  const options = [
    { value: "2021-2022", label: "2021-2022" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2024-2025" },
  ];
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">User Infomation</h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between">
              <label htmlFor="" className="w-[30%]">
                User name
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="User name" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Password
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Password" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                DTU-ID
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="DTU-ID" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                First name
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="First name" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Last name
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Last name" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                International school
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="International school"
                class="w-1/2"
                options={options}
              ></SelectForm>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Department
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="Department"
                class="w-1/2"
                options={options}
              ></SelectForm>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Role
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="Role"
                class="w-1/2"
                options={options}
              ></SelectForm>
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

export default AddUser;
