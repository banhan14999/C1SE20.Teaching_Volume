import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";

import classNames from "classnames/bind";
import styles from "./addsubject.module.scss";
import { useState } from "react";
import { Post } from "../../../axios";
import { IoIosWarning } from "react-icons/io";
const cx = classNames.bind(styles);
function AddSubject(props) {

  const [type,setType] = useState([])
  const [req,setReq] = useState([])

  const options = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "PRJ", label: "PRJ" },
    { value: "DEM", label: "DEM" },
  ];

function handleClickAdd(){
  const input = document.querySelectorAll(`.${styles.input}`);
  const arr = [...input];
  setReq([...arr])
  const every = arr.every((value)=>value.value)
  arr.forEach(value=>{
    if(!value.value){
       value.style.boxShadow = "1px 1px 1px 1px rgb(149, 11, 11) inset";
    }
    else {
      value.style.boxShadow = "1px 1px 1px 1px gray inset";
    }
  })
  if(every){
    const types = type.reduce((str, value) => {
      return str + value.value + " ";
    }, "");
    const obj = {
    letter: arr[0].value,
    number: parseInt(arr[1].value),
    subject_name: arr[2].value,
    credit: parseInt(arr[3].value),
    type: types,
  };
  Post("http://127.0.0.1:8000/api/add-subject",obj)
  arr.forEach(value=>{
    value.value = ""
  })
}
}
console.log(type);
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">
            {props.title || "Add Subject"}
          </h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className="w-full flex justify-between">
              <label htmlFor="" className="w-[10%]">
                Letter
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
                <input
                  placeholder="Letter"
                  className={`w-full input ${cx("input")} `}
                  required
                ></input>
                {req.length !== 0 && req[0].value === "" && (
                  <p className="absolute right-3 text-red-700">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[10%]">
                Number
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
                <input
                  placeholder="Number"
                  className={`w-full input ${cx("input")} `}
                  required
                ></input>
                {req.length !== 0 && req[1].value === "" && (
                  <p className="absolute right-3 text-red-700">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[10%]">
                Subject
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
                <input
                  placeholder="Subject"
                  className={`w-full input ${cx("input")} `}
                  required
                ></input>
                {req.length !== 0 && req[2].value === "" && (
                  <p className="absolute right-3 text-red-700">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[10%]">
                Credit
              </label>
              <span className="text-lg font-bold">:</span>
              <div className="flex w-[55%] relative items-center">
                <input
                  placeholder="Credit"
                  className={`w-full input ${cx("input")} `}
                  required
                ></input>
                {req.length !== 0 && req[3].value === "" && (
                  <p className="absolute right-3 text-red-700">
                    <IoIosWarning className="text-[24px]"></IoIosWarning>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[10%]">
                Type
              </label>
              <span className="text-lg font-bold">:</span>
              <SelectForm
                placeholder="Type"
                class="w-[55%]"
                options={options}
                setSelectedOption={setType}
                isMulti="isMulti"
                type ={type}
              ></SelectForm>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={handleClickAdd}
              >
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
