<?php
// use App\Http\Controllers\MockController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AppearanceController;
use App\Http\Controllers\WebsiteSettingController;
use App\Http\Controllers\CategorySectionController;
use App\Http\Controllers\SocialMediaPageController;


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
   
    Route::post('/confirm-vendor-email', [UserController::class, 'confirmVendorEmail']);
    //
    Route::post('/confirm-admin-email', [AdminController::class, 'confirmAdminEmail']);
    //
    Route::post('/login', [UserController::class, 'saveLogin']);
    //
    Route::post('/admin-login', [AdminController::class, 'saveAdminLogin']);
    //
    Route::post('/vendors-forget-password', [UserController::class, 'forgetPassword']);
    //
    Route::post('/admin-forget-password', [AdminController::class, 'forgetPasswordAdmin']);
    //Send Forget Password Form  
    Route::post('/forget-password-customer', [CustomerController::class, 'forgetPasswordCustomer']);
    
    //VERIFY CODE FROM URL
    Route::post('/confirm-password-code-customer', [CustomerController::class, 'confirmPasswordCodeCustomer']);
    //
    Route::post('/confirm-password-code', [UserController::class, 'confirmPasswordCode']);
  //
  Route::post('/confirm-password-code-admin', [AdminController::class, 'confirmPasswordCodeAdmin']);
    //
    Route::post('/customer-new-password', [CustomerController::class, 'customerNewPassword']);
    //
    Route::post('/new-password', [UserController::class, 'newPassword']);
    //
    Route::post('/new-password-admin', [AdminController::class, 'newPasswordAdmin']);
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
    Route::get('/show-vendors', [AdminController::class, 'showVendors']);

    // show unconfirmed 
    Route::get('/show-vendors-unconfirmed', [AdminController::class, 'showUnconfirmedVendors']);

     // show orders 
     Route::get('/show-orders', [OrderController::class, 'showOrders']);

    // send message 
     Route::post('/send-message', [MessageController::class, 'messageUs']);

    
    
});



// Route::prefix('mock')->group(function () {
//     Route::get('endpoint',  [MockController::class, 'mockResponse']);
//     // Add more mock routes as needed
// });

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/update-website-settings', [WebsiteSettingController::class, 'updateWebsiteSetting']);
   
    Route::patch('/update-social-media', [SocialMediaPageController::class, 'updateSocialMedia']);
    Route::post('/logout', [UserController::class, 'logout']);
      //
      Route::post('/logout-admin', [AdminController::class, 'logoutAdmin']);
    //logout
    Route::post('/customer-logout', [CustomerController::class, 'customerLogout']);
   //Make payment
   
    Route::post('/payment-callback', [CustomerController::class, 'handleCallback'])->middleware('throttle:10,1');
    //appearance
    Route::post('/update-appearance', [AppearanceController::class, 'updateAppearance']);
    //
    Route::post('/get-customer', [CustomerController::class, 'getUser']);
    //
    Route::post('/order', [CustomerController::class, 'customerOrder']);
    //
    Route::get('/get-events', [CustomerController::class, 'getEvents']);
    //
    
    Route::get('/get-orders', [CustomerController::class, 'getOrders']);
    //
    Route::get('/limo-orders', [OrderController::class, 'showLimoOrders']);

     //
    Route::get('/customers-count', [OrderController::class, 'showCustomer']);

   //
   Route::get('/revenue', [OrderController::class, 'showRevenue']);
    
     //
     Route::get('/vendor-count', [OrderController::class, 'showUsersVendors']);

     //
     Route::get('/latest-customer', [OrderController::class, 'showLatestCustomer']);
    //
    Route::get('/show-customers', [OrderController::class, 'showCustomers']);
    //

    Route::get('/show-customers-that-never-ordered', [OrderController::class, 'showCustomersThatNeverOrdered']);
        //  
     Route::get('/show-daily-event-orders', [OrderController::class, 'showDailyEventOrders']);
     
    //
    Route::get('/show-monthly-event-orders', [OrderController::class, 'showMonthlyLimoOrder']); 
   
     //
     Route::get('/show-monthly-revenue', [OrderController::class, 'showMonthlyRevenue']); 
     //
    
     Route::get('/all-orders-table', [OrderController::class, 'showAllOrdersTable']);
     
     //
     Route::get('/dashboard-vendor', [OrderController::class, 'showDashboardVendors']);
     //
     
     Route::get('/confirmed-vendors', [AdminController::class, 'confirmedVendors']);
    //
     Route::get('/vendor/{id}', [AdminController::class, 'showVendor']);
        //
    Route::patch('/confirm-vendor/{id}', [AdminController::class, 'confirmVendor']);
    //
    Route::patch('/unconfirm-vendor/{id}', [AdminController::class, 'unconfirmVendor']);
  
     Route::get('/edit-vendor', [UserController::class, 'editVendor']);
    //

    
     Route::post('/update-vendor', [UserController::class, 'updateVendor']);
      //
      Route::get('/completed-limo-orders', [OrderController::class, 'completedLimoOrders']);
});