<?php

use Illuminate\Support\Facades\Route;

use  App\Models\User;
use  App\Models\book;
use  App\Models\Message;
use  App\Models\Enfant;
use  App\Models\Activite;
use  App\Models\Donation;
use Illuminate\Http\Request;

use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\EnfantController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('books',BookController::class);

Route::resource('users',UserController::class);

Route::resource('enfants',EnfantController::class);

Route::resource('donations',DonationController::class);

Route::resource('activites',ActiviteController::class);

Route::resource('messages',MessageController::class);

Route::get('books', function () {
    return Book::all();
});

Route::get('users', function () {
    return User::all();
});

Route::get('enfants', function () {
    return Enfant::all();
});

Route::get('donations', function () {
    return Donation::all();
});

Route::get('activites', function () {
    return Activite::all();
});

Route::get('messages', function () {
    return Message::all();
});

/*Route::group(['namespace'=>'Api\Auth'], function () {
    Route::post('/login','AuthenticationController@login');
});


Route::get('employee', function () {
    return Employee::all();
});
*/

Route::any('add','UserController@add');
Route::any('update','UserController@update');
Route::any('delete','UserController@delete');
Route::any('show','UserController@show');


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/utilisateur/login',[UserController::class,"login"]);


Route::get('users', function () {
    return User::all();
});
