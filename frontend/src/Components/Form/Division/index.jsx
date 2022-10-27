import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import Button from "../../Button";
import styles from "./division.module.scss";
import SelectForm from "../../SelectForm";

const cx = classNames.bind(styles);

function Division() {
  const [options, setOptions] = useState([]);
  const [continues, setContinues] = useState(false);

  useEffect(() => {
    const arr = "http://localhost:3001/arr";
    fetch(arr)
      .then((response) => response.json())
      .then((data) => {
        setOptions([...data]);
      });
  }, []);
const refClass = useRef()
  // useEffect(() => {
  //   const options = document.querySelectorAll(`.${styles.options}`);
  //   const dropleft = document.querySelector(`.${styles.lefts}`);

  //   const dropright = document.querySelector(`.${styles.classroom}`);
  //   let currentTarget = null;
  //   [...options].forEach((box) => {
      // box.addEventListener("dragstart", function (e) {
      //   this.classList.add("dragging");
      //   currentTarget = this;
      // });
      // box.addEventListener("dragend", function (e) {
      //   this.classList.remove("dragging");
      // });
      // dropleft.addEventListener("dragover", function (e) {
      //   e.preventDefault();
      //   this.appendChild(currentTarget);
      // });
      // dropleft.addEventListener("drop", function (e) {
      //   this.appendChild(currentTarget);
      // });
      // dropright.addEventListener("dragover", function (e) {
      //   e.preventDefault();
      //   dropright.appendChild(currentTarget);
      // });
      // dropright.addEventListener("drop", function (e) {
      //   dropright.appendChild(currentTarget);
      // });
  //   });
  // });
  const [currentTarget,setCurrentTarget] = useState()
  function dragStart(e) {
    e.target.classList.add("dragging");
    setCurrentTarget(e.target);
  }
  function dragEnd(e) {
    e.target.classList.remove("dragging");
  }
  function dragLeft(e) {
    e.preventDefault();
    e.target.appendChild(currentTarget);
  }
  function dragover(e) {
    e.preventDefault();
     e.target.appendChild(currentTarget);
  }
function dropRight(e) {
    e.preventDefault();
    refClass.current.appendChild(currentTarget);
  }
  function drop(e) {
   refClass.current.appendChild(currentTarget);
 }
  const opt = [
    { value: "2021-2022", label: "2021-2022" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2024-2025" },
  ];
  const hocki = [
    { value: "Học Kỳ I", label: "Học Kỳ I" },
    { value: "Học Kỳ II", label: "Học Kỳ II" },
    { value: "Học Hè", label: "Học Hè" },
  ];
  function handleContinue() {
    setContinues(true);
  }

  return (
    <div className="w-[726px]">
      <div className={cx("option")}>
        <div className="flex pt-[107px] justify-around">
          <span className="w-[30%] ml-[50px]">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="30px"
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px]">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kì"
              height="30px"
            ></SelectForm>
          </span>
        </div>
      </div>
      <div className="text-center mb-3">
        <Button width="200px" bgcolor="#950B0B" onClick={handleContinue}>
          Tiếp tục
        </Button>
      </div>
      {continues && (
        <div>
          <div className={`${cx("container")}`}>
            <div className={`${cx("containerleft")} p-1`}>
              <div className="pb-5">
                <div className="text-center font-semibold text-[20px]">
                  <SelectForm
                    options={opt}
                    placeholder="Tên giảng viên"
                  ></SelectForm>
                </div>
              </div>
              <div
                className={`${cx("lefts")} h-[250px]`}
                onDragOver={dragover}
                onDrop={dragLeft}
              ></div>
            </div>
            <div className={`${cx("containerright")} p-1`}>
              <div className="pb-5">
                <div className="text-center font-semibold text-[20px]">
                  <SelectForm
                    options={opt}
                    placeholder="Tên Lớp học"
                  ></SelectForm>
                </div>
              </div>
              <div
                className={`${cx("classroom")} h-[250px]`}
                ref={refClass}
                onDragOver={dropRight}
                onDrop={drop}
              >
                {options.map((value, index) => {
                  return (
                    <div
                      className={`${cx("options")}`}
                      key={index}
                      draggable
                      onDragStart={dragStart}
                      onDragEnd={dragEnd}
                    >
                      <label>{value.label}</label>
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" mt-4 w-full text-right ml-[-35px]">
            <Button className="ml-4" bgcolor="rgb(149, 11, 11)" width="20%">
              Lưu
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Division;
