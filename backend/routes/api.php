<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SocialMediaPageController;
use App\Http\Controllers\WebsiteSettingController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->group(function(){
    
     Route::post('/save-register', [UserController::class, 'saveRegister']);
     Route::post('/login', [UserController::class, 'saveLogin']);
     Route::post('/forget-password', [UserController::class, 'forgetPassword']);

    //WEB SETTINGS
    Route::get('/show-website-settings', [WebsiteSettingController::class, 'showWebsiteSetting']);
    
    //SOCIAL MEDIA
    Route::get('/show-social-media', [SocialMediaPageController::class, 'showSocialMedia']);

     
});
    
Route::middleware(['auth:sanctum'])->group(function(){
    
    Route::patch('/update-website-settings', [WebsiteSettingController::class, 'updateWebsiteSetting']);
    Route::patch('/update-social-media', [SocialMediaPageController::class, 'updateSocialMedia']);
    Route::post('/logout', [UserController::class, 'logout']);


        //ADMIN
        //Route::post('/logout-admin', [AdminController::class, 'logoutAdmin']);
       
    });