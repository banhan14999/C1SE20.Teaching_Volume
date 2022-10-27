<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        $subject = new Subject;
        $subject->Letter         = $request->input('letter');
        $subject->Number         = $request->input('number');
        $subject->SubjectName    = $request->input('subject_name');
        $subject->Credit         = $request->input('credit');
        $subject->Type           = $request->input('type');
        $subject->created_at     = date('Y-m-d H:i:s');
        $subject->save();

        return response()->json([
            'status'    => 201,
            'message'   => 'Subject Added Successfully!',
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
        $subject->updated_at     = date('Y-m-d H:i:s');
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
        $subject = Subject::find($id);
        $subject->delete();
        return response()->json([
            'status'    => 204,
            'message'   => 'Subject Deleted Successfully!',
        ]);
    }
}
