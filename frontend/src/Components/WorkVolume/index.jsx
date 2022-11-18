
import { useState } from "react";
import classNames from "classnames/bind";

import ManagerClassLecturer from "../Table/ManagerClassLecturer";
import Button from "../Button"
import SelectForm from "../SelectForm";
import styles from "./workvolume.module.scss";

const cx = classNames.bind(styles);

function WorkVolume() {

  const [mclass, setMClass] = useState(false);
  const Head = JSON.parse(localStorage.getItem("Head"))
      const handleclick = (e) => {
        setMClass(Head);
        e.target.style.display = "none"
      };
 
   const options = [
     { value: "2022", label: "2021-2022" },
     { value: "2023", label: "2022-2023" },
     { value: "2024", label: "2024-2025" },
   ];
   const hocki = [
     { value: "1", label: "Học Kỳ I" },
     { value: "2", label: "Học Kỳ II" },
     { value: "3", label: "Học Hè" },
   ];
  return (
    <div>

      <div className={cx("option")}>
        <div className="flex pt-[107px] justify-around">
          <span className="w-[30%] ml-[50px]">
            <SelectForm options={options} height="30px"></SelectForm>
          </span>
          <span className="w-[30%] ml-[-30px]">
            <SelectForm options={hocki} height="30px"></SelectForm>
          </span>
        </div>
      </div>
      <div className="text-center mb-3">
        <Button width="200px" bgcolor="#950B0B" onClick={handleclick}>
          Tiếp tục
        </Button>
      </div>

      {mclass && <ManagerClassLecturer></ManagerClassLecturer>}
    </div>
  );
}

export default WorkVolume;
