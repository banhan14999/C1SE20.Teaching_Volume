<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Total;
use Illuminate\Support\Facades\DB;

class VolumeController extends Controller
{
    //Load before Manage Workload
    public function checkExist($idLecturer, $semester, $year)
    {
        $totalVolume = DB::table('totalvolume')
                       ->where([
                            ['IdLecturer', '=', $idLecturer],
                            ['Year', '=', $year],
                            ['Semester', '=', $semester],
                       ])
                       ->get();
        //$totalVolume : Collection
        if($totalVolume->isEmpty()){
            return response()->json([
                'status' => false,
            ]);
        }
        else{
            return response()->json([
                'status' => 200,
                'totalVolume' => $totalVolume,
            ]);
        }
    }


    private static function totalTeachVol($teaching)
    {
        $teachingVol = 0.00;
        if(! empty($teaching)) {
            foreach($teaching as $teach) {
                $teachingVol = round($teach['classCoefficient'] * $teach['subjectCoefficient'] * $teach['timeTeaching'], 2); 
            }
        }
        return $teachingVol;
    }

    private static function totalProjectVol($projects)
    {
        $projectVol = 0.00;
        if(! empty($projects)) {
            foreach($projects as $project) {
                $projectVol = round($project['subjectCoefficient'] * $project['numberOfStudent'], 2);
            }
        }
        return $projectVol;
    }

    private static function totalGradeVol($grading)
    {
        $gradingVol = 0.00;
        if(! empty($grading)) {
            foreach($grading as $grade) {
                $gradingVol = round($grade['gradeCoefficient'] * $grade['numberOfExam']);
            }
        }
        return $gradingVol;
    }

    private static function totalExamVol($exams)
    {
        $examVol = 0.00;
        if(! empty($exams)) {
            foreach($exams as $exam) {
                $examVol = round($exam['examCoefficient'] * $exam['numberOfExam'], 2);
            }
        }
        return $examVol;
    }

    public function approvalVolume()
    {

    }

    public function declineVolume()
    {

    }

    public function updateAfterFix()
    {
        
    }

    private static function storeTotal($data)
    {
        $total = new Total;
        $total->IdLecturer = $data['idLecturer'];
        $total->Year = $data['year'];
        $total->semester = $data['semester'];
        $total->TeachingVolume = $data['teachingVol'];
        $total->ProjectVolume = $data['projectVol'];
        $total->GradingVolume = $data['gradingVol'];
        $total->ExamVolume = $data['examVol'];
        $total->ActivitiesVolume = $data['activitiesVol'];
        $total->ExamMonitorVolume = $data['examMonitorVol'];
        $total->AdvisorVolume = $data['advisorVol'];
        $total->TimeScientificVolume = $data['timeScientific'];
        $total->TotalVolume = $data['teachingVol'] + $data['projectVol']    + $data['gradingVol']
                            + $data['examVol']     + $data['activitiesVol'] + $data['examMonitorVol']
                            + $data['advisorVol']  + $data['timeScientific'];
        $total->Status = "Waiting";
        $total->save();
    }

    private static function storeGradeExam($data)
    {

    }

    public function handleTotalRequest(Request $request)
    {
        $idLecturer = $request->input('idLecturer');
        $year = $request->input('year');
        $semester = $request->input('semester');
        $teaching = $request->input('teaching');
        $project = $request->input('project');
        $grading = $request->input('grading');
        $exam = $request->input('exam');
        $activitiesVol = $request->input('activities');
        $examMonitorVol = $request->input('examMonitor');
        $advisorVol = $request->input('advisor');
        $timeScientific = $request->input('scientific');

        //create array data to store into table gradingexam
        $gradeExam = [
            'year' => $year,
            'semester' => $semester,
            'idLecturer' => $idLecturer,
            'grade' => [
                'grades' => $grading,
                'category' => 'Grading',
            ],
            'exam' => [
                'exams' => $exam,
                'category' => 'Exam', 
            ],
        ];

        #caculate all total to store into table total
        $teachingVol = self::totalTeachVol($teaching);
        $projectVol = self::totalProjectVol($project);
        $gradingVol = self::totalGradeVol($grading);
        $examVol = self::totalExamVol($exam);

        $totalVol = [
            'year' => $year,
            'semester' => $semester,
            'idLecturer' => $idLecturer,
            'teachingVol' => $teachingVol,
            'projectVol' => $projectVol,
            'gradingVol' => $gradingVol, 
            'examVol' => $examVol,
            'activitiesVol' => $activitiesVol,
            'examMonitorVol' => $examMonitorVol,
            'advisorVol' => $advisorVol,
            'timeScientific' => $timeScientific,
        ];

        self::storeGradeExam($gradeExam);
        self::storeTotal($totalVol);
    }

}
