import TeachingVolumes from "./TeachingVolume";
import ProjectGuide from "./ProjectGuide";
import MarkingVolume from "./MarkingVolume";
import VolumeOfExamQuestions from "./VolumeOfExamQuestions";
import MonitorTheExam from "./MonitorTheExam";
import FacultyActivities from "./FacultyActivities";
import AcademicAdvisor from "./AcademicAdvisor";
import ScientificActivities from "./ScientificActivities";
import { forwardRef } from "react";

function DungChung(props,ref) {
  return (
    <div ref={ref}>
      <div>
        <TeachingVolumes />
      </div>
      <div className="mt-7">
        <ProjectGuide />
      </div>
      <div className="mt-7">
        <MarkingVolume />
      </div>
      <div className="mt-7">
        <VolumeOfExamQuestions />
      </div>
      <div className="mt-7">
        <MonitorTheExam />
      </div>
      <div className="mt-7">
        <FacultyActivities />
      </div>
      <div className="mt-7">
        <AcademicAdvisor />
      </div>
      <div className="mt-7">
        <ScientificActivities />
      </div>
    </div>
  );
}

export default forwardRef(DungChung);
