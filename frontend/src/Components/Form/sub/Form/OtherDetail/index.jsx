import classNames from "classnames/bind";
import styles from "./other.module.scss";
import Button from "../../../../Button";
import { useState } from "react";

const cx = classNames.bind(styles);
function OtherDetail({ setRenderAdd, setValueOther }) {
 const [valueForm, setValueForm] = useState({
   activities: "",
   examMonitor: "",
   advisor: "",
   scientific: "",
 });
  function handleCancle() {
    setRenderAdd(false);
  }
  function handleAdd() {
    let checkValInput = true;
    for (let key in valueForm) {
      if (valueForm.hasOwnProperty(key)) {
        if (valueForm[key] === "") {
          checkValInput = false;
        }
      }
    }
    if(checkValInput){
      setValueOther([{...valueForm}]);
      setRenderAdd(false);
    }else {
      alert("Vui lòng nhập đầy đủ các trường!");
    }
  }

  return (
    <div className={cx("form")}>
      <div className={cx("line")}>
        <h2 className="text-xl font-semibold">Other Detail</h2>
      </div>
      <div className="p-5">
        <form action="">
          <div className="w-full flex justify-between">
            <label htmlFor="" className="w-[30%]">
              Activities
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Activities"
                type="number"
                className={`w-full input ${cx("input")} `}
                value={valueForm.activities || ""}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    activities: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Exam monitor
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                type="number"
                placeholder="Exam monitor"
                className={`w-full input ${cx("input")} `}
                value={valueForm.examMonitor || ""}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    examMonitor: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Advisor
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                type="number"
                placeholder="Advisor"
                className={`w-full input ${cx("input")} `}
                value={valueForm.advisor || ""}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    advisor: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Time Scientific
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                type="number"
                placeholder="Time Scientific"
                className={`w-full input ${cx("input")} `}
                value={valueForm.scientific || ""}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    scientific: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>

          <div className="flex justify-around mt-[20px]">
            <Button
              bgcolor="#950b0b"
              width="30%"
              size="large"
              onClick={handleAdd}
            >
              Add
            </Button>
            <Button
              bgcolor="#950b0b"
              width="30%"
              size="large"
              onClick={handleCancle}
            >
              Cancle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtherDetail;
