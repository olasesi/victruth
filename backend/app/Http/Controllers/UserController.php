<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Str;
use App\Mail\ForgetPassword;
use Illuminate\Http\Request;
use App\Mail\SignupRegistration;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public function saveRegister(Request $request)
    {
           $countRegistered = User::where('email', $request->input('email'))->where('active', 1)->count();
         if($countRegistered == 1){
             return response()->json(['status' => 401,'message'=>'This email address has already been registered',
           ]);
         }

            $validator = Validator::make($request->all(), [
            'firstname'=>'required|min:3',
            'lastname'=>'required|min:3',
            'business_name'=>'required|min:3',
            'category_section_id'=>'required|integer',
            'email'=>'required|email|unique:users',
            'password'=>'min:6|required|confirmed',
            ]);

            if($validator->fails()){
                return response()->json([
                    'status'=> 401,
            'message'=> $validator->messages(),
                ]);
            }else{

    $randomToken = random_int(100000, 999999);
    $email_verification = Str::random(30);

    $expiryTimestamp = now()->addHour();

    $user = User::create([
        'email' => $request->input('email'),
        'firstname' => $request->input('firstname'),
        'lastname' => $request->input('lastname'),
        'business_name' => $request->input('business_name'),
        'category_section_id' => $request->input('category_section_id'),
        'password' => Hash::make($request->input('password')),
        'verification_code' => $email_verification,
        'expiry_timestamp' => $expiryTimestamp,

    ]);

    $email_verification_code = ['verification_string'=>$email_verification,'token'=> $randomToken, 'email'=>$request->input('email') ];
   Mail::to($request->input('email'))->send(new SignupRegistration($email_verification_code));

    return response()->json(['status' => 200,
    'message'=>'Registration was successful']);

}
        
}

    public function confirmVendorEmail(Request $request){
        $validator = Validator::make($request->all(), [
            'verification_code' => 'required|string|size:30',
        ]);
     
        if($validator->fails()){
            return response()->json([
                'status' => 401,
                'message'=> "Invalid",
            ]);
        }else{
           
            $user = User::where('verification_code', $request->input('verification_code'))->where('active', 0) ->first();
            

            if ($user) {
                $expiryTimestamp = $user->expiry_timestamp;
        
                // Check if the current time is before the expiration timestamp
                if (now()->lt($expiryTimestamp)) {
                    // Mark the user as verified
                    $user->verification_code = null;
                    $user->active = 1;
                    $user->email_verified_at = now();
                    $user->expiry_timestamp = null;
                    $user->save();
        
                    return response()->json(['status' => 200, 'message' => 'Email verification was successful']);
                } else {
                    // Token has expired
                    return response()->json(['status' => 401, 'message' => 'Email verification token has expired']);
                }
            } else {
                // User or verification code not found
                return response()->json(['status' => 401, 'message' => 'Invalid email verification request']);
            }

        }   
     
    }
    public function saveLogin(Request $request)
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
            $user = User::where('email', $request->email)
                ->where('active', 1)->first();
    
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid credentials',
                ]);
            } else {
           
                // Separate logic for vendor
                $rememberMe = $request->input('remember_token');
                $remember = $rememberMe ? Str::random(60) : null;
                $user->remember_token = $remember;
                $user->save();
                
              
                    // Vendor specific logic
                    $tokenName = $user->email . '_VendorToken';
                    $responseData = [
                        'status' => 200,
                        'token' => $user->createToken($tokenName)->plainTextToken,
                        'remember_me' => $rememberMe,
                        'message' => 'Vendor login was successful',
                    ];
                
    
                return response()->json($responseData);
            }
        }
    }
    
    public function forgetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
             ]);

             if($validator->fails()){
                return response()->json([
                    'status' => 401,
            'message'=> $validator->messages()
                ]);
            }else{
                $passwordReset = User::where('email', $request->input('email'))->where('active', 1)->first();
                
                if($passwordReset){
                    $randomToken = random_int(100000, 999999);
                    $email_verification = Str::random(30);
                    $expiryTimestamp = now()->addHour();

                    $passwordReset->forget_password = $email_verification;
                    $passwordReset->expiry_timestamp = $expiryTimestamp;
                    $passwordReset->save();
        
                    $email_verification_code = ['verification-code'=>$email_verification,'token'=> $randomToken, 'email'=> $request->input('email')];
                    
                    Mail::to($request->input('email'))->send(new ForgetPassword($email_verification_code));
                   
                    return response()->json(['status' => 200,
                    'message'=>'Forget password link has been sent']);
                
                }else{

                    return response()->json(['status' => 500,
                    'message'=>'Invalid']);
                }

            }

}


public function confirmPasswordCode(Request $request){
    $validator = Validator::make($request->all(), [
        'forget_password' => 'required|string|size:30',
    ]);
 
    if($validator->fails()){
        return response()->json([
            'status' => 401,
            'message'=> "Invalid",
        ]);
    }else{

        $countForgotPassword = User::where('forget_password', $request->input('forget_password'))->where('active', 1)->first();
        
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


public function newPassword(Request $request){

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
            

        $countForgotPassword = User::where('email', $request->input('email'))->where('forget_password', $request->input('forget_password'))->where('active', 1)->first();
              
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


    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(['status' => 200,
        'message'=>'Logout was successful']);
        }

   
   
     public function editVendor() {
         if (!auth()->check()) {
             return response()->json(['status' => 401, 'message' => 'Unauthorized']);
         }
        
          $user = User::where('active', 1)->where('users.id', auth()->user()->id)->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->first();

         
         return response()->json(['user'=> $user,
         'status' => 200,
         'message'=>'Successful']);
    }

    
     public function updateVendor(Request $request) {
        $validator = Validator::make($request->all(), [
            'instagram'=> 'nullable|url',
             'phone'=> 'nullable|numeric',
             'gender'=> 'nullable',
             'profile_picture'=> 'nullable|image|mimes:jpeg,jpg,png|max:2048',
             'business_description'=> 'nullable',
             'facebook'=> 'nullable|url',
             'twitter'=> 'nullable|url',
             'state'=>'nullable',
             'city'=>'nullable',
             'address'=> 'nullable',
             'bio'=> 'nullable',
             'occupation'=> 'nullable',
             'website' => 'nullable|url',
             'charges' => 'nullable'

        ]);
         

    if($validator->fails()){
    return response()->json([
        'status' => 401,
        'message'=> $validator->messages()
    ]);
    }else{
        
    $user = User::find(auth()->user()->id);
    $user->business_description = $request->input('business_description');
    $user->facebook = $request->input('facebook');
    $user->twitter = $request->input('twitter');
    $user->instagram = $request->input('instagram');
    $user->phone = $request->input('phone');
    $user->gender = $request->input('gender');
    $user->bio = $request->input('bio');
    $user->occupation = $request->input('occupation');
    $user->state = $request->input('state');
    $user->city = $request->input('city');
    $user->address = $request->input('address');
    $user->website = $request->input('website');
    $user->charges = $request->input('charges');
    $user->save();
    
    
    
     if ($request->hasFile('profile_picture')) {
         $uploadedImage = $request->file('profile_picture');
         $placeholderImage = '/storage/assets/images/vendors/user-images/default.png';
     
         $existingImage = User::find(auth()->user()->id)->value('profile_picture');
             if ($existingImage !== $placeholderImage && File::exists(public_path($existingImage))) {
                 File::delete(public_path($existingImage));
             }
    
             $file_name = time() . '_' . $uploadedImage->getClientOriginalName();
             $file_path = $uploadedImage->storeAs('/public/assets/images/vendors/user-images', $file_name);
    
             $vendor_user = User::find(auth()->user()->id);
             $vendor_user->profile_picture = '/storage/assets/images/vendors/user-images/' . $file_name;
             $vendor_user->save();
    
        
     }else{
         return response()->json([
             'status' => 401,
             'validator_errors'=> $validator->messages()
         ]);
     } 
     
    
   
    
     return response()->json(['status' => 200,
     'message'=>'Update was successful']);
     
}

}
     }
    