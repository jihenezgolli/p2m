<?php

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
 //   return $request->user();
//});
Route::resource('user', 'App\Http\Controllers\UserController');
Route::post('login', 'App\Http\Controllers\UserController@login');
Route::post('register', [App\Http\Controllers\UserController::class,"register"]);
Route::resource('category', 'App\Http\Controllers\CategoryController');
Route::resource('product', 'App\Http\Controllers\ProductController');
Route::resource('order', 'App\Http\Controllers\OrderController');
Route::resource('orderDetail', 'App\Http\Controllers\OrderDetailController');
