<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function store(AuthRequest $request)
    {
    //    $validator = Validator::make($request->all(),[
    //     'username'=>'required|max:100|unique:users,Username',
    //     'password'=>'required|min:8',
    //     'idlecturer'=>'required|unique:users,IdLecturer',
    //     'firstname'=>'required',
    //     'lastname'=>'required',
    //    ]);

    //    if($validator->fails())
    //    {
    //        return response()->json([
    //           'validation_errors' => $validator->messages(),
    //        ]);
    //    }
    //    else
        //{
            $user = User::create([
                'Username' => $request->username,
                'Password' => bcrypt($request->password),
                'IdLecturer' => $request->idlecturer,
                'FirstName' => $request->firstname,
                'LastName' => $request->lastname,
                'IdFaculty' => $request->idfaculty,
                'IdDepartment' => $request->iddepartment,
                'IdRole' => $request->idrole
            ]);

            //$token = $user->createToken($user->Username.'_Token')->plainTextToken;

            return response([
                'status' => 200,
                //'username' => $user->FirstName . ' ' . $user->LastName,
                //'token' => $token,
                'message' => 'Created User Successfully',
            ]);
       //}
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('Username',$request->username)->first();
        if(! $user || ! Hash::check($request->password, $user->Password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid username or password'
            ]);
        }
        else {
            if($user->IdRole == 1) // 1: Admin
            {
                $role = 'Admin';
                $token = $user->createToken($user->Username.'_AdminToken')->plainTextToken;
            }
            elseif($user->IdRole == 2) //2: Dean
            {
                $role = 'Dean';
                $token = $user->createToken($user->Username.'_DeanToken')->plainTextToken;
            }
            elseif($user->IdRole == 3) //3: Head
            {
                $role = 'Head';
                $token = $user->createToken($user->Username.'_HeadToken')->plainTextToken;

            }
            else // 4: Lecturer
            {
                $role = 'Lecturer';
                $token = $user->createToken($user->Username.'_Token')->plainTextToken;

            }
            return response([
                'status' => 200,
                //'id' => $user->id,
                //'username' => $user->FirstName . ' ' . $user->LastName,
                'user' => $user,
                'token' => $token,
                'role' => $role,
                'message' => 'Logged In Successfully',
            ]);
        }
    }

    public function logout() 
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully', 
        ]);
    }
}