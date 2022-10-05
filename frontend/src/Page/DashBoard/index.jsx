import classNames from "classnames/bind";
import styles from "./dashboard.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import FechApi from "../../fectch";
import { useRef } from "react";
const cx = classNames.bind(styles);

function DaskBoard() {
  const [options, setOptions] = useState([]);
  const [set, setLeft] = useState([]);
  
  useEffect(() => {
    const arr = "http://localhost:3001/arr";
    FechApi(arr).then((data) => {
      setOptions([...data]);
    });
  }, []);
  let left = useRef([])
  useEffect(() => {
    const options = document.getElementsByClassName(`${styles.option}`);
    const dropleft = document.querySelector(`.${styles.trai}`);
     const arr =[...options]
    let currentTarget = null;
      [...options].forEach((box) => {
        box.addEventListener("dragstart", function (e) {
          this.classList.add("dragging");
          currentTarget = this; 
           
        });
        box.addEventListener("dragend", function (e) {
          this.classList.remove("dragging");
        });
        dropleft.addEventListener("dragover", function (e) {
          e.preventDefault();
          this.appendChild(currentTarget);
        });  
        dropleft.addEventListener("drop", function (e) {
          this.appendChild(currentTarget);
          left.current.push(currentTarget); 
        }); 
      });  
    
  }); 
const handle=()=>{
  setLeft([...left.current])
}
useEffect(() => {
console.log("set",set);
  console.log(left.current);

}, [left.current.length]);

  return (
    <div className={`${cx("left")}`}>
      <button onClick={handle}>onclicc</button>
      <div className={`${cx("trai")}`}> </div>

      <div className={`${cx("phai")}`}>
        {options.map((value, index) => {
          return (
            <div className={`${cx("option")}`} key={index} draggable>
              <label>{value.label}</label>
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaskBoard;
