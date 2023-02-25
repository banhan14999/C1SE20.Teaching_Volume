
import SelectForm from "../SelectForm";
import style from "./tranningvolumeplan.module.scss";
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import DungChung from "./Dungchung";
const cx = classNames.bind(style);
function TrainingVolumePlan() {
  const [year, setYear] = useState();
  const [semester, setSemester] = useState();
  const [btn, setBtn] = useState(false);

const componentRef = useRef(null);

  const opt = [
    { value: "2021", label: "2021-2022" },
    { value: "2022", label: "2022-2023" },
    { value: "2023", label: "2023-2024" },
    { value: "2024", label: "2024-2025" },
  ];
  const hocki = [
    { value: "1", label: "Học Kỳ I" },
    { value: "2", label: "Học Kỳ II" },
    { value: "3", label: "Học Kỳ Hè" },
  ];
  function handleClick(){
    const allRoot = document.querySelectorAll(".css-11xur9t-MuiPaper-root-MuiTableContainer-root")
    allRoot.forEach(ele=>{
      ele.style.overflow = "inherit";
    })
    setBtn(true)
  }
  useEffect(()=>{
   btn &&  handleClick()
  },[btn])
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
              // defaultValue={
              //   years && years.year && selectValue(years.year, opt)
              // }
            ></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px]">
            <SelectForm
              options={hocki}
              placeholder="Chọn học kỳ"
              height="34px"
              setSelectedOption={setSemester}
              // defaultValue={
              // years &&
              // years.semester &&
              // years &&
              // years.year &&
              // selectValue(years.semester, hocki)
              // }
            ></SelectForm>
          </span>
        </div>
      </div>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => (
          <button className="block bg-green-700 px-7 py-2">Print to PDF!</button>
        )}
      />
      <DungChung ref={componentRef} ></DungChung>
    </div>
  );
}

export default TrainingVolumePlan;
