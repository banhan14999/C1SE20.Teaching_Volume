<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Classes\AddClassRequest;
use App\Http\Requests\Classes\UpdateClassRequest;
use App\Models\Classes;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classes = DB::table('classes')
                  ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                  ->get();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    //use for add new and update class
    private static function getClassCoefficient($numberOfStudent)
    {
        if($numberOfStudent <= 61){
            $classCoefficient = 1;
        }elseif($numberOfStudent <= 76){
            $classCoefficient = 1.05;
        }elseif($numberOfStudent <= 91){
            $classCoefficient = 1.1;
        }elseif($numberOfStudent <= 106){
            $classCoefficient = 1.15;
        }elseif($numberOfStudent <= 121){
            $classCoefficient = 1.2;
        }elseif($numberOfStudent <= 141){
            $classCoefficient = 1.25;
        }elseif($numberOfStudent <= 161){
            $classCoefficient = 1.3;
        }elseif($numberOfStudent <= 181){
            $classCoefficient = 1.35;
        }else{
            $classCoefficient = 1.4; //Tạm thời
        }
        return $classCoefficient;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddClassRequest $request)
    {

        //check 
        $messages  = [
            'Grade.unique' => 'This class of subject all ready taken in this semester and year',
        ];
        $validator = Validator::make($request->all(),[
            'Grade' => [
                Rule::unique('classes')->where(function($query) use ($request) {
                    return $query->where('Year', $request->Year)
                                 ->where('Semester', $request->Semester)
                                 ->where('Grade', $request->Grade)
                                 ->where('IdSubject', $request->IdSubject);
                }),
            ]
        ], $messages);
        
        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->errors(),
            ]);
        }
        else {
            $idClass = $request->Year . $request->Semester . $request->IdSubject . $request->Grade;
            //Class coefficient
            $numberOfStudent = $request->NumberOfStudent;
            $classCoefficient = self::getClassCoefficient($numberOfStudent);
            // if($numberOfStudent <= 61){
            //     $classCoefficient = 1;
            // }elseif($numberOfStudent <= 76){
            //     $classCoefficient = 1.05;
            // }elseif($numberOfStudent <= 91){
            //     $classCoefficient = 1.1;
            // }elseif($numberOfStudent <= 106){
            //     $classCoefficient = 1.15;
            // }elseif($numberOfStudent <= 121){
            //     $classCoefficient = 1.2;
            // }elseif($numberOfStudent <= 141){
            //     $classCoefficient = 1.25;
            // }elseif($numberOfStudent <= 161){
            //     $classCoefficient = 1.3;
            // }elseif($numberOfStudent <= 181){
            //     $classCoefficient = 1.35;
            // }else{
            //     $classCoefficient = 1.4; //Tạm thời
            // }

            //Time_teaching
            if($request->Type === 'LAB' || $request->Type === 'PRJ' || $request->Type === 'INT'){
                $timeTeaching = 30 * $request->Credit;
            }else{
                $timeTeaching = 15 * $request->Credit;
            }

            Classes::create([
                'IdClass'            => $idClass,
                'Year'               => $request->Year,
                'Semester'           => $request->Semester,
                'Grade'              => $request->Grade,
                'IdSubject'          => $request->IdSubject,
                'TypeClass'          => $request->Type,
                'CreditClass'        => $request->Credit,
                'NumberOfStudent'    => $request->NumberOfStudent,
                'Coefficient'        => $classCoefficient,
                'SubjectCoefficient' => $request->SubjectCoefficient,
                'TimeTeaching'       => $timeTeaching,
                'Unit'               => $request->Unit,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'Class Created Successfully',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $class = Classes::find($id);
        return response()->json([
            'status' => 200,
            'class' => $class,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClassRequest $request, $id)
    {
        $class = Classes::find($id);
        //Class coefficient
        $numberOfStudent = $request->NumberOfStudent;
        $classCoefficient = self::getClassCoefficient($numberOfStudent);
        // if($numberOfStudent <= 61){
        //     $classCoefficient = 1;
        // }elseif($numberOfStudent <= 76){
        //     $classCoefficient = 1.05;
        // }elseif($numberOfStudent <= 91){
        //     $classCoefficient = 1.1;
        // }elseif($numberOfStudent <= 106){
        //     $classCoefficient = 1.15;
        // }elseif($numberOfStudent <= 121){
        //     $classCoefficient = 1.2;
        // }elseif($numberOfStudent <= 141){
        //     $classCoefficient = 1.25;
        // }elseif($numberOfStudent <= 161){
        //     $classCoefficient = 1.3;
        // }elseif($numberOfStudent <= 181){
        //     $classCoefficient = 1.35;
        // }else{
        //     $classCoefficient = 1.4; //Tạm thời
        // }

        //Time_teaching
        if($request->Type === 'LAB' || $request->Type === 'PRJ' || $request->Type === 'INT'){
            $timeTeaching = 30 * $request->Credit;
        }else{
            $timeTeaching = 15 * $request->Credit;
        }

        $class->Year               = $request->Year;
        $class->Semester           = $request->input("Semester");
        $class->Grade              = $request->input("Grade");
        $class->TypeClass          = $request->input("Type");
        $class->CreditClass        = $request->input("Credit");
        $class->NumberOfStudent    = $request->input("NumberOfStudent");
        $class->Coefficient        = $classCoefficient;
        $class->SubjectCoefficient = $request->input("SubjectCoefficient");
        $class->TimeTeaching       = $timeTeaching;
        $class->Unit               = $request->input("Unit");
        $class->update();

        return response()->json([
            'status' => 200,
            'message' => "Class Updated Successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $class = Classes::find($id);
        $class->delete();
        return response()->json([
            'status' => 200,
            'message'=> "Class Deleted Successfully",
        ]);
    }

    /**
     * Get all class have type such as: PRJ, INT ... by year and semester of lecturer
     * @param $idLecturer
     * @param $semester
     * @param $year
     * @return array[] classes
     */
    public function getRealityClassByLecturer($idLecturer, $semester, $year)
    {
        $classes = DB::table('classes')
                    ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                    ->where([
                        ['IdLecturer','=', $idLecturer],                       
                        ['Semester','=', $semester],
                        ['Year', '=', $year]    
                    ])
                    ->whereIn('TypeClass', ['PRJ', 'INT'])
                    ->get();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    /**
     * Get all class have type such as: LEC, DIS,  ... by year and semester of lecturer
     * @param $idLecturer
     * @param $semester
     * @param $year
     * @return array[] classes
     */
    public function getTheoryClassByLecturer($idLecturer, $semester, $year)
    {
        $classes = DB::table('classes')
                    ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                    ->where([
                        ['IdLecturer','=',$idLecturer],
                        ['Semester','=', $semester],
                        ['Year', '=', $year],   
                    ])
                    ->whereIn('TypeClass', ['LAB', 'DIS', 'LEC'])
                    ->get();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    /**
     * Get classes are teached by Lecturer in semeter year
     * Use for Division class in manage class
     * @param $idLecturer
     * @param $semester
     * @param $year
     * @return array[] classes
     */
    public function getAllClassByIdLecturer($idLecturer, $semester, $year)
    {
        $classes = DB::table('classes')
                   ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                   ->where([
                        ['IdLecturer', '=', $idLecturer],
                        ['Semester', '=', $semester],
                        ['Year', '=', $year]
                    ])
                   ->get();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    /**
     * Get classes are undivisioned in semeter year
     * Use for Division class in manage class
     * @param $letter : Letter in subject code
     * @param $number : number in subject code
     * @param $semester 
     * @param $year
     * @return array[] classes
     */
    public function getClassesBySubjectNullLec($idSubject, $semester, $year)
    {
        $classes = DB::table('classes')
                   ->join('subjects', 'classes.IdSubject', '=', 'subjects.IdSubject')
                   ->where([
                        ['classes.IdSubject', '=', $idSubject],
                        ['IdLecturer', '=', null],
                        ['Semester', '=', $semester],
                        ['Year', '=', $year],
                    ])
                   ->get();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    //Do division class
    private static function getTotalIfExists($idLecturer, $semester, $year)
    {
        $total = DB::table('totalvolume')
                 ->where([
                    ['IdLecturer', '=', $idLecturer],
                    ['Semester', '=', $semester],
                    ['Year', '=', $year],
                 ])
                 ->first();
        return $total;
    }


    private static function getClassForTotal($idClass)
    {
        $class = Classes::find($idClass);
        return $class;
    }

    private static function theoryVolume($class)
    {
        return round($class['Coefficient'] * $class['SubjectCoefficient'] * $class['TimeTeaching'],2);
    }
    
    private static function realityVolume($class)
    {
        return round($class['SubjectCoefficient'] * $class['NumberOfStudent']);
    }

    private static function removeLecOutOfClass($idClassesRemove)
    {
        //$idClasses = $request->data['IdClasses'];
        if(! empty($idClassesRemove)) {
            foreach($idClassesRemove as $idClass) {
                DB::table('classes')
                    ->where('IdClass', '=', $idClass)
                    ->update(['IdLecturer' => null]);
             }
        }    
        // return response()->json([
        //     'status' => 200,
        //     'message' => "Removed Lecturer Out Of Class Succesfully",
        // ]);
    }

    private static function addLecIntoClass($idLecturer, $idClassesAdd)
    {
        // $idLecturer = $request->data['IdLecturer'];
        // $idClasses = $request->data['IdClasses'];
        if(! empty($idClassesAdd)) {
            foreach($idClassesAdd as $idClass) {
                DB::table('classes')
                    ->where('IdClass', '=', $idClass)
                    ->update(['IdLecturer' => $idLecturer]);
            }
        }
        // return response()->json([
        //     'status' => 200,
        //     'message' => "Add Lecturer Into Class Successfully"
        // ]);
    }



    private static function updateVolumeAfterDivisionAgain($data)
    {
        $total = $data['theoryVol'] + $data['realityVol'] + $data['gradingVol']
               + $data['examVol'] + $data['examMonitorVol'] + $data['advisorVol']
               + $data['activitiesVol'] + $data['scientificVol'];
        DB::table('totalvolume')
            ->where([
                ['IdLecturer', '=', $data['idLec']],
                ['Semester', '=', $data['sem']],
                ['Year', '=', $data['year']],
            ])
            ->update([
                'TeachingVolume' => $data['theoryVol'],
                'ProjectVolume' => $data['realityVol'],
                'TotalVolume' => $total,
            ]);
        return $total;
    }

    public function doDivisionClasses(Request $request)
    {
        // dd($request);
        
        $idLecturer = $request->data['idLecturer'];
        $idClassesAdd = $request->data['idClassAdd'];
        $idClassesRemove = $request->data['idClassRemove'];
        self::removeLecOutOfClass($idClassesRemove);
        self::addLecIntoClass($idLecturer, $idClassesAdd);

        //update total volume if exists
        $year = $request->data['year'];
        $semester = $request->data['semester'];
        //return (self::checkExistTotalForm($idLecturer, $semester, $year));
        $total = self::getTotalIfExists($idLecturer, $semester, $year);
        if($total !== null) {
            //
            $theoryVol = 0; 
            $realityVol = 0;
            if(! empty($idClassesAdd)) {
                foreach($idClassesAdd as $idClass) {
                    $class = self::getClassForTotal($idClass);
                    if($class['TypeClass'] === 'PRJ' || $class['TypeClass'] === 'INT') {
                        $realityVol += self::realityVolume($class);
                    }
                    else {
                        $theoryVol += self::theoryVolume($class);
                    }
                }
            }
            //encapsulation
            $data = [
                'idLec' => $idLecturer,
                'sem' => $semester,
                'year' => $year,
                'theoryVol' => $theoryVol,
                'realityVol' => $realityVol,
                'gradingVol' => $total->GradingVolume,
                'examVol' => $total->ExamVolume,
                'activitiesVol' => $total->ActivitiesVolume,
                'examMonitorVol' => $total->ExamMonitorVolume,
                'advisorVol' => $total->AdvisorVolume,
                'scientificVol' => $total->TimeScientificVolume,
            ];
            self::updateVolumeAfterDivisionAgain($data);
        }

        return response()->json([
            'status' => 200,
            'message' => "Updated Successfully",
        ]);
    }

    public function loadBeforeDivisionClasses()
    {        
        $subjects = Subject::all();
        $idFaculty = auth()->user()['IdFaculty'];
        $idDepartment = auth()->user()['IdDepartment'];
        $lecturers = UserController::getLecturerByDepartmentAndFaculty($idFaculty, $idDepartment);
        return response()->json([
            'status' => 200,
            'subjects' => $subjects,
            'lecturers' => $lecturers,
        ]);
    }
}
