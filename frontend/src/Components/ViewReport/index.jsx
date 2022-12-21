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
     { value: "2021", label: "2021-2022" },
     { value: "2022", label: "2022-2023" },
     { value: "2023", label: "2023-2024" },
     { value: "2024", label: "2024-2025" },
   ];
   const hocki = [
     { value: "1", label: "Học kỳ I" },
     { value: "2", label: "Học kỳ II" },
     { value: "Hè", label: "Học kỳ hè" },
     { value: "4", label: "Cả năm" },
   ];
   function handleprint(e) {
    if (semester.value!== "4"){
      
      printJS({
        header: `<h1 style="text-align:center; width:1754px;">BẢNG TỔNG HỢP KẾ HOẠCH KHỐI LƯỢNG ĐÀO TẠO ĐẠI HỌC <br/>NĂM HỌC: ${year.label}<br/>${semester.label}</h1>`,
        printable: "print",
        targetStyles: [
          "width:1754px !important",
          "display:flex !important",
          "justify-content: center !important",
        ],
        type: "html",
        maxWidth: 1754,
        scanStyles: true,
        style:
          "td, th {border: 1px solid; text-align:center;} td{width:9.1111% !important;} table {width:1754px !important; border-collapse: collapse !important; display:block !important;} .MuiTableFooter-root {display:none !important;} #printsig {width:1754px !important; display:flex !important;justify-content:space-around !important;align-items: flex-end;}}",
      });
    }
   else {
    printJS({
      header: `<h1 style="text-align:center; width:1754px;">BẢNG TỔNG HỢP KẾ HOẠCH KHỐI LƯỢNG ĐÀO TẠO ĐẠI HỌC <br/>NĂM HỌC: ${year.label}</h1>`,
      printable: "print",
      targetStyles: [
        // "width:1123px !important",
        "display:flex !important",
        "justify-content: center !important",
      ],
      type: "html",
      maxWidth: 1623,
      scanStyles: true,
      style:
        "td, th {border: 1px solid; text-align:center; font-size:7px !important; color:black !important;} th{font-weight:500;} table {width:1754px !important;border-collapse: collapse !important; display:block !important;} .MuiTableFooter-root {display:none !important;} #printsig {width:1754px !important; display:flex !important;justify-content:space-around !important;align-items: flex-end;} #workload{display:none !important;}}",
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
                height="34px"
                setSelectedOption={setYear}
              ></SelectForm>
            </span>
            <span className="w-[30%] ml-[-30px]">
              <SelectForm
                options={hocki}
                placeholder="Chọn học kì"
                height="34px"
                setSelectedOption={setSemester}
              ></SelectForm>
            </span>
          </div>
        </div>
        {year && semester && (
          <div className="flex justify-end items-center mb-[10px]">
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
              yearLabel = {year.label}
              label={year.label}
            ></ViewTable>
          )
        )}
      </div>
    );
}

export default ViewReport;