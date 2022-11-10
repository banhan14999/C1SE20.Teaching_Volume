<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GradingExam;
use Illuminate\Http\Request;
use App\Models\Total;
use Illuminate\Support\Facades\DB;

class VolumeController extends Controller
{
    //get all total volume by head
    public function getAllTotalByHead($semester, $year)
    {
        //$idLecturer = auth()->user()['IdLecturer'];
        $department = auth()->user()['IdDepartment'];
        $faculty    = auth()->user()['IdFaculty'];
        $totalVols  = DB::table('totalvolume')
                      ->join('users', 'totalvolume.IdLecturer', '=', 'users.IdLecturer')
                      ->where([
                          ['IdDepartment', '=', $department],
                          ['IdFaculty', '=', $faculty],
                          ['Semester', '=', $semester],
                          ['Year', '=', $year],
                      ])
                      ->get();
        return response()->json([
            'status' => 200,
            'totalVols' => $totalVols,
        ]);
    }
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
                $gradingVol = round($grade['coefficientGrade'] * $grade['numberGE']);
            }
        }
        return $gradingVol;
    }

    private static function totalExamVol($exams)
    {
        $examVol = 0.00;
        if(! empty($exams)) {
            foreach($exams as $exam) {
                $examVol = round($exam['coefficientExam'] * $exam['numberGE'], 2);
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
        $year = $data['year'];
        $semester = $data['semester'];
        $idLecturer = $data['idLecturer'];
        $grades = $data['grades'];
        $exams = $data['exams'];
        if(! empty($grades)) {
            foreach($grades as $grade) {
                $grd = new GradingExam;
                $grd->Year = $year;
                $grd->Semester = $semester;
                $grd->IdLecturer = $idLecturer;
                $grd->IdSubject = $grade['idSubject'];
                $grd->TypeGE = $grade['type'];
                //$grd->CreditGE = $grade['credit'];
                $grd->Time = $grade['time'];
                $grd->Unit = $grade['unit'];
                $grd->NumberGE = $grade['numberGE'];
                $grd->CoefficientGradeExam = $grade['coefficientGrade'];
                $grd->CategoryVolume = "Grading";
                $grd->save();
            }
            
        }
        if(! empty($exams)) {
            foreach($exams as $exam) {
                $ex = new GradingExam;
                $ex->Year = $year;
                $ex->Semester = $semester;
                $ex->IdLecturer = $idLecturer;
                $ex->IdSubject = $exam['idSubject'];
                $ex->TypeGE = $exam['type'];
                //$ex->CreditGE = $exam['credit'];
                $ex->Time = $exam['time'];
                $ex->Unit = $exam['unit'];
                $ex->NumberGE = $exam['numberGE'];
                $ex->CoefficientGradeExam = $exam['coefficientExam'];
                $ex->CategoryVolume = "Exam";
                $ex->save();
            }
        }
    }

    public function handleTotalRequest(Request $request)
    {
        //dd($request->data);
        // return response()->json([
        //    'project' =>  $request->data['project'],
        // ]);
        $idLecturer = $request->data['idLecturer'];
        $year = $request->data['year'];
        $semester = $request->data['semester'];
        $teaching = $request->data['teaching'];
        $project = $request->data['project'] ?? '';
        $grading = $request->data['grading'];
        $exam = $request->data['exam'];
        $activitiesVol = $request->data['other']['activities'];
        $examMonitorVol = $request->data['other']['examMonitor'];
        $advisorVol = $request->data['other']['advisor'];
        $timeScientific = $request->data['other']['scientific'];

        //create array data to store into table gradingexam
        $gradeExam = [
            'year' => $year,
            'semester' => $semester,
            'idLecturer' => $idLecturer,
            'grades' => $grading,
            'exams' => $exam
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

        return response()->json([
            'status' => 200,
            'message' => 'Added succesfully!',
        ]);
    }

    public function getTotal($semester, $year)
    {
        $idLecturer = auth()->user()['IdLecturer'];
        $totalVol = DB::table('totalvolume')
                    ->where([
                        ['IdLecturer', '=', $idLecturer],
                        ['Semester', '=', $semester],
                        ['Year', '=', $year],
                    ])
                    ->get();
        return response()->json([
            'status' => 200,
            'totalVol' => $totalVol,
        ]);
    }

    private static function getTheoryClass($idLecturer, $semester, $year)
    {
        $theoryClass = DB::table('classes')
                       ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                       ->where([
                            ['IdLecturer','=',$idLecturer],
                            ['Semester','=', $semester],
                            ['Year', '=', $year],   
                       ])
                       ->whereIn('TypeClass', ['LAB', 'DIS', 'LEC'])
                       ->get();
        return $theoryClass;
    }

    private static function getRealityClass($idLecturer, $semester, $year)
    {
        $realityClass = DB::table('classes')
                        ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                        ->where([
                            ['IdLecturer','=',$idLecturer],
                            ['Semester','=', $semester],
                            ['Year', '=', $year],   
                        ])
                        ->whereIn('TypeClass', ['PRJ', 'INT'])
                        ->get();
        return $realityClass;
    }

    private static function getGradesVol($idLecturer, $semester, $year)
    {
        $grades = DB::table('gradingexamvolume')
                    ->join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
                    ->where([
                        ['IdLecturer','=',$idLecturer],
                        ['Semester','=', $semester],
                        ['Year', '=', $year],
                        ['CategoryVolume', '=', 'Grading'],   
                    ])
                    ->get();
        return $grades;
    }

    private static function getExamsVol($idLecturer, $semester, $year)
    {
        $exams = DB::table('gradingexamvolume')
                    ->join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
                    ->where([
                        ['IdLecturer','=',$idLecturer],
                        ['Semester','=', $semester],
                        ['Year', '=', $year],
                        ['CategoryVolume', '=', 'Exam'],   
                    ])
                    ->get();
        return $exams;
    }

    private static function getOthersVol($idLecturer, $semester, $year)
    {
        $others = DB::table('totalvolume')
                ->where([
                    ['IdLecturer','=',$idLecturer],
                    ['Semester','=', $semester],
                    ['Year', '=', $year],  
                ])
                ->get();
        return $others;
    }

    public function getTotalDetail($idLecturer, $semester, $year)
    {
        $theoryClass = self::getTheoryClass($idLecturer, $semester, $year);
        $realityClass = self::getRealityClass($idLecturer, $semester, $year);
        $grades = self::getGradesVol($idLecturer, $semester, $year);
        $exams = self::getExamsVol($idLecturer, $semester, $year);
        $others = self::getOthersVol($idLecturer, $semester, $year);
        return response()->json([
            'theoryClass' => $theoryClass,
            'realityClass' => $realityClass,
            'grades' => $grades,
            'exams' => $exams,
            'others' => $others,
        ]);
    }
}
