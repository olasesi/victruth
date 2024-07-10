<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\ForgetPasswordAdmin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class AdminController extends Controller
{
     public function saveAdminLogin(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'email' => 'required|email',
             'password' => 'required',
             'remember_token' => 'nullable',
         ]);
    
         if ($validator->fails()) {
             return response()->json([
                 'message' => $validator->messages(),
             ]);
         } else {
             $user = Admin::where('email', $request->email)
                 ->where('active', 1)
                 ->first();
    
             if (!$user || !Hash::check($request->password, $user->password)) {
                 return response()->json([
                     'status' => 401,
                     'message' => 'Invalid credentials',
                 ]);
             } else {
                  //Deal with the remember me also
                 $rememberMe = $request->input('remember_token');
                 $remember = $rememberMe ? Str::random(60) : null;
                 $user->remember_token = $remember;
                 $user->save();
    
                 // Separate logic for admin 
                 
                     // Admin specific logic
                     $tokenName = $user->email . '_AdminToken';
                     $responseData = [
                         'status' => 200,
                         'token' => $user->createToken($tokenName)->plainTextToken,
                         'remember_me' => $rememberMe,
                         'message' => 'Admin login was successful',
                     ];
                     
                 return response()->json($responseData);
             }
         }
     }

     

     public function forgetPasswordAdmin(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
             ]);

             if($validator->fails()){
                return response()->json([
                    'status' => 401,
            'message'=> $validator->messages()
                ]);
            }else{
                $passwordReset = Admin::where('email', $request->input('email'))->where('active', 1)->first();
                
                if($passwordReset){
                    $randomToken = random_int(100000, 999999);
                    $email_verification = Str::random(30);
                    $expiryTimestamp = now()->addHour();

                    $passwordReset->forget_password = $email_verification;
                    $passwordReset->expiry_timestamp = $expiryTimestamp;
                    $passwordReset->save();
        
                    $email_verification_code = ['verification-code'=>$email_verification,'token'=> $randomToken, 'email'=> $request->input('email')];
                    
                    Mail::to($request->input('email'))->send(new ForgetPasswordAdmin($email_verification_code));
                   
                    return response()->json(['status' => 200,
                    'message'=>'Forget password link has been sent']);
                
                }else{

                    return response()->json(['status' => 500,
                    'message'=>'Invalid']);
                }

            }

        }

public function confirmPasswordCodeAdmin(Request $request){
    $validator = Validator::make($request->all(), [
        'forget_password' => 'required|string|size:30',
    ]);
 
    if($validator->fails()){
        return response()->json([
            'status' => 401,
            'message'=> "Invalid",
        ]);
    }else{

        $countForgotPassword = Admin::where('forget_password', $request->input('forget_password'))->where('active', 1)->first();
        
        if(!$countForgotPassword || $countForgotPassword->expiry_timestamp < now()){
             return response()->json([
                'status' => 401,
                'message'=> "Invalid or token has expired",
            ]);
           
        }else{
            return response()->json(['status' => 200]);
        }
    }   
 
}

public function newPasswordAdmin(Request $request){

    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
        'forget_password' => 'required|string|size:30',

    ]);
  
    if ($validator->fails()) {
        return response()->json([
            'status' => 401,
            'message' => $validator->messages(),
        ]);
    }else {
            

        $countForgotPassword = Admin::where('email', $request->input('email'))->where('forget_password', $request->input('forget_password'))->where('active', 1)->first();
              
        if($countForgotPassword){
            
            $countForgotPassword->forget_password = null;
            $countForgotPassword->expiry_timestamp = null;
            $countForgotPassword->password =  Hash::make($request->input('password'));
            $countForgotPassword->save();
            
            return response()->json(['status' => 200,
            'message'=>'Your new password has now been set']);
        }else{
            return response()->json([
                'status' => 401,
                'message'=> "Invalid"
            ]);
        }
    }
}    



public function logoutAdmin(){
    auth('admin')->user()->tokens()->delete();
    return response()->json(['status' => 200,
    'message'=>'Logout was successful']);
    }



public function showVendors() {
    $user = User::select('users.id', 'firstname', 'lastname', 'email', 'business_name' , 'business_description', 'phone', 'state', 'status', 'users.created_at', 'category')->where('active', 1)->leftJoin('category_sections', 'category_sections.id', 'users.category_section_id')
    ->latest('users.created_at')->paginate(10);

  //  $users->each->append('short_business_description');
    
    return response()->json(['users'=> $user,
    'status' => 200,
    'message'=>'Successful']);
}

 public function showVendor($id) {
    $user = User::select('users.id', 'firstname', 'lastname', 'email', 'business_name', 'business_description', 'facebook', 'twitter', 'instagram', 'phone', 'gender', 'profile_picture', 'country', 'website', 'bio', 'occupation', 'zipcode', 'state', 'city', 'status', 'address', 'vendor_business_image', 'users.created_at', 'category')->where('active', 1)->where('users.id', $id)->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->first();

    return response()->json(['users'=> $user,
    'status' => 200,
    'message'=>'Successful']);
}

public function showUnconfirmedVendors() {
    $user = User::where('active', 1)->where('status', 0)->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->orderBy('users.created_at', 'desc')->take(5)->get();

    return response()->json(['users'=> $user,
    'status' => 200,
    'message'=>'Successful']);
}

public function confirmedVendors() {
    $user = User::select('users.id', 'firstname', 'lastname', 'email', 'business_name', 'phone', 'state', 'users.created_at', 'category')->where('active', 1)->where('status', 1)->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->orderBy('users.created_at', 'desc')->take(10)->get();

        return response()->json(['users'=> $user,
        'status' => 200,
        'message'=>'Successful']);
}

public function confirmVendor($id) {
    $user = User::where('active', 1)->where('id', $id)->where('status', 0)->first();

    if ($user) {
        $user->status = 1;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Successful',

        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'User not found'
        ]);
    }
}

public function unconfirmVendor($id) {
    
    $user = User::where('active', 1)->where('id', $id)->where('status', 1)->first();
    
    if ($user) {
        $user->status = 0;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Successful'
        ]);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'User not found'
        ]);
    }
}

}