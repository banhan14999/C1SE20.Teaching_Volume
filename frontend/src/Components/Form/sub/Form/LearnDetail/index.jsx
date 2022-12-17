import classNames from "classnames/bind";
import styles from "./exam.module.scss";
import Button from "../../../../Button";
import SelectForm from "../../../../SelectForm";
import { useEffect, useRef, useState } from "react";
import { ApiTeachingVolume } from "../../../../../apis/axios";
const cx = classNames.bind(styles);
function ExamDetail({ setRenderAdd, setGrading, setExamvo, Semester, length,title }) {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [subjectop, setSubjectop] = useState([]);
  const[ check,setCheck] = useState(false)

  const refSelectType = useRef()
  const refSelectSubject = useRef()
  const typeOptions = [
    { value: "LEC", label: "LEC" },
    { value: "LAB", label: "LAB" },
    { value: "DEM", label: "DEM" },
    { value: "DIS", label: "DIS" },
  ];
  const [exam, setExam] = useState({
    time: "",
    number: "",
    coefficient: "",
  });
  function handleCancle() {
    setRenderAdd(false);
  }


  function handleAdd() {
    if (setGrading) {
        const obj = {
          // credit: exam.credit,
          subject: (subject && subject.label) || "",
          type: (type && type.value) || "",
          time: Number(exam.time),
          numberGE: Number(exam.number),
          coefficientGrade: Number(exam.coefficient),
          idSubject: subject && subject.id,
        };
        let checkValInput = true;
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] === "" || obj[key] ===0) {
              checkValInput = false;
            }
          }
        }
        checkValInput && setCheck(true);
        if (!checkValInput) {
          alert("Vui lòng nhập đầy đủ các trường!");
        } else {
           if(obj.time>0 && obj.numberGE >0 && obj.coefficientGrade >0){
             setExam({
               time: "",
               number: "",
               coefficient: "",
             });
              refSelectSubject.current.clearValue();
              refSelectType.current.clearValue();
             setGrading((prev) => [
               ...prev,
               {
                 ...obj,
                 stt: length.length + 1,
                 letter: subject.value.slice(0, subject.value.indexOf(" ")),
                 numbercode: subject.value.slice(
                 subject.value.indexOf(" ") + 1,
                 subject.value.length
                 ),
                 semester: Semester,
                 unit: "Bài",
                 coefficient: Number(exam.coefficient),
               },
             ]);
             setSubjectop([...subjectop.filter((value) => {
               return subject.label !== value.label;
             })])
           }
        }
      
    } else if (setExamvo) {
        const obj = {
          // credit: exam.credit,
          subject: (subject && subject.label) || "",
          type: (type && type.value) || "",
          time: Number(exam.time),
          numberGE: Number(exam.number),
          coefficientExam: Number(exam.coefficient),
          idSubject: subject && subject.id,
        };
        let checkValInput = true;
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] === "" || obj[key]===0) {
              checkValInput = false;
            }
          }
        }
        checkValInput && setCheck(true);
        if (!checkValInput) {
          alert("Vui lòng nhập đầy đủ các trường!");
        } else {
          if(obj.time>0 && obj.numberGE >0 && obj.coefficientExam >0){
            setExam({
              time: "",
              number: "",
              coefficient: "",
            });
            refSelectSubject.current.clearValue();
            refSelectType.current.clearValue();
            setExamvo((prev) => [
              ...prev,
              {
                ...obj,
                stt: length.length + 1,
                letter: subject.value.slice(0, subject.value.indexOf(" ")),
                numbercode: subject.value.slice(
                  subject.value.indexOf(" ") + 1,
                  subject.value.length
                ),
                semester: Semester,
                unit: "Đề",
                coefficient: exam.coefficient,
              },
            ]);
          }
        }
      }
    
  }
  useEffect(() => {
    ApiTeachingVolume.Get("subject/all").then((req) => {
      const arr = req.subjects.map((item) => ({
        label: item.SubjectName,
        value: item.Letter + " " + item.Number,
        id: item.IdSubject,
      }));
      setSubjectop([...arr]);
    });
  }, []);

  return (
    <div className={cx("form")}>
      <div className={cx("line")}>
        <h2 className="text-xl font-semibold">{title || "Exam Detail"}</h2>
      </div>
      <div className="p-5">
        <form action="">
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Subject
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <SelectForm
                class="w-full"
                placeholder="Subject"
                options={subjectop}
                refSelect={refSelectSubject}
                setSelectedOption={setSubject}
              />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Type
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <SelectForm
                class="w-full"
                refSelect={refSelectType}
                placeholder="Type"
                options={typeOptions}
                setSelectedOption={setType}
              />
            </div>
          </div>
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Time
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Time"
                type="number"
                className={`w-full input ${cx("input")} `}
                value={exam.time}
                onChange={(e) => {
                  setCheck(false);
                  setExam({ ...exam, time: e.target.value });
                }}
              ></input>
            </div>
          </div>
          {check && exam.time <=1 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Time lớn hơn 1
            </div>
          )}
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Number
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Number"
                type="number"
                className={`w-full input ${cx("input")} `}
                value={exam.number}
                onChange={(e) => {
                  setCheck(false);
                  setExam({ ...exam, number: e.target.value });
                }}
              ></input>
            </div>
          </div>
          {check && exam.number < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Number lớn hơn 0
            </div>
          )}
          <div className="w-full flex justify-between mt-2">
            <label htmlFor="" className="w-[30%]">
              Coefficient
            </label>
            <span className="text-lg font-bold">:</span>
            <div className="flex w-[55%] relative items-center">
              <input
                placeholder="Coefficient"
                type="number"
                className={`w-full input ${cx("input")} `}
                value={exam.coefficient}
                onChange={(e) => {
                  setCheck(false);
                  setExam({ ...exam, coefficient: e.target.value });
                }}
              ></input>
            </div>
          </div>
          {check && exam.coefficient < 0 && (
            <div className="text-right text-red-800 leading-[10px] mt-1">
              Coefficient lớn hơn 0
            </div>
          )}
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

export default ExamDetail;
