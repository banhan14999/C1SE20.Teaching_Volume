import classNames from "classnames/bind";
import styles from "./ub.module.scss";
// import TeachingVolume from "./TeachingVolume"
// import ProjectVolume from "./projectvolume";
// import ExamVolume from "./ExamVolume";
import GradingVolume from "./GradingVolume";
const cx = classNames.bind(styles);
function FormSubject() {
    //  function createTeaching(stt, letter, numbercode,subject,grade, semester,numberofsubject,classcoefficient,subjectcoefficient,timecoefficient ) {
    //    return {stt, letter, numbercode,subject,grade, semester,numberofsubject,classcoefficient,subjectcoefficient,timecoefficient}
    //  }
    //  const rows = [
    //    createTeaching(1, "CS", 211, "CMU", "AIS", 1, 65, 1.05, 1.2, 45),
    //    createTeaching(2, "CS", 211, "CMU", "AIS", 1, 65, 1.05, 1.2, 45),
    //  ];
      function createProject(stt, letter, numbercode,subject,grade,type, semester,credit,unit,number,coefficient ) {
       return {stt, letter, numbercode,subject,grade, type, semester,credit,unit,number,coefficient}
     }
     const rows = [
       createProject(1, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),
       createProject(2, "CMU-SE", 403, "DO AN CDIO", "PIS","PRJ", 2, 2, "SV", 40, 0.96),

     ];
  return (
    <div className={cx("form")}>
      <div className={cx("nav_form")}>
        <ul>
          <li>Teaching Volume</li>
          <li>Project Volume</li>
          <li>Grading Volume</li>
          <li>Exam Volume</li>
          <li>Other</li>
        </ul>
      </div>
       <GradingVolume rows={rows}></GradingVolume>
    </div>
  );
}

export default FormSubject;
