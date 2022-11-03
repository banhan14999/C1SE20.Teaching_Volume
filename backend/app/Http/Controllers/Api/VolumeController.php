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

    private static function totalTeachVol($classCoefficient, $subjectCoefficient, $timeTeaching)
    {
        
    }

    private static function totalProjectVol($projectCoefficient, $numberOfStudent)
    {
        
    }

    private static function totalGradeVol($gradeCoefficient, $numberOfGrade)
    {
        
    }

    private static function totalExamVol($examCoefficient, $numberOfExam)
    {
        
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

    public function store(Request $request)
    {

    }

}
