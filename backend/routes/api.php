<?php

use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\API\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//Subjects
Route::get('subject/all',[SubjectController::class,'index']);
Route::post('subject/add',[SubjectController::class,'store']);
Route::get('subject/{id}',[SubjectController::class,'show']);
Route::get('subject/edit/{id}',[SubjectController::class,'edit']);
Route::put('subject/update/{id}',[SubjectController::class,'update']);
Route::delete('subject/delete/{id}',[SubjectController::class,'destroy']);

//Lecturers
Route::get('user/all',[LecturerController::class,'index']);


//Role
//Route::get('role',[RoleController::class,'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
