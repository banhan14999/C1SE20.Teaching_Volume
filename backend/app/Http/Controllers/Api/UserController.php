<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Classes;
use App\Models\TokenUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$headers = apache_request_headers();
        // $token = $request->header('token');
        // $checkTokenIsValid = TokenUser::where('token', $token)->first();
        // //dd($token);
        // if(empty($token)) {
        //     return response()->json([
        //         'code' => 401,
        //         'message' => "Login before do this action",
        //     ],401);
        // }
        // elseif(empty($checkTokenIsValid)){
        //     return response()->json([
        //         'code' => 401,
        //         'message' => 'invalid token',
        //     ],401);
        // }
        // else{
            $users = User::all();
            return response()->json([
                'status' => 200,
                'users'  => $users,
            ],200);
        //}
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        // //$headers = apache_request_headers();
        // $token = $request->header('token');
        // $checkTokenIsValid = TokenUser::where('token', $token)->first();
        // //dd($token);
        // if(empty($token)) {
        //     return response()->json([
        //         'code' => 401,
        //         'message' => "Login before do this action",
        //     ],401);
        // }
        // elseif(empty($checkTokenIsValid)){
        //     return response()->json([
        //         'code' => 401,
        //         'message' => 'invalid token',
        //     ],401);
        // }
        // else{
            $user = User::find($id);
            return response()->json([
                'status' => 200,
                'user'   => $user,
            ]);
        //}
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        // $user = User::find($id);
        // //$user->IdLecturer   = $request->input('idlecturer');
        // $user->FirstName    = $request->input('firstname');
        // $user->LastName     = $request->input('lastname');
        // $user->IdFaculty    = $request->input('idfaculty');
        // $user->IdDepartment = $request->input('iddepartment');
        // $user->IdRole       = $request->input('idrole');
        // $user->update();
        $messages  = [
            'idLecturer.unique' => 'The idLecturer is already taken!!',
        ];
        $validator = Validator::make($request->all(),[
            'idLecturer' => [
                Rule::unique('users', 'IdLecturer')->ignore($id, 'id'),
            ]
        ], $messages);

        if($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
            ]);
        }
        else {
            User::where('id', '=', $id)
            ->update([
                'IdLecturer'   => $request->input('idlecturer'),
                'FirstName'    => $request->input('firstname'),
                'LastName'     => $request->input('lastname'),
                'IdFaculty'    => $request->input('idfaculty'),
                'IdDepartment' => $request->input('iddepartment'),
                'IdRole'       => $request->input('idrole'),
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Updated successfully',
            ]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Classes::where('IdLecturer', '=', $id)->update(['IdLecturer' => null]);
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'status'    => 204,
            'message'   => 'User Deleted Successfully!',
        ]);
    }

    public function getLecturerByDepartmentAndFaculty($idFaculty, $idDepartment)
    {
        $lecturers = DB::table('users')
                        ->where([
                            ['IdFaculty', '=', $idFaculty],
                            ['IdDepartment', '=', $idDepartment]
                        ])
                        ->get();
        //$user = auth()->user();
        return response()->json([
            'status' => 200,
            'lecturers' => $lecturers,
        ]);
    }
}
