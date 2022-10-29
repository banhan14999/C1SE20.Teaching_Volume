<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Classes\AddClassRequest;
use App\Http\Requests\Classes\UpdateClassRequest;
use App\Models\Classes;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $classes = Classes::all();
        return response()->json([
            'status' => 200,
            'classes' => $classes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddClassRequest $request)
    {
        $idClass = $request->Year . $request->Semester . $request->IdSubject . $request->Grade;
        //Class coefficient
        $numberOfStudent = $request->NumberOfStudent;
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

        //Time_teaching
        if($request->Type === 'LAB'){
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
            'Type'               => $request->Type,
            'Credit'             => $request->Credit,
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

        //Time_teaching
        if($request->Type === 'LAB'){
            $timeTeaching = 30 * $request->Credit;
        }else{
            $timeTeaching = 15 * $request->Credit;
        }

        $class->Year              = $request->Year;
        $class->Semester           = $request->input("Semester");
        $class->Grade              = $request->input("Grade");
        $class->Type               = $request->input("Type");
        $class->Credit             = $request->input("Credit");
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

    //Update all classes in column IdLecturer
    public function updateLecturerForClass(Request $request)
    {

    }
}
