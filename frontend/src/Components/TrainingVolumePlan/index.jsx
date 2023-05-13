import SelectForm from "../SelectForm";
import style from "./tranningvolumeplan.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import DungChung from "./Dungchung";
const cx = classNames.bind(style);
function TrainingVolumePlan() {
  const [year, setYear] = useState();
  const [btn, setBtn] = useState(false);

  const componentRef = useRef(null);

  const opt = [
    { value: "2021", label: "2021-2022" },
    { value: "2022", label: "2022-2023" },
  ];
  function handleClick() {
    const allRoot = document.querySelectorAll(
      ".css-11xur9t-MuiPaper-root-MuiTableContainer-root"
    );
    allRoot.forEach((ele) => {
      ele.style.overflow = "inherit";
    });
    setBtn(true);
  }
  useEffect(() => {
    btn && handleClick();
  }, [btn]);
  return (
    <div>
      <div className={cx("option")}>
        <div className="flex pt-[14%] justify-around">
          <span className="w-[30%] ml-[50px]">
            <SelectForm
              options={opt}
              placeholder="Chọn năm học"
              height="34px"
              setSelectedOption={setYear}
            ></SelectForm>
          </span>
          <span class="w-[30%] ml-[50px]"></span>
        </div>
      </div>

      {year && (
        <>
          <ReactToPrint
            content={() => componentRef.current}
            trigger={() => (
              <button className="block bg-green-700 px-7 py-2">
                Print to PDF!
              </button>
            )}
          />
          <DungChung ref={componentRef} year={year}></DungChung>
        </>
      )}
    </div>
  );
}

export default TrainingVolumePlan;
