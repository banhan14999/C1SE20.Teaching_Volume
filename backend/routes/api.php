<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Models\Lecturer;
use App\Models\User;
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
// Route::get('subject/all',[SubjectController::class,'index']);
// Route::post('subject/add',[SubjectController::class,'store']);
// Route::get('subject/{id}',[SubjectController::class,'show']);
// Route::get('subject/edit/{id}',[SubjectController::class,'edit']);
// Route::put('subject/update/{id}',[SubjectController::class,'update']);
// Route::delete('subject/delete/{id}',[SubjectController::class,'destroy']);



// Route::group([
//         'prefix' => 'subject', 
//         'controller'=>'SubjectController::class'
//     ], function() {
//     Route::controller(SubjectController::class)->group(function(){
//         Route::get('all','index');
//         Route::post('add','store');
//         Route::get('{id}','show');
//         Route::get('edit/{id}','edit');
//         Route::put('update/{id}','update');
//         Route::delete('delete/{id}','destroy');
//     });
// });
//Lecturers
//Route::get('user/all',[LecturerController::class,'index']);
// Route::group(['prefix' => 'user'], function() {
//     Route::get('all',[LecturerController::class,'index']);
//     Route::post('add',[LecturerController::class,'store']);
//     Route::get('edit/{id}',[LecturerController::class,'edit']);
//     Route::put('update/{id}',[LecturerController::class,'update']);
//     Route::delete('delete/{id}',[LecturerController::class,'destroy']);
// });
// Route::group(['prefix' => 'user'], function() {
//     Route::get('all',[UserController::class,'index']);
// });


//Role
//Route::get('role',[RoleController::class,'index']);
Route::group(['prefix' => 'role'], function() {
    Route::get('all',[RoleController::class,'index']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentication
Route::controller(AuthController::class)->group(function(){
    Route::post('user/add','store');
    Route::post('login','login');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('logout','logout');
    });
});

//User controller
Route::controller(UserController::class)->group(function () {
    Route::prefix('user')->group(function(){
        Route::get('all','index');
        Route::get('{id}','show');
    });
});

//SUbject controller
// Route::group(['prefix' => 'subject'], function() {
//     Route::get('all',[SubjectController::class,'index']);
//     Route::post('add',[SubjectController::class,'store']);
//     Route::get('{id}',[SubjectController::class,'show']);
//     Route::get('edit/{id}',[SubjectController::class,'edit']);
//     Route::put('update/{id}',[SubjectController::class,'update']);
//     Route::delete('delete/{id}',[SubjectController::class,'destroy']);
// });
Route::controller(SubjectController::class)->group(function() {
    Route::prefix('subject')->group(function(){
        Route::get('all','index');
        Route::get('{id}','show');
        Route::post('add','store');
        Route::put('update/{id}','update');
        Route::delete('delete/{id}','destroy');
    });
});