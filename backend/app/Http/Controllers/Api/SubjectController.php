<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Subjects\AddSubjectRequest;
use App\Models\Classes;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use function PHPSTORM_META\map;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();
        return response()->json([
            'status'    => 200,
            'subjects'  => $subjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddSubjectRequest $request)
    {
        // $subject = new Subject;
        // $subject->Letter         = $request->input('letter');
        // $subject->Number         = $request->input('number');
        // $subject->SubjectName   = $request->input('subject_name');
        // $subject->Credit         = $request->input('credit');
        // $subject->Type           = $request->input('type');
        // $subject->created_at     = date('Y-m-d H:i:s');
        // $subject->save();
        // $subject = new Subject;
        // $subject->Letter         = $request->input('letter');
        // $subject->Number         = $request->input('number');
        // $subject->SubjectName    = $request->input('subject_name');
        // $subject->Credit         = $request->input('credit');
        // $subject->Type           = $request->input('type');
        // $subject->save();

        $messages  = [
            'letter.unique' => 'letter with this number is already taken!!',
        ];
        $validator = Validator::make($request->all(),[
            'letter' => [
                'required',
                'max:10',
                Rule::unique('subjects')->where(function($query) use ($request) {
                    return $query->where('Letter', $request->letter)
                                 ->where('Number', $request->number);
                }),
            ]
        ], $messages);

        if($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ]);
        }
        else {
            Subject::create([
                'Letter' => $request->letter ,
                'Number' => $request->number,
                'SubjectName' => $request->subject_name ,
                'Credit' => $request->credit,
                'Type' => $request->type,
            ]);
    
            return response()->json([
                'status'    => 201,
                'message'   => 'Subject Added Successfully!',
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
        $subject = Subject::find($id);
        return response()->json([
            'status'    => 200,
            'subject'   => $subject,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $subject = Subject::find($id);
        return response()->json([
            'status'    => 200,
            'subject'   => $subject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $subject                 = Subject::find($id);
        $subject->Letter         = $request->input('letter');
        $subject->Number         = $request->input('number');
        $subject->SubjectName    = $request->input('subject_name');
        $subject->Credit         = $request->input('credit');
        $subject->Type           = $request->input('type');
        //$subject->updated_at     = date('Y-m-d H:i:s');
        $subject->update();

        return response()->json([
            'status'    => 200,
            'message'   => 'Subject Updated Successfully!',
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
        $classes = Classes::where('IdSubject', '=', $id);
        $classes->delete();
        $subject = Subject::find($id);
        $subject->delete();
        return response()->json([
            'status'    => 204,
            'message'   => 'Subject Deleted Successfully!',
        ]);
    }

    public function getAllSubjectByLetter($letter)
    {
        $subjects = DB::table('subjects')
                    ->where('Letter','=',$letter)
                    ->get();
        return response()->json([
            'status' => 200,
            'subjects' => $subjects,
        ]);
    }

    //API cho ra đề thi và chấm bài thi
    public function getSubjectByLec($idLec, $semester, $year)
    {
        $subjects = DB::table('subjects')
                  ->select('subjects.IdSubject', 'Letter', 'Number', 'SubjectName')
                  ->leftJoin('classes', 'subjects.IdSubject', '=', 'classes.IdSubject')
                  ->where([
                    ['IdLecturer', '=', $idLec],
                    ['Semester', '=', $semester],
                    ['Year', '=', $year],
                  ])
                  ->distinct()
                  ->get();
        return response()->json([
            'status' => 200,
            'subjects' => $subjects,
        ]);
    }

}
