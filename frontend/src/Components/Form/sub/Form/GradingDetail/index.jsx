import classNames from "classnames/bind";
import styles from "./grading.module.scss";
import Button from "../../../../Button";
import SelectForm from "../../../../SelectForm";
const cx = classNames.bind(styles);
function GradingDetail() {
  return (
    <div className={cx("form")}>
      <div className={cx("line")}>
        <h2 className="text-xl font-semibold">Exam Detail</h2>
      </div>
      <div className="p-5">
        <form action="">
          <div className="w-full flex justify-between">
            <label htmlFor="" className="w-[30%]">
              Subject letter
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <SelectForm class="w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Subject
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <SelectForm class="w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Type
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <SelectForm class="w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Time
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Credit"
                className={`w-full input ${cx("input")} `}
              ></input>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Number
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Credit"
                className={`w-full input ${cx("input")} `}
              ></input>
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Coefficient
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Credit"
                className={`w-full input ${cx("input")} `}
              ></input>
            </div>
          </div>
          <div className="flex justify-around mt-[20px]">
            <Button bgcolor="#950b0b" width="30%" size="large">
              Add
            </Button>
            <Button bgcolor="#950b0b" width="30%" size="large">
              Cancle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GradingDetail;
