import classNames from "classnames/bind";
import styles from "./other.module.scss";
import Button from "../../../../Button";
import { useState } from "react";

const cx = classNames.bind(styles);
function OtherDetail({ setRenderAdd, setValueOther }) {
 const [valueForm, setValueForm] = useState({
   Activities: "",
   ExamMonitor: "",
   Advisor: "",
   TimeScientific: "",
 });
  function handleCancle() {
    setRenderAdd(false);
  }
  function handleAdd() {
    setValueOther([{...valueForm}]);
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
                placeholder="Letter"
                className={`w-full input ${cx("input")} `}
                value={valueForm.Activities || ""}
                onChange={(e) => {
                  setValueForm({ ...valueForm, Activities: e.target.value });
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
                placeholder="Number"
                className={`w-full input ${cx("input")} `}
                value={valueForm.ExamMonitor || ""}
                onChange={(e) => {
                  setValueForm({ ...valueForm, ExamMonitor: e.target.value });
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
                placeholder="Subject"
                className={`w-full input ${cx("input")} `}
                value={valueForm.Advisor || ""}
                onChange={(e) => {
                  setValueForm({ ...valueForm, Advisor: e.target.value });
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
                placeholder="Credit"
                className={`w-full input ${cx("input")} `}
                value={valueForm.TimeScientific || ""}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    TimeScientific: e.target.value,
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
