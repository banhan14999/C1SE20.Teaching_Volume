<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use App\Models\GradingExam;
use Illuminate\Http\Request;
use App\Models\Total;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class VolumeController extends Controller
{
    //get all total volume by Dean
    public function getAllTotalByDean($semester, $year)
    {
        $faculty = auth()->user()['IdFaculty'];
        $totalVols  = Total::join('users', 'totalvolume.IdLecturer', '=', 'users.IdLecturer')
                      ->where([
                          ['IdFaculty', '=', $faculty],
                          ['Semester', '=', $semester],
                          ['Year', '=', $year],
                          ['Status', '=', 'Approved'],
                      ])
                      ->get();
        if($totalVols->isEmpty()) $totalVols = [];
        return response()->json([
            'status' => 200,
            'totalVols' => $totalVols,
        ]);
    }
    
    //get full volume by dean
    public function getAllSemTotalByDean($year)
    {
        $faculty = auth()->user()['IdFaculty'];
        $totalVols  = DB::table('totalvolume', 'temp')
        ->join('users', 'temp.IdLecturer', '=', 'users.IdLecturer')
        ->where([
            ['IdFaculty', '=', $faculty],
            ['Year', '=', $year],
            ['Status', '=', 'Approved'],
        ])
        ->whereRaw("Exists (
            SELECT IdLecturer from totalvolume WHERE Semester = '1' AND IdLecturer = temp.IdLecturer
            INTERSECT
            SELECT IdLecturer from totalvolume WHERE Semester = '2' ANd IdLecturer = temp.IdLecturer
            INTERSECT
            SELECT IdLecturer from totalvolume WHERE Semester = 'Hè' And IdLecturer = temp.IdLecturer
        )")
        ->orderBy('temp.IdLecturer')
        ->get();

        if(! $totalVols->isEmpty()) {
            return response()->json([
                'status' => 200,
                'totalVols' => $totalVols,
            ]);
        }
        else {
            return response()->json([
                'status' => false,
                'totalVols' => [],
            ]);
        }
    }

    //get all total volume by head
    public function getAllTotalByHead($semester, $year)
    {
        //$idLecturer = auth()->user()['IdLecturer'];
        $department = auth()->user()['IdDepartment'];
        $faculty    = auth()->user()['IdFaculty'];
        $totalVols  = Total::join('users', 'totalvolume.IdLecturer', '=', 'users.IdLecturer')
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
    //kiểm tra xem nếu đã làm rồi thì xuất ra bảng tổng - nếu chưa thì hiện form
    public function checkExist($semester, $year)
    {
        $idLecturer = auth()->user()['IdLecturer'];
        $totalVolume = Total::where([
                            ['IdLecturer', '=', $idLecturer],
                            ['Year', '=', $year],
                            ['Semester', '=', $semester],
                       ])
                       ->get();
        //$totalVolume : Collection
        if($totalVolume->isEmpty()){
            return response()->json([
                'status' => false,
                'totalVolume' => [],
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
                $teachingVol += round($teach['classCoefficient'] * $teach['subjectCoefficient'] * $teach['timeTeaching'], 2); 
            }
        }
        return $teachingVol;
    }

    private static function totalProjectVol($projects)
    {
        $projectVol = 0.00;
        if(! empty($projects)) {
            foreach($projects as $project) {
                $projectVol += round($project['subjectCoefficient'] * $project['numberOfStudent'], 2);
            }
        }
        return $projectVol;
    }

    private static function totalGradeVol($grading)
    {
        $gradingVol = 0.00;
        if(! empty($grading)) {
            foreach($grading as $grade) {
                $gradingVol += round($grade['coefficientGrade'] * $grade['numberGE']);
            }
        }
        return $gradingVol;
    }

    private static function totalExamVol($exams)
    {
        $examVol = 0.00;
        if(! empty($exams)) {
            foreach($exams as $exam) {
                $examVol += round($exam['coefficientExam'] * $exam['numberGE'], 2);
            }
        }
        return $examVol;
    }

    public function approvalVolume($idLecturer, $semester, $year)
    {
        Total::where([
                        ['IdLecturer', '=', $idLecturer],
                        ['Semester', '=', $semester],
                        ['Year', '=', $year],
                    ])
                    ->update(['Status' => 'Approved']);
        return response()->json([
            'status' => 200,
            'message' => 'Approved Successfully',
        ]);
    }

    public function declineVolume($idLecturer, $semester, $year)
    {
        Total::where([
            ['IdLecturer', '=', $idLecturer],
            ['Semester', '=', $semester],
            ['Year', '=', $year],
        ])
        ->update(['Status' => 'Decline']);
        return response()->json([
            'status' => 200,
            'message' => 'Decline successfully',
        ]);
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
        $project = $request->data['project'];
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


    private static function getTheoryClass($idLecturer, $semester, $year)
    {
        $theoryClass = Classes::join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
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
        $realityClass = Classes::join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
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
        $grades = GradingExam::join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
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
        $exams = GradingExam::join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
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
        $others = Total::where([
                    ['IdLecturer','=',$idLecturer],
                    ['Semester','=', $semester],
                    ['Year', '=', $year],  
                ])
                ->get();
        return $others;
    }

    //Lấy thông tin chi tiết của giảng viên (detail)
    private static function getLecInfor($idLecturer)
    {
        $lecturer = User::where('IdLecturer', '=', $idLecturer)
                    ->first();
        return $lecturer;
    }
    public function getTotalDetail($idLecturer, $semester, $year)
    {
        $lecturer = self::getLecInfor($idLecturer); 
        $theoryClass = self::getTheoryClass($idLecturer, $semester, $year);
        $realityClass = self::getRealityClass($idLecturer, $semester, $year);
        $grades = self::getGradesVol($idLecturer, $semester, $year);
        $exams = self::getExamsVol($idLecturer, $semester, $year);
        $others = self::getOthersVol($idLecturer, $semester, $year);
        return response()->json([
            'lecturer' => $lecturer,
            'theoryClass' => $theoryClass,
            'realityClass' => $realityClass,
            'grades' => $grades,
            'exams' => $exams,
            'others' => $others,
        ]);
    }



    private static function deleteGEForUpdate($idLecturer, $semester, $year)
    {
        GradingExam::where([
                ['IdLecturer', '=', $idLecturer],
                ['Semester', '=', $semester],
                ['Year', '=', $year],
            ])
            ->delete();
    }

    //Update

    private static function updateTotalVolume($data)
    {
        $TotalVolume = $data['teachingVol'] + $data['projectVol']    + $data['gradingVol']
                    + $data['examVol']     + $data['activitiesVol'] + $data['examMonitorVol']
                    + $data['advisorVol']  + $data['timeScientific'];
        Total::where([
                ['IdLecturer', '=', $data['idLecturer']],
                ['Semester', '=', $data['semester']],
                ['Year', '=', $data['year']],
        ])
        ->update([
            'TeachingVolume' => $data['teachingVol'],
            'ProjectVolume' => $data['projectVol'],
            'GradingVolume' => $data['gradingVol'],
            'ExamVolume' => $data['examVol'],
            'ActivitiesVolume' => $data['activitiesVol'],
            'ExamMonitorVolume' => $data['examMonitorVol'],
            'AdvisorVolume' => $data['advisorVol'],
            'TimeScientificVolume' => $data['timeScientific'],
            'TotalVolume' => $TotalVolume,
            'Status' => 'Waiting',
        ]);
        // $total->Status = "Waiting";
        // $total->save();
    }

    public function handleUpdateTotalRequest(Request $request)
    {
        $idLecturer = $request->data['idLecturer'];
        $semester = $request->data['semester'];
        $year = $request->data['year'];
        self::deleteGEForUpdate($idLecturer, $semester, $year);
        $teaching = $request->data['teaching'];
        $project = $request->data['project'];
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

        self::updateTotalVolume($totalVol);
        self::storeGradeExam($gradeExam);

        return response()->json([
            'status' => 200,
            'message' => 'Updated Successfully',
        ]);
    }

    //Lấy ra tổng khối lượng 2 kỳ cho trưởng khoa
    private static function getVolumeData($year, $sem, $status)
    {
        $data = Total::select('IdLecturer')
        ->where([
            ['Year', '=', $year],
            ['Semester', '=', $sem],
            ['Status', '=', $status],
        ])
        ->get();
        return $data;
    }

    //chuyển collection object array -> collection array
    private static function convertColObjToArray($collection)
    {
        $array = collect([]);
        $collection->each(function ($item, $key) use (&$array) {
            return $array->push($item['IdLecturer']);
        });
        return $array;
    }

    //intersect các dl suy ra dữ liệu tồn tại
    private static function intersect($year)
    {
        $status = 'Approved';
        $yearSum = $year - 1;
        //get ra collection object
        $idLec1 = self::getVolumeData($year, '1', $status);
        $idLec2 = self::getVolumeData($year, '2', $status);
        $idLecSum = self::getVolumeData($yearSum, 'Hè', $status);
        
        //chuyển về collection array
        $idLec1 = self::convertColObjToArray($idLec1);
        $idLec2 = self::convertColObjToArray($idLec2);
        $idLecSum = self::convertColObjToArray($idLecSum);

        $intersect = $idLec1->intersect($idLec2->intersect($idLecSum));

        return $intersect->toArray();
    }

    //Thực hiện query
    public function dashboardForAll($year)
    {
        $lecIn = self::intersect($year);
        $faculty = auth()->user()['IdFaculty'];
        $totalVols = Total::join('users', 'totalvolume.IdLecturer', '=', 'users.IdLecturer')
                    ->where([
                        ['IdFaculty', '=', $faculty],
                        ['Year', '=', $year],
                    ])
                    ->whereIn('Semester', ['1', '2'])
                    ->whereIn('totalvolume.IdLecturer', $lecIn)
                    ->orWhere([
                        ['Year', '=', $year-1],
                        ['Semester', '=', 'Hè']
                    ])
                    ->orderBy('totalvolume.IdLecturer')
                    ->orderBy('Year', 'DESC')
                    ->orderBy('Semester')
                    ->get();
        //biến thành array theo từng gianrg vieen
        $totalVols = $totalVols->split($totalVols->count()/3);
        if(! $totalVols->isEmpty()) {
            return response()->json([
                'status' => 200,
                'totalVols' => $totalVols,
            ]);
        }
        else {
            return response()->json([
                'status' => false,
                'totalVols' => [],
            ]);
        }
    }



    ////////////////////////////////////////////////////////////////////////////////////
    /////////////////          Individual Print                 ////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    public static function getIndividualInformation($idLecturer)
    {
        $info = User::select([
                    'IdLecturer', 
                    'FirstName', 
                    'LastName', 
                    'IdFaculty', 
                    'IdDepartment', 
                    'IdRole'
                ])
                ->where('IdLecturer', '=', $idLecturer)
                ->first();

        switch($info['IdRole']) {
            case 1 : $info['IdRole'] = 'admin'; break;
            case 2 : $info['IdRole'] = 'TRƯỞNG KHOA'; break;
            case 3 : $info['IdRole'] = 'TRƯỞNG BỘ MÔN'; break;
            case 4 : $info['IdRole'] = 'GIẢNG VIÊN'; break;
        }

        if($info['IdFaculty'] == "CMU-SE") $info['IdFaculty'] = "KHOA CNPM VIỆT MỸ (CMU)";
        return $info;
    }

    public static function getIndividualTheoryVol($idLecturer, $year)
    {
        
        $theoryVol = Classes::select([
                        'Letter',
                        'Number',
                        'SubjectName',
                        'Grade',
                        'TypeClass',
                        'Semester',
                        'NumberOfStudent',
                        'Coefficient',
                        'SubjectCoefficient',
                        'TimeTeaching',
                    ])
                    ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                    ->where([
                        ['Year', '=', $year],
                        ['IdLecturer', '=', $idLecturer],
                    ])
                    ->whereIn('TypeClass', ['LAB', 'DIS', 'LEC'])
                    ->whereIn('Semester', ['1', '2'])
                    ->orWhere([
                        ['Year', '=', $year-1],
                        ['Semester', '=', 'Hè']
                    ])
                    ->orderBy('Year', 'DESC')
                    ->orderBy('Semester')
                    ->get();
        return $theoryVol;
    }

    public static function getIndividualRealityVol($idLecturer, $year)
    {
        $realityVol = Classes::select([
            'Letter',
            'Number',
            'SubjectName',
            'Grade',
            'TypeClass',
            'Semester',
            'NumberOfStudent',
            'Coefficient',
            'SubjectCoefficient',
            'TimeTeaching',
        ])
        ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
        ->where([
            ['Year', '=', $year],
            ['IdLecturer', '=', $idLecturer],
        ])
        ->whereIn('TypeClass', ['PRJ', 'INT'])
        ->whereIn('Semester', ['1', '2'])
        ->orWhere([
            ['Year', '=', $year-1],
            ['Semester', '=', 'Hè']
        ])
        ->orderBy('Year', 'DESC')
        ->orderBy('Semester')
        ->get();

        return $realityVol;
    }

    public static function getIndividualGradeVol($idLecturer, $year)
    {
        $gradeVol = GradingExam::select([
            'Letter',
            'Number',
            'SubjectName',
            //'TypeClass',
            'Semester',
            'Time',
            'Unit',
            'NumberGE',
            'CoefficientGradeExam',
        ])
        ->join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
        ->where([
            ['Year', '=', $year],
            ['IdLecturer', '=', $idLecturer],
            ['CategoryVolume', '=', 'Grading'],
        ])
        ->whereIn('Semester', ['1', '2'])
        ->orWhere([
            ['Year', '=', $year-1],
            ['Semester', '=', 'Hè']
        ])
        ->orderBy('Year', 'DESC')
        ->orderBy('Semester')
        ->get();

        return $gradeVol;
    }

    public static function getIndividualExamVol($idLecturer, $year)
    {
        $examVol = GradingExam::select([
            'Letter',
            'Number',
            'SubjectName',
            //'TypeClass',
            'Semester',
            'Time',
            'Unit',
            'NumberGE',
            'CoefficientGradeExam',
        ])
        ->join('subjects', 'gradingexamvolume.IdSubject', '=', 'subjects.IdSubject')
        ->where([
            ['Year', '=', $year],
            ['IdLecturer', '=', $idLecturer],
            ['CategoryVolume', '=', 'Exam'],
        ])
        ->whereIn('Semester', ['1', '2'])
        ->orWhere([
            ['Year', '=', $year-1],
            ['Semester', '=', 'Hè']
        ])
        ->orderBy('Year', 'DESC')
        ->orderBy('Semester')
        ->get();

        return $examVol;
    }

    public static function getOtherVol($idLecturer, $year, $type)
    {
        $otherVol = Total::select([
            'Year',
            $type,
            'Semester',
        ])
        ->where([
            ['IdLecturer', '=', $idLecturer],
            ['Year', '=', $year],
        ])
        ->whereIn('Semester', ['1', '2'])
        ->orWhere([
            ['Year', '=', $year-1],
            ['Semester', '=', 'Hè']
        ])
        ->orderBy('Year', 'DESC')
        ->orderBy('Semester')
        ->distinct()
        ->get();

        return $otherVol;
    }

    public static function getIndividualOtherVol($idLecturer, $year)
    {
       $examMonitorVol = self::getOtherVol($idLecturer, $year, 'ExamMonitorVolume');
       $activitiesVol  = self::getOtherVol($idLecturer, $year, 'ActivitiesVolume');
       $advisorVol     = self::getOtherVol($idLecturer, $year, 'AdvisorVolume');
       $timeScientific = self::getOtherVol($idLecturer, $year, 'TimeScientificVolume');
       
       return [
         'examMonitorVol' => $examMonitorVol,
         'activitiesVol' => $activitiesVol,
         'advisorVol' => $advisorVol,
         'timeScientific' => $timeScientific,
       ];
    }

    public function getIndividualAllVol($idLecturer, $year)
    {

        $info = self::getIndividualInformation($idLecturer);
        $theoryVol = self::getIndividualTheoryVol($idLecturer, $year);
        $realityVol = self::getIndividualTheoryVol($idLecturer, $year);
        $examVol = self::getIndividualExamVol($idLecturer, $year);
        $gradeVol = self::getIndividualGradeVol($idLecturer, $year);
        $otherVol = self::getIndividualOtherVol($idLecturer, $year);
        
        //return $otherVol['examMonitorVol'];

        return response()->json([
            'info'      => $info,
            'theoryVol' => $theoryVol,
            'relityVol' => $realityVol,
            'gradeVol'  => $gradeVol,
            'examVol'   => $examVol,
            'examMonitorVol' => $otherVol['examMonitorVol'],
            'activitiesVol' => $otherVol['activitiesVol'],
            'advisorVol' => $otherVol['advisorVol'],
            'timeScientific' => $otherVol['timeScientific'],
        ]);
    } 
}
