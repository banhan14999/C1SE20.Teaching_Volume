import { default as Button } from "../../Button";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./addyear.module.scss";
import { ApiTeachingVolume } from "../../../apis/axios";
const cx = classNames.bind(styles);

function AddYear(props) {
   const [valuesForm, setValuesForm] = useState({
     start: "",
   });
 function handleAdd(e){
    if (props.btn) {
      const obj = {
        start: valuesForm.start,
      };
      console.log(obj);
      // const check = ApiTeachingVolume.Update("/subject/update/", obj);
      // check
      //   .then(function (response) {
      //     alert("Update Done");
      //   })
      //   .catch(function (error) {
      //     alert("Update That bai", error);
      //   });
    } else {
      let checkValInput = true;
      for (let key in valuesForm) {
        if (valuesForm.hasOwnProperty(key)) {
          if (valuesForm[key] === "") {
            checkValInput = false;
          }
        }
      }
      if (!checkValInput) {
        alert("Vui lòng nhập đầy đủ các trường!");
      } else if (checkValInput) {
        const obj = {
          start: valuesForm.start,
        };
        console.log(obj);
        const add = ApiTeachingVolume.Post("/year/add", obj);
        add
          .then((res) => {
            alert("Add Done");
            setValuesForm({
              start: ""
            });
          })
          .catch(() => {
            alert("Add That bai");
          });
      }
    }
 }
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">{props.title||"Year Infomation"}</h2>
        </div>
        <div className="p-5">
          <form action="">
            <div className={`w-full flex justify-between ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                ID
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="ID" className="w-1/2 input"></input>
            </div>
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Start
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="Start" className="w-1/2 input"
              value={valuesForm.start}
              onChange={(e)=> setValuesForm({...valuesForm ,start :e.target.value})}
              ></input>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button bgcolor="#950b0b" width="30%" size="large" onClick = {handleAdd}>
                {props.btn || "Add"}
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
