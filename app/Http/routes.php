<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('oauth/access_token', function() {
   return Response::json(Authorizer::issueAccessToken());
});

Route::group(['before'=>'oauth'], function() {
    Route::resource('post', 'ApiController', ['except' => ['create', 'edit']]);
});

