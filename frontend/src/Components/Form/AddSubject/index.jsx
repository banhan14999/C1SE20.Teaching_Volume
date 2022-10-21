import SelectForm from "../../SelectForm";
import { default as Button } from "../../Button";
import { IoIosWarning } from "react-icons/io";
import classNames from "classnames/bind";
import styles from "./addsubject.module.scss";
import { useState } from "react";
import { Post, Update } from "../../../utils/axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function AddSubject(props) {
  const updateData = useSelector((data) => data.dtupdate);
  const { data } = updateData;

  const [type, setType] = useState([]);
  const [req, setReq] = useState([]);
  const [selectedValue, setselectedValue] = useState();

  const options = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "PRJ", label: "PRJ" },
    { value: "DEM", label: "DEM" },
    { value: "DIS", label: "DIS" },
    { value: "LEC+LAB", label: "LEC+LAB" },
  ];
  
  function handleClickAdd() {
     const input = document.querySelectorAll(`.${styles.input}`);
     const arr = [...input];
     const types = type.reduce((str, value) => {
       return str + value.value + " ";
     }, "");

   if(props.btn){
      const id = data[0].Subject_id;
      const obj = {
        letter: arr[0].value,
        number: parseInt(arr[1].value),
        subject_name: arr[2].value,
        credit: parseInt(arr[3].value),
        type: types||selectedValue,
      };
     const check =  Update("/subject/update/", id, obj);
     check
       .then(function (response) {
          alert("Update Done");
       })
       .catch(function (error) {
          alert("Update That bai")
       });
      
   }else{
     setReq([...arr]);
     const checkValInput = arr.every((value) => value.value);
     if (!checkValInput || type.length === 0) {
       alert("Vui lòng nhập đầy đủ các trường!");
     } else if (checkValInput && type.length > 0) {
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
      const add =  Post("/subject/add", obj);
      add 
      .then((res)=>{
           alert("Add Done");
           arr.forEach((value) => {
             value.value = "";
           });
           setReq([]);
      })
      .catch(()=>{
         alert("Add That bai");
      })
     }
   }
  }
  
  useEffect(() => {
    if (props.btn) {
      const input = document.querySelectorAll(`.${styles.input}`);
      const arr = [...input];
      arr[0].value = data[0].Code.slice(0, data[0].Code.indexOf(" "));
      arr[1].value = data[0].Code.slice(data[0].Code.indexOf(" ") + 1);
      arr[2].value = data[0].Subject;
      arr[3].value = data[0].Credit;
      setselectedValue(data[0].Type);
    }
  }, [props.btn,data]);

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
                  <p className="absolute right-3 text-yellow-300">
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
                  <p className="absolute right-3  text-yellow-300">
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
                  <p className="absolute right-3  text-yellow-300">
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
                  <p className="absolute right-3  text-yellow-300">
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
              <div className="flex w-[55%] relative items-center">
                <SelectForm
                  placeholder="Type"
                  class=" w-full"
                  options={options}
                  setSelectedOption={setType}
                  isMulti="isMulti"
                  selectedValue={selectedValue}
                ></SelectForm>
              </div>
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
