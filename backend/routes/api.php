<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\ClassController;
use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\YearController;
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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//Authentication
Route::controller(AuthController::class)->group(function(){
    Route::post('user/add','store');
    Route::post('login','login');
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('user','getUser');
        Route::post('logout','logout');
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
Route::middleware(['auth:sanctum'])->group(function(){
    //User controller
    Route::controller(UserController::class)->group(function () {
        Route::prefix('user')->group(function(){
            Route::get('all','index');
            Route::get('{id}','show');

            Route::put('update/{id}','update');
        });
    });

    //Subject Controller
    Route::controller(SubjectController::class)->group(function() {
        Route::prefix('subject')->group(function(){
            Route::get('all','index');
            Route::get('{id}','show');
            Route::get('letter/{letter}','getAllSubjectByLetter');

            Route::post('add','store');

            Route::put('update/{id}','update');

            Route::delete('delete/{id}','destroy');
        });
    });
    
    //Year COntroller
    Route::controller(YearController::class)->group(function() {
        Route::prefix('year')->group(function() {
            Route::get('all','index');
            Route::post('add','store');
            Route::delete('delete/{id}','destroy');
        });
    });

    Route::controller(ClassController::class)->group(function() {
        Route::prefix('class')->group(function() {

            Route::get('all','index');
            Route::get('lecturer/{id}','getAllClassByIdLecturer');
            Route::get('lecturerLab/{id}','getLabClassByLecturer'); // get all class Lab By Lecturer
            Route::get('lecturerNotLab/{id}','getNotLabClassByLecturer');// get all class not lab by lecturer
            Route::get('subjectNullLec/letter/{letter}/number/{number}','getAllClassBySubjectLetterNullLec'); //get all class by subject but not have lecturer         
            Route::get('{id}','show');
            
            Route::post('add','store');
            
            Route::put('update/{id}','update');
            Route::put('removeLecOutClass','removeLecOutOfClass');
            Route::put('addLecInClass','addLecIntoClass');

            Route::delete('delete/{id}','destroy');    
        });
    });
});


