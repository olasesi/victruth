<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use App\Mail\ForgetPassword;
use Illuminate\Http\Request;
use App\Mail\SignupRegistration;
use Illuminate\Support\Facades\Auth;
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
             return response()->json(['status' => 500,'message'=>'This email address has already been used',
           ]);
         }

            $validator = Validator::make($request->all(), [
            'firstname'=>'required|min:3',
            'lastname'=>'required|min:3',
            'business_name'=>'required|min:3',
            'category_section_id'=>'required|integer',
            'email'=>'required|email',
            'password'=>'min:6|required|confirmed',
            ]);

            if($validator->fails()){
                return response()->json([
            'validator_errors'=> $validator->messages(),
                ]);
            }else{

    $randomToken = random_int(100000, 999999);
    $email_verification = Str::random(30);

    $user = User::create([
        'email' => $request->input('email'),
        'firstname' => $request->input('firstname'),
        'lastname' => $request->input('lastname'),
        'business_name' => $request->input('business_name'),
        'category_section_id' => $request->input('category_section_id'),
        'password' => Hash::make($request->input('password')),
        'verification_code' => $email_verification,
    ]);

    //$token = $user->createToken($user->email.'_token')->plainTextToken;
   
    $email_verification_code = ['verification_string'=>$email_verification,'token'=> $randomToken, 'email'=>$request->input('email') ];
   //Mail::to($request->input('email'))->send(new SignupRegistration($email_verification_code));


    return response()->json(['status' => 200,
    'email' => $user->email,
    //'token'=>$token, 
    'message'=>'Registration was successful']);

}
        
    }
    
    public function saveLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required',
            'remember_token'=>'nullable',
             ]);

         if($validator->fails()){
            return response()->json([
        'validator_errors'=> $validator->messages()
            ]);
        }else{

            $user = User::where('email', $request->email)->where('active', 1)->leftJoin('admin_roles', 'admin_roles.id', '=', 'users.admin_role_id')->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['status' => 401,
                'message'=>'Invalid credentials']);
    
            }else{

            //Deal with the remember me also

            $token = $user->createToken($user->email.'_Token', ['user_roles'=>$user->user_roles])->plainTextToken;

             return response()->json(['status' => 200,
            'email'=> $user->email,
            'token'=>$token,
            'user_roles'=>$user->user_roles,
            'message'=>'Login was successful']);
         }
        }
    }

    public function forgetPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
             ]);

             if($validator->fails()){
                return response()->json([
            'validator_errors'=> $validator->messages()
                ]);
            }else{
                $countForgotPassword = User::where('email', $request->input('email'))->where('active', 1)->count();
                if($countForgotPassword == 1){
                    $randomToken = random_int(100000, 999999);
                    $email_verification = Str::random(30);

                    $passwordReset = User::where('email', $request->input('email'))->where('active', 1)->first();
                    
                    $passwordReset->forget_password = $email_verification;
                    $passwordReset->save();
        

                    $email_verification_code = ['verification_string'=>$email_verification,'token'=> $randomToken, 'email'=>$request->input('email') ];
                    Mail::to($request->input('email'))->send(new ForgetPassword($email_verification_code));
                   
                    return response()->json(['status' => 200,
                   
                    'message'=>'Forget password link has been sent']);
                

                }else{

                    return response()->json(['status' => 500,
                    'message'=>'Invalid']);
                }

            }

}

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(['status' => 200,
                        'message'=>'Successfully logout']);
                   }

     public function showVendors() {
         $user = User::where('active', 1)->leftJoin('admin_roles', 'admin_roles.id', '=', 'users.admin_role_id')->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->paginate(5);

         return response()->json(['users'=> $user,
         'status' => 200,
         'message'=>'Successful']);
    }


    public function showUnconfirmedVendors() {
        $user = User::where('active', 1)->where('status', 0)->leftJoin('admin_roles', 'admin_roles.id', '=', 'users.admin_role_id')->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->orderBy('users.created_at', 'desc')->take(5)->get();

        
        return response()->json(['users'=> $user,
        'status' => 200,
        'message'=>'Successful']);
   }

 
    
     }
    