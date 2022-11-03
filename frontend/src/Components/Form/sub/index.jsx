import classNames from "classnames/bind";
import styles from "./ub.module.scss";
import TeachingVolume from "./TeachingVolume"
import ProjectVolume from "./projectvolume";
import ExamVolume from "./ExamVolume";
import GradingVolume from "./GradingVolume";
import Other from "./Other";
import { useState } from "react";
import Button from "../../Button";
const cx = classNames.bind(styles);
function FormSubject() {
  const [count,setCount] = useState(0)
  const [form,setForm] = useState("Teaching Volume")
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
     }
     const obj = {
       "Teaching Volume": <TeachingVolume rows={teaching} />,
       "Project Volume": <ProjectVolume rows={project} />,
       "Grading Volume": <GradingVolume rows={project} />,
       "Exam Volume": <ExamVolume rows={project} />,
       Other: <Other rows={other} />,
     };

     function handleNext(e){
      setCount((prev)=>prev+1)
      count === 1 && setForm("Teaching Volume");
      count === 2 && setForm("Project Volume");
      count === 3 && setForm("Grading Volume");
      count === 4 && setForm("Exam Volume");
      count === 5 && setForm("Other");
     }
  return (
    <div className={cx("form")}>
      <div className={cx("nav_form")}>
        <ul onClick={handleClick}>
          <li>Teaching Volume</li>
          <li>Project Volume</li>
          <li>Grading Volume</li>
          <li>Exam Volume</li>
          <li>Other</li>
        </ul>
      </div>
      {obj[form]}
      <div className="text-right mt-[20px]">
        <Button width="150px" bgcolor="red" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default FormSubject;
