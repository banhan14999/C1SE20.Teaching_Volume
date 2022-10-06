<?php

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


Route::get('subjects',[SubjectController::class,'index']);
Route::post('/add-subject',[SubjectController::class,'store']);
Route::get('/subject/{id}',[SubjectController::class,'show']);
Route::get('/edit-subject/{id}',[SubjectController::class,'edit']);
Route::put('/update-subject/{id}',[SubjectController::class,'update']);
Route::delete('/delete-subject/{id}',[SubjectController::class,'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
