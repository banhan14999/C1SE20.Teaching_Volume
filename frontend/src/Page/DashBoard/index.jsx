import { useEffect, useState } from "react";
import Button from "../../Components/Button"
import classNames from "classnames/bind";
import styles from "./dashboard.module.scss";
import SelectForm from "../../Components/SelectForm"
import { Get } from "../../axios";

const cx = classNames.bind(styles);

function DaskBoard() {
  const [options, setOptions] = useState([]);
  const [set, setLeft] = useState(false);
  //  { dropleft: [], dropright :[]}
  useEffect(() => {
    const arr = "http://localhost:3001/arr";
    const api = Get(arr)
    api.then((data) => { 
      setOptions([...data]);
    })
  }, []);

  useEffect(() => {
    const options = document.querySelectorAll(`.${styles.options}`);
    const dropleft = document.querySelector(`.${styles.left}`);
    const dropright = document.querySelector(`.${styles.classroom}`);
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
        });
         dropright.addEventListener("dragover", function (e) {
           e.preventDefault();
           dropright.appendChild(currentTarget);
         }); 
          dropright.addEventListener("drop", function (e) {
            dropright.appendChild(currentTarget);
          }); 
      });  
  }); 
  
const handle=()=>{
  setLeft((p)=>!p)
}
useEffect(() => {
  const trai = document.querySelector(`.${styles.left}`);
  const left = trai.getElementsByClassName(`${styles.options}`);
  console.log(set,left);
});
  const opt = [
    { value: "2021-2022", label: "2021-2022" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2024-2025" },
  ];
  return (
    <>
      <div className={`${cx("container")}`}>
        <div className={`${cx("containerleft")} p-2`}>
          <div className="py-2 border-b-1 border-red-600">
            <div className="text-center font-semibold text-[20px]">
              <SelectForm options={opt}></SelectForm>
            </div>
          </div>
          <div className={`${cx("left")} h-[330px]`}></div>
        </div>
        <div className={`${cx("containerright")} p-2`}>
          <div className="py-2 border-b-1 border-red-600">
            <div className="text-center font-semibold text-[20px]">
              <SelectForm options={opt}></SelectForm>
            </div>
          </div>
          <div className={`${cx("classroom")} h-[330px]`}>
            {options.map((value, index) => {
              return (
                <div className={`${cx("options")}`} key={index} draggable>
                  <label>{value.label}</label>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex mt-4 text-center">
        <p className="w-[50%]">
          <Button className="bg-slate-900" width="30%" onClick={handle}>
            Lưu
          </Button>
        </p>
        <p className="w-[50%]">
          <Button className=" bg-slate-200" width="30%" onClick={handle}>
            Thoat
          </Button>
        </p>
      </div>
    </>
  );
}

export default DaskBoard;
