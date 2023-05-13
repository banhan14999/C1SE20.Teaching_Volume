import classNames from "classnames/bind";
import styles from "./other.module.scss";
import Button from "../../../../Button";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);
function OtherDetail({ setRenderAdd, setValueOther, valueOther }) {

  const activities = useRef()
  const examMonitor = useRef();
  const advisor = useRef();
  const scientific = useRef();

  const [check, setCheck] = useState(false);
  const [valueForm, setValueForm] = useState({
    activities: 0,
    examMonitor: 0,
    advisor: 0,
    scientific: 0,
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
    setCheck(true);
    if (checkValInput) {
      if (
        valueForm.activities >= 0 &&
        valueForm.advisor >= 0 &&
        valueForm.examMonitor >= 0 &&
        valueForm.scientific >= 0
      ) {
        const obj = {
          activities: activities.current.value,
          advisor: advisor.current.value,
          examMonitor: examMonitor.current.value,
          scientific: scientific.current.value,
        };
        setValueOther([{ ...obj }]);
        setRenderAdd(false);
      }
    } else {
      alert("Vui lòng nhập đầy đủ các trường!");
    }
  }

  return (
    <div className={cx("form")}>
      <div className={cx("line")}>
        <h2 className="text-xl font-semibold">Chi tiết khác</h2>
      </div>
      <div className="p-5">
        <form action="">
          <div className="w-full flex justify-between">
            <label htmlFor="" className="w-[30%]">
              Các hoạt động
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Các hoạt động"
                ref={activities}
                type="number"
                className={`w-full input ${cx("input")} `}
                defaultValue={valueOther[0].activities}
                onChange={(e) => {
                  setValueForm({
                    ...valueForm,
                    activities: Number(e.target.value),
                  });
                  setCheck(false);
                }}
              ></input>
            </div>
          </div>
          {check && valueForm.activities < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Các hoạt động lớn hơn 0
            </div>
          )}
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              giám sát kỳ thi
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                type="number"
                ref={examMonitor}
                placeholder="giám sát kỳ thi"
                className={`w-full input ${cx("input")} `}
                defaultValue={valueOther[0].examMonitor}
                onChange={(e) => {
                  setCheck(false);
                  setValueForm({
                    ...valueForm,
                    examMonitor: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          {check && valueForm.examMonitor < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              giám sát kỳ thi lớn hơn 0
            </div>
          )}
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Cố vấn
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                ref={advisor}
                type="number"
                placeholder="Cố vấn"
                className={`w-full input ${cx("input")} `}
                defaultValue={valueOther[0].advisor}
                onChange={(e) => {
                  setCheck(false);
                  setValueForm({
                    ...valueForm,
                    advisor: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          {check && valueForm.advisor < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Cố vấn lớn hơn 0
            </div>
          )}
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Thời gian khoa học
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                type="number"
                ref={scientific}
                placeholder="Thời gian khoa học"
                className={`w-full input ${cx("input")} `}
                defaultValue={valueOther[0].scientific || valueForm.scientific}
                onChange={(e) => {
                  setCheck(false);
                  setValueForm({
                    ...valueForm,
                    scientific: Number(e.target.value),
                  });
                }}
              ></input>
            </div>
          </div>
          {check && valueForm.scientific < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Thời gian khoa học lớn hơn 0
            </div>
          )}
          <div className="flex justify-around mt-[20px]">
            <Button
              bgcolor="#950b0b"
              width="30%"
              size="large"
              onClick={handleAdd}
            >
              Cập nhật
            </Button>
            <Button
              bgcolor="#950b0b"
              width="30%"
              size="large"
              onClick={handleCancle}
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtherDetail;
