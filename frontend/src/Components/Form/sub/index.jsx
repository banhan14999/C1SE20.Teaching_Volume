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

const cx = classNames.bind(styles);
function FormSubject() {
  const [count,setCount] = useState(1)
  const [form,setForm] = useState("Teaching Volume")

  const [renderAdd,setRenderAdd] = useState(false)

     function createTeaching(stt, letter, numbercode,subject,grade, semester,numberofsubject,classcoefficient,subjectcoefficient,timecoefficient ) {
       return {stt, letter, numbercode,subject,grade, semester,numberofsubject,classcoefficient,subjectcoefficient,timecoefficient}
     }
     const teaching = [
       createTeaching(1, "CS", 211, "CMU", "AIS", 1, 65, 1.05, 1.2, 45),
       createTeaching(2, "CS", 211, "CMU", "AIS", 1, 65, 1.05, 1.2, 45),
     ];
      function createProject(stt, letter, numbercode,subject,grade,type, semester,credit,unit,number,coefficient ) {
       return {stt, letter, numbercode,subject,grade, type, semester,credit,unit,number,coefficient}
     }

     const project = [
       createProject(1, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),
       createProject(2, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),
     ];
     function createOther(Activities, ExamMonitor, Advisor,TimeScientific,Semester ) {
       return { Activities, ExamMonitor, Advisor, TimeScientific, Semester };
     }

     const other = [
       createOther(1, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),
       createOther(2, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),
     ];
     
     const handleClick = (e)=>{
        setForm(e.target.textContent);
         e.target.textContent === "Teaching Volume" && setCount(1);
         e.target.textContent === "Project Volume" && setCount(2);
         e.target.textContent === "Grading Volume" && setCount(3);
         e.target.textContent === "Exam Volume" && setCount(4);
         e.target.textContent === "Other" && setCount(5); 
      }
     
      const obj = {
       "Teaching Volume": <TeachingVolume rows={teaching} />,
       "Project Volume": <ProjectVolume rows={project} />,
       "Grading Volume": <GradingVolume rows={project} />,
       "Exam Volume": <ExamVolume rows={project} />,
       Other: <Other rows={other} />,
     };

     function handleNext(e){
       setCount((prev) => prev + 1)
       if(count===5){
        setCount(1);
       }
     }
     function handlePrev(){
      setCount((prev) => prev - 1);
      if(count===0){
        setCount(5)
      }
     }
     function handleAdd(){
        setRenderAdd(true)
     }
     useEffect(()=>{
        count === 1 && setForm("Teaching Volume");
        count === 2 && setForm("Project Volume");
        count === 3 && setForm("Grading Volume");
        count === 4 && setForm("Exam Volume");
        count === 5 && setForm("Other");
     },[count])
     
  return (
    <div className={cx("form")}>
      <div className={cx("nav_form")}>
        <ul onClick={handleClick}>
          <li className={`${form === "Teaching Volume" && "!bg-red-800"}`}>
            Teaching Volume
          </li>
          <li className={`${form === "Project Volume" && "!bg-red-800"}`}>
            Project Volume
          </li>
          <li className={`${form === "Grading Volume" && "!bg-red-800"}`}>
            Grading Volume
          </li>
          <li className={`${form === "Exam Volume" && "!bg-red-800"}`}>
            Exam Volume
          </li>
          <li className={`${form === "Other" && "!bg-red-800"}`}>Other</li>
        </ul>
        <div className="mt-[20px]">
          {form !== "Teaching Volume" && form !== "Project Volume" ? (
            <Button onClick={handleAdd} width="150px">
              Add
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {obj[form]}
      <div className="text-right mt-[20px]">
        {form !== "Teaching Volume" && (
          <Button width="150px" bgcolor="red" class="mr-3" onClick={handlePrev}>
            Prev
          </Button>
        )}
        {form !== "Other" && (
          <Button width="150px" bgcolor="red" class="ml-3" onClick={handleNext}>
            Next
          </Button>
        )}
        {form === "Other" && (
          <Button width="150px" bgcolor="red" class="ml-3">
            submit
          </Button>
        )}
      </div>
      {renderAdd && count === 5 && <OtherDetail setRenderAdd={setRenderAdd}/>}
      {renderAdd && count === 4 && <ExamDetail setRenderAdd={setRenderAdd}/>}
      {renderAdd && count === 3 && <ExamDetail setRenderAdd={setRenderAdd} title="Grading Detail" />}
    </div>
  );
}

export default FormSubject;
