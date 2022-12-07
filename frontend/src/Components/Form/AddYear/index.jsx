import { default as Button } from "../../Button";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./addyear.module.scss";
import { ApiTeachingVolume } from "../../../apis/axios";
import { useParams,useNavigate } from "react-router-dom";
import React, { Component }  from 'react';

const cx = classNames.bind(styles);

function AddYear(props) {
const param = useParams()
const navigate = useNavigate()
  const [valuesForm, setValuesForm] = useState({
     start: "",
   });
    function clickCancel() {
      if (param && param.id) {
        navigate(-1);
      } else {
        setValuesForm({
          start: "",
        });
      }
    }
 function handleAdd(e){
    if (props.btn) {
      // const obj = {
      //   start: valuesForm.start,
      // };
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
        ApiTeachingVolume.Post("/year/add", obj)
          .then((res) => {
            alert("Thêm Thành Công!!!");
            setValuesForm({
              start: ""
            });
          })
          .catch(() => {
            alert("Thêm Không Thành Công");
          });
      }
    }
 }
  return (
    <div>
      <div className={cx("form")}>
        <div className={cx("line")}>
          <h2 className="text-xl font-semibold">
            {props.title || "Year Information"}
          </h2>
        </div>
        <div className="p-5">
          <form action="">
            {/* <div className={`w-full flex justify-between ${props.hide}`}>
              <label htmlFor="" className="w-[30%]">
                ID
              </label>
              <span className="text-lg font-bold">:</span>
              <input placeholder="ID" className="w-1/2 input"></input>
            </div> */}
            <div className="w-full flex justify-between mt-2">
              <label htmlFor="" className="w-[30%]">
                Start
              </label>
              <span className="text-lg font-bold">:</span>
              <input
                placeholder="Start"
                className="w-1/2 input"
                value={valuesForm.start}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, start: e.target.value })
                }
              ></input>
            </div>
            <div className="flex justify-around mt-[20px]">
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={handleAdd}
              >
                {props.btn || "Add"}
              </Button>
              <Button
                bgcolor="#950b0b"
                width="30%"
                size="large"
                onClick={clickCancel}
              >
                {param && param.id ? "Cancel" : "Reset"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddYear;
