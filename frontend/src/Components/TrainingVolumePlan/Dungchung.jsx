import TeachingVolumes from "./TeachingVolume";
import ProjectGuide from "./ProjectGuide";
import MarkingVolume from "./MarkingVolume";
import VolumeOfExamQuestions from "./VolumeOfExamQuestions";
import MonitorTheExam from "./MonitorTheExam";
import FacultyActivities from "./FacultyActivities";
import AcademicAdvisor from "./AcademicAdvisor";
import ScientificActivities from "./ScientificActivities";
import { ApiTeachingVolume } from "../../apis/axios";
import { forwardRef, useState } from "react";
import { useEffect } from "react";

function DungChung(props, ref) {
  const [teaching, setTeaching] = useState([]);
  const [project, setProject] = useState([]);
  const [marking, setMarking] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [monitorTheExam, setMonitorTheExam] = useState([]);
  const [facultyActivities, setFacultyActivities] = useState([]);
  const [scientificActivities, setScientificActivities] = useState([]);
  const [academicAdvisor, setAcademicAdvisor] = useState([]);

  useEffect(() => {
    const IdLecturer = JSON.parse(localStorage.getItem("IdLecturer"));
    console.log(
      `/volume/individualVol/idLec/${IdLecturer}/year/${props.year.value}`
    );
    ApiTeachingVolume.Get(
      `/volume/individualVol/idLec/${IdLecturer}/year/${props.year.value}`
    ).then((data) => {
      setTeaching([...data["theoryVol"]]);
      setProject([...data["relityVol"]]);
      setMarking([...data["gradeVol"]]);
      setExamQuestions([...data["examVol"]]);
      setMonitorTheExam([...data["examMonitorVol"]]);
      setFacultyActivities([...data["activitiesVol"]]);
      setAcademicAdvisor([...data["advisorVol"]]);
      setScientificActivities([...data["timeScientific"]]);
    });
  }, [props.year]);
  return (
    <div ref={ref}>
      <div>
        <TeachingVolumes teaching={teaching} />
      </div>
      <div className="mt-7">
        <ProjectGuide project={project} />
      </div>
      <div className="mt-7">
        <MarkingVolume marking={marking} />
      </div>
      <div className="mt-7">
        <VolumeOfExamQuestions examQuestions={examQuestions} />
      </div>
      <div className="mt-7">
        <MonitorTheExam monitorTheExam={monitorTheExam} />
      </div>
      <div className="mt-7">
        <FacultyActivities facultyActivities={facultyActivities} />
      </div>
      <div className="mt-7">
        <AcademicAdvisor scientificActivities={scientificActivities} />
      </div>
      <div className="mt-7">
        <ScientificActivities academicAdvisor={academicAdvisor} />
      </div>
      <div id="printsig" className="flex justify-between mt-24">
        <div>
          <h2>TP. PHÒNG ĐÀO TẠO ĐẠI HỌC & SAU ĐẠI HỌC</h2>
          <p>&nbsp;</p>
        </div>
        <div>
          <h2>HIỆU TRƯỞNG/ VIỆN TRƯỞNG</h2>
          <p>(Ký và ghi rõ họ tên)</p>
        </div>
        <div class="mt-[-23px]">
          <p>Đà Nẵng,Ngày..... Tháng..... Năm 20... </p>
          <h2>TRƯỞNG KHOA</h2>
          <p>(Ký và ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(DungChung);