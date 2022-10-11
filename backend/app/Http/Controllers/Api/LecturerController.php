<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lecturer;
use App\Models\Role;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$role = Role::all();
        $lecturers = Lecturer::all();
        foreach($lecturers as $lecturer) {
            $lecturer['IdRole'] = Role::find($lecturer['IdRole'])['RoleName'];
        }
        return response()->json([
            'status'    => 200,
            'lecturers' => $lecturers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $lecturer = new Lecturer;
        $lecturer->Username     = $request->input('username');
        $lecturer->Password     = $request->input('password');
        $lecturer->IdLecturer   = $request->input('idlecturer');
        $lecturer->FirstName    = $request->input('firstname');
        $lecturer->LastName     = $request->input('lastname');
        $lecturer->IdFaculty    = $request->input('faculty');
        $lecturer->IdDepartment = $request->input('department');
        $lecturer->IdRole       = $request->input('role');
        $lecturer->created_at   = date('Y-m-d H:i:s');
        $lecturer->save();

        return response()->json([
            'status'    => 201,
            'message'   => 'User Added Successfully!',
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $lecturer  = Lecturer::find($id);
        return response()->json([
            'status'    => 200,
            'lecturer'   => $lecturer,
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
        $lecturer               = Lecturer::find($id);
        //$lecturer->Username     = $request->input('username');
        $lecturer->Password     = $request->input('password');
        $lecturer->IdLecturer   = $request->input('idlecturer');
        $lecturer->FirstName    = $request->input('firstname');
        $lecturer->LastName     = $request->input('lastname');
        $lecturer->IdFaculty    = $request->input('faculty');
        $lecturer->IdDepartment = $request->input('department');
        $lecturer->IdRole       = $request->input('role');
        $lecturer->updated_at   = date('Y-m-d H:i:s');
        $lecturer->save();

        return response()->json([
            'status'    => 200,
            'message'   => 'User Updated Successfully!',
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
        $lecturer  = Lecturer::find($id);
        $lecturer->delete();
        return response()->json([
            'status'    => 204,
            'message'   => 'User Deleted Successfully!',
        ]);
    }
}
