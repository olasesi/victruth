<?php
// use App\Http\Controllers\MockController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WebsiteSettingController;
use App\Http\Controllers\CategorySectionController;
use App\Http\Controllers\SocialMediaPageController;
use App\Http\Controllers\AppearanceController;


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


Route::middleware('api')->group(function () {

    Route::post('/save-register', [UserController::class, 'saveRegister']);
    Route::post('/login', [UserController::class, 'saveLogin']);
    Route::post('/forget-password', [UserController::class, 'forgetPassword']);

    //WEB SETTINGS
    Route::get('/show-website-settings', [WebsiteSettingController::class, 'showWebsiteSetting']);

    //SOCIAL MEDIA
    Route::get('/show-social-media', [SocialMediaPageController::class, 'showSocialMedia']);

    //CATEGORY SECTION
    Route::get('/show-category-section', [CategorySectionController::class, 'showCategorySection']);

    //customers
    Route::post('/customer-login', [CustomerController::class, 'saveCustomerLogin']);
    Route::post('/customer-save-register', [CustomerController::class, 'saveCustomerRegister']);

    //register
    Route::post('/register', [CustomerController::class, 'register']);
    
    //appearance
    Route::get('/show-appearance', [AppearanceController::class, 'showAppearance']);
    
    // show   
    Route::get('/show-vendors', [UserController::class, 'showVendors']);

    // show unconfirmed 
    Route::get('/show-vendors-unconfirmed', [UserController::class, 'showUnconfirmedVendors']);

     // show orders 
     Route::get('/show-orders', [OrderController::class, 'showOrders']);

    
    
});



// Route::prefix('mock')->group(function () {
//     Route::get('endpoint',  [MockController::class, 'mockResponse']);
//     // Add more mock routes as needed
// });



Route::middleware(['auth:sanctum'])->group(function () {

    Route::patch('/update-website-settings', [WebsiteSettingController::class, 'updateWebsiteSetting']);
    Route::patch('/update-social-media', [SocialMediaPageController::class, 'updateSocialMedia']);
    Route::post('/logout', [UserController::class, 'logout']);
    //ADMIN
    //Route::post('/logout-admin', [AdminController::class, 'logoutAdmin']);

    //logout
    Route::post('/customer-logout', [CustomerController::class, 'customerLogout']);
   //Make payment
    Route::post('/paystack-pay', [CustomerController::class, 'makeCustomerOrder']);
    Route::post('/payment-callback', [CustomerController::class, 'handleCallback']);
    //appearance
    Route::patch('/update-appearance', [AppearanceController::class, 'updateAppearance']);
    //

});