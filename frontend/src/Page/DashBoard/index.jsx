import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  FiArrowRightCircle,
  FiArrowLeftCircle,
  FiChevronsRight,
  FiChevronsLeft,
} from "react-icons/fi";

import classNames from "classnames/bind";
import styles from "./dashboard.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import FechApi from "../../fectch";
const cx = classNames.bind(styles);

function DaskBoard() {
  const [options,setOptions] = useState([])
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);



  useEffect(()=>{
      const arr = "http://localhost:3001/arr";
      FechApi(arr).then((data) => {
        setOptions([...data]);
      });
  },[])

  useEffect(()=>{
    const option = document.getElementsByClassName(`${styles.option}`);
    setA([...option])
  },[])

  function handleclick(){
    const item=[]
   const arr = a.filter((value)=>{
    if(value.checked === true)
      return value
    else 
      item.push(value)
  })
    setC([...arr])
    setB([...item])
  }
  return (
    <div className={`${cx("left")}`}>
      <div className={`${cx("trai")}`}>
        {(b.length>0 &&
          b.map((value, index) => {
            return (
              <div key={index}>
                <input
                  className={`${cx("option")}`}
                  type="checkbox"
                  name=""
                  id=""
                  value={value.value}
                /> 
                <label>{value.value}</label>
                <br></br>
              </div>
            );
          })) ||
          options.map((value, index) => {
            return (
              <div key={index}>
                <input
                  className={`${cx("option")}`}
                  type="checkbox"
                  name=""
                  id=""
                  value={value.value}
                />
                <label>{value.label}</label>
                <br></br>
              </div>
            );
          })}
      </div>
      <div className="text-[30px]">
        <p>
          <FiArrowRightCircle onClick={handleclick} />
        </p>
        <p>
          <FiArrowLeftCircle />
        </p>
        <p>
          <FiChevronsRight />
        </p>
        <p>
          <FiChevronsLeft />
        </p>
      </div>
      <div className={`${cx("phai")}`}>
        {c.map((value, index) => {
          return (
            <div key={index}>
              <input
                className={`${cx("option1")}`}
                type="checkbox"
                value={value.value}
              />
              <label>{value.value}</label>
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaskBoard;
