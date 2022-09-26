import ManagerClass from "../Table/ManagerClass";

import Button from "../Button"
import SelectForm from "../SelectForm";
import classNames from "classnames/bind";
import styles from "./workvolume.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function WorkVolume() {

  const [mclass, setMClass] = useState(false);

 const handleclick =()=>{
      setMClass((prev)=> !prev)
 }
      
 
   const options = [
     { value: "2021-2022", label: "2021-2022" },
     { value: "2022-2023", label: "2022-2023" },
     { value: "2023-2024", label: "2024-2025" },
   ];
   const hocki = [
     { value: "Học Kỳ I", label: "Học Kỳ I" },
     { value: "Học Kỳ II", label: "Học Kỳ II" },
     { value: "Học Hè", label: "Học Hè" },
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
      {mclass && <ManagerClass></ManagerClass>}
    </div>
  );
}

export default WorkVolume;
