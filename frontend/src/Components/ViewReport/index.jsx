import ViewTable from "../../Components/ViewTable";
import ViewSemester from "../ViewSemester"
import styles from "./report.module.scss"
import classNames from "classnames/bind";
import SelectForm from "../SelectForm";
import { useState } from "react";
import printJS from "print-js";
import { AiFillPrinter } from "react-icons/ai";

 const cx = classNames.bind(styles)
function ViewReport() {
    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);
   const opt = [
     { value: "2022", label: "2021-2022" },
     { value: "2023", label: "2022-2023" },
     { value: "2024", label: "2024-2025" },
   ];
   const hocki = [
     { value: "1", label: "Học Kỳ I" },
     { value: "2", label: "Học Kỳ II" },
     { value: "3", label: "Học Hè" },
     { value: "4", label: "Full" },
   ];
   function handleprint(e) {
    if (semester.value!== "4"){
      printJS({
        printable: "print",
        targetStyles: [
          "width:1123px !important",
          "display:flex !important",
          "justify-content: center !important",
        ],
        type: "html",
        maxWidth: 1123,
        scanStyles: true,
        style:
          "td, th {border: 1px solid; text-align:center;} table {width:21cm;border-collapse: collapse !important; display:block !important;} .MuiTableFooter-root {display:none !important;} #printsig {width:1123px !important;display:flex !important;justify-content:space-around !important; margin-top:60px !important;} #print{width:100vw !important; display:flex !important; align-items: center !important; flex-direction: column !important;}}",
      });
    }
   else {
    printJS({
      printable: "print",
      targetStyles: [
        "width:1123px !important",
        "display:flex !important",
        "justify-content: center !important",
      ],
      type: "html",
      maxWidth: 1123,
      scanStyles: true,
      style:
        "td, th {border: 1px solid; text-align:center;} table {width:21cm !important;border-collapse: collapse !important; display:block !important;} .MuiTableFooter-root {display:none !important;} #printsig {width:100vw !important; display:flex !important;justify-content:space-around !important;}}",
    });
   }}
    return (
      <div>
        <div className={cx("option")}>
          <div className="flex pt-[14.3%] justify-around">
            <span className="w-[30%] ml-[50px]">
              <SelectForm
                options={opt}
                placeholder="Chọn năm học"
                height="30px"
                setSelectedOption={setYear}
              ></SelectForm>
            </span>
            <span className="w-[30%] ml-[-30px]">
              <SelectForm
                options={hocki}
                placeholder="Chọn học kì"
                height="30px"
                setSelectedOption={setSemester}
              ></SelectForm>
            </span>
          </div>
        </div>
        {year && semester && (
          <div className="flex  justify-end  mb-[10px] ">
            <span
              className="cursor-pointer text-[22px] flex items-center"
              onClick={handleprint}
            >
              <AiFillPrinter />
              Print
            </span>
          </div>
        )}
        {year && semester && semester.value !== "4" ? (
          <ViewSemester
            year={year.value}
            semester={semester.value}
            label={year.label}
          ></ViewSemester>
        ) : (
          year &&
          semester && (
            <ViewTable
              year={year.value}
              semester={semester.value}
              label={year.label}
            ></ViewTable>
          )
        )}
      </div>
    );
}

export default ViewReport;