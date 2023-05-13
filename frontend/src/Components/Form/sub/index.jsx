import classNames from "classnames/bind";
import styles from "./ub.module.scss";
import TeachingVolume from "./TeachingVolume"
import ProjectVolume from "./projectvolume";
import ExamVolume from "./ExamVolume";
import GradingVolume from "./GradingVolume";
import Other from "./Other";
import { useEffect, useState } from "react";
import Button from "../../Button";
import OtherDetail from "./Form/OtherDetail";
import ExamDetail from "./Form/LearnDetail";
import { ApiTeachingVolume } from "../../../apis/axios";
import FloatBox from "../../FloatBox";


const cx = classNames.bind(styles);
function FormSubject({ year, semester, theoryClass, exams, others, btn,title,idLec,callApiTotal }) {
  const [count, setCount] = useState(1);
  const [form, setForm] = useState("Teaching Volume");
  const [renderAdd, setRenderAdd] = useState(false);
  const idLecturer = JSON.parse(localStorage.getItem("IdLecturer"));
  const [teaching, setTeaching] = useState([]);
  const [projects, setProjects] = useState([]);
  const [Grading, setGrading] = useState([]);
  const [examvo, setExamvo] = useState([]);
  const [pros, setPros] = useState([]);
  const [valueOther, setValueOther] = useState([createOther(0, 0, 0, 0)]);
  const [teachingapi, setTeachingApi] = useState([]);


  function createTeaching(
    stt,
    letter,
    numbercode,
    subject,
    grade,
    semester,
    numberofsubject,
    classcoefficient,
    subjectcoefficient,
    timecoefficient
  ) {
    return {
      stt,
      letter,
      numbercode,
      subject,
      grade,
      semester,
      numberofsubject,
      classcoefficient,
      subjectcoefficient,
      timecoefficient,
    };
  }
  function createProject(
    stt,
    letter,
    numbercode,
    subject,
    grade,
    type,
    semester,
    credit,
    unit,
    number,
    coefficient
  ) {
    return {
      stt,
      letter,
      numbercode,
      subject,
      grade,
      type,
      semester,
      credit,
      unit,
      number,
      coefficient,
    };
  }

  useEffect(() => {
    if ( semester && year && (idLecturer || idLec)) {
      ApiTeachingVolume.Get(
        `/class/theoryClass/${
         (idLec && idLec.id) || idLecturer
        }/semester/${semester}/year/${year}`
      ).then((req) => {
        const arr = req.classes.map((value, index) => {
          return createTeaching(
            index + 1,
            value.Letter,
            value.Number,
            value.SubjectName,
            value.Grade,
            value.Semester,
            value.NumberOfStudent,
            value.Coefficient,
            value.SubjectCoefficient,
            value.TimeTeaching
          );
        });
        setTeaching([...arr]);
      });
      ApiTeachingVolume.Get(
        `/class/realityClass/${
          (idLec && idLec.id) || idLecturer
        }/semester/${semester}/year/${year}`
      ).then((req) => {
        const arr = req.classes.map((value, index) => {
          return createProject(
            index + 1,
            value.Letter,
            value.Number,
            value.SubjectName,
            value.Grade,
            value.TypeClass,
            value.Semester,
            value.CreditClass,
            value.Unit,
            value.NumberOfStudent,
            value.SubjectCoefficient
          );
        });
        setProjects([...arr]);
        const arrs = req.classes.reduce((arr, value) => {
          return [
            ...arr,
            {
              subjectCoefficient: Number(value.SubjectCoefficient),
              numberOfStudent: value.NumberOfStudent,
            },
          ];
        }, []);
        setPros([...arrs]);
      });
    }
  }, [idLec,idLecturer, semester, year]);
  useEffect(() => {
    const arr = teaching.reduce((arr, value) => {
      return [
        ...arr,
        {
          classCoefficient: Number(value.classcoefficient),
          subjectCoefficient: Number(value.subjectcoefficient),
          timeTeaching: Number(value.timecoefficient),
        },
      ];
    }, []);
    setTeachingApi([...arr]);
  }, [teaching]);

  function createOther(activities, examMonitor, advisor, scientific) {
    return { activities, examMonitor, advisor, scientific };
  }

  const handleClick = (e) => {
    setForm(e.target.textContent);
    e.target.textContent === "khối lượng giảng dạy" && setCount(1);
    e.target.textContent === "khối lượng dự án" && setCount(2);
    e.target.textContent === "phân loại khối lượng" && setCount(3);
    e.target.textContent === "khối lượng kiểm tra" && setCount(4);
    e.target.textContent === "Khác" && setCount(5);
  };
  const obj = {
    "khối lượng giảng dạy": <TeachingVolume rows={teaching} />,
    "khối lượng dự án": <ProjectVolume rows={projects} />,
    "phân loại khối lượng": (
      <GradingVolume rows={Grading} setGrading={setGrading} btn={btn} />
    ),
    "khối lượng kiểm tra": <ExamVolume rows={examvo} setExamvo={setExamvo} btn={btn} />,
    "Khác": <Other rows={valueOther} onClick={handleAdd} btn={btn}  valueOther = {valueOther}/>,
  };
  useEffect(() => {
   if(btn){
     setGrading([...theoryClass]);
     setExamvo([...exams]);
     setValueOther([...others]);
   }
  }, [btn,theoryClass,exams,others]);
  function handleNext(e) {
    setCount((prev) => prev + 1);
    if (count === 5) {
      setCount(1);
    }
  }
  function handlePrev() {
    setCount((prev) => prev - 1);
    if (count === 0) {
      setCount(5);
    }
  }
  function handleAdd() {
    setRenderAdd(true);
  }
  useEffect(() => {
    count === 1 && setForm("khối lượng giảng dạy");
    count === 2 && setForm("khối lượng dự án");
    count === 3 && setForm("phân loại khối lượng");
    count === 4 && setForm("khối lượng kiểm tra");
    count === 5 && setForm("Khác");
  }, [count]);

 const [confirm, setConfirm] = useState(false);
function handleClickConfirm(){
    const obj = {
      data: {
        idLecturer: idLec || idLecturer,
        year: Number(year),
        semester: semester,
        teaching: teachingapi,
        project: pros,
        grading: Grading,
        exam: examvo,
        other: valueOther[0] || (btn && others[0]),
      },
    };
    ApiTeachingVolume.Put("/volume/update", obj)
      .then((res) => {
        alert("Thanh cong");
      })
      .catch((err) => {
        alert("loi");
      });
}
  function handleSubmitForm() {
    if(btn === "btn"){
      const obj = {
        data: {
          idLecturer: idLecturer,
          year: Number(year),
          semester: semester,
          teaching: teachingapi,
          project: pros,
          grading: Grading,
          exam:  examvo,
          other: valueOther[0] ,
        },
      };
      ApiTeachingVolume.Post("/volume/total", obj)
        .then((res) => {
          alert("Thanh cong");
          callApiTotal()
        })
        .catch((err) => {
          alert("loi");
        });
    }else if(btn==="update"){
      setConfirm(true)
    }
  }

  
  return (
    <>
      <div className={cx("form")}>
        <p className="text-[25px] text-center mb-3">
          {title && "Lecturer Code: " + title.id}
          <br />
          {title && "Full Name: " + title.fullName}
        </p>
        <div className={cx("nav_form")}>
          <ul onClick={handleClick}>
            <li
              className={`${form === "khối lượng giảng dạy" && "!bg-red-800"}`}
            >
              khối lượng giảng dạy
            </li>
            <li className={`${form === "khối lượng dự án" && "!bg-red-800"}`}>
              khối lượng dự án
            </li>
            <li
              className={`${form === "phân loại khối lượng" && "!bg-red-800"}`}
            >
              phân loại khối lượng
            </li>
            <li
              className={`${form === "khối lượng kiểm tra" && "!bg-red-800"}`}
            >
              khối lượng kiểm tra
            </li>
            <li className={`${form === "Khác" && "!bg-red-800"}`}>Khác</li>
          </ul>
        </div>
        {obj[form]}
        <div className="mt-[20px] flex justify-end">
          <div className="mr-10">
            {btn !== "view" &&
            form !== "khối lượng giảng dạy" &&
            form !== "khối lượng dự án" &&
            form !== "Khác" ? (
              <p className="w-[150px]" onClick={handleAdd} data-add={form}>
                <Button width="100%" bgcolor="#D82C2C" weight={500}>
                  Thêm
                </Button>
              </p>
            ) : (
              <></>
            )}
          </div>
          <p className="mr-5">
            {form !== "khối lượng giảng dạy" && (
              <Button
                width="150px"
                bgcolor="#D82C2C"
                class="mr-3"
                weight={500}
                onClick={handlePrev}
              >
                Lùi
              </Button>
            )}
          </p>
          <p className="ml-5">
            {form !== "Khác" && (
              <Button
                width="150px"
                bgcolor="#D82C2C"
                class="ml-3"
                weight={500}
                onClick={handleNext}
              >
                Tiếp
              </Button>
            )}
            {btn !== "view" && form === "Khác" && (
              <Button
                width="150px"
                bgcolor="#D82C2C"
                class="ml-3"
                weight={500}
                onClick={handleSubmitForm}
              >
                Lưu
              </Button>
            )}
          </p>
        </div>
        {renderAdd && count === 5 && semester && (
          <OtherDetail
            setRenderAdd={setRenderAdd}
            setValueOther={setValueOther}
            valueOther={valueOther}
          />
        )}
        {renderAdd && count === 4 && semester && (
          <ExamDetail
            setRenderAdd={setRenderAdd}
            setExamvo={setExamvo}
            Semester={semester}
            length={examvo}
          />
        )}
        {renderAdd && count === 3 && semester && (
          <ExamDetail
            setRenderAdd={setRenderAdd}
            title="chấm điểm chi tiết"
            setGrading={setGrading}
            Semester={semester}
            length={Grading}
          />
        )}
        {confirm && (
          <FloatBox
            Title="cập nhật"
            handleClickConfirm={() => {
              handleClickConfirm();
            }}
            setConfirm={setConfirm}
          />
        )}
      </div>
    </>
  );
}

export default FormSubject;
