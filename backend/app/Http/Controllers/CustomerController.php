<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class CustomerController extends Controller
{
    public function saveCustomerRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required||min:3',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:6|confirmed',
            'special_request' => 'nullable',
            'event_date' => 'required',
            'phone' => 'required',
            'event_location' => 'required',

            ]);

            if($validator->fails()){
                return response()->json([
            'validator_errors'=> $validator->messages(),
                ]);
            }else{
                
                $randomToken = random_int(100000, 999999);
                $email_verification = Str::random(30);
                
                $user = Customer::create([
                    'email' => $request->input('email'),
                    'fullname' => $request->input('fullname'),
                    'special_request' => $request->input('special_request'),
                    'event_date' => $request->input('event_date'),
                    'password' => Hash::make($request->input('password')),
                    'phone' => $request->input('phone'),
                    'event_location' => $request->input('event_location'),
                    'verification_code' => $email_verification,
                ]);
                
                return response()->json([
                    'status' => 201,
                    'message' => 'Customer registered successfully',
                ], 201);
                
            }
    }

    public function saveCustomerLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
            'password'=>'required',
             ]);

             if($validator->fails()){
                return response()->json([
            'validator_errors'=> $validator->messages()
                ]);
            }else{

                $user = Customer::where('email', $request->email)->first();

                if (! $user || ! Hash::check($request->password, $user->password)) {
                    return response()->json(['status' => 401,
                    'message'=>'Invalid credentials']);
        
                }else{
    
                //Deal with the remember me also
    
                $token = $user->createToken($user->email.'_CustomerToken')->plainTextToken;
    
                 return response()->json(['status' => 200,
                'email'=> $user->email,
                'token'=>$token,
                'message'=>'Login was successful']);
             }
                // Check if the customer's email is verified
        //         if (!Auth::guard('customer')->attempt($request->only('email', 'password'))) {
        //             return response()->json([
        //                 'status' => 401,
        //                 'message' => 'Invalid credentials',
        //             ], 401);
        //         }

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Customer logged in successfully',
        //     'token' => auth('customer')->user()->createToken($user->email.'_CustomerToken')->plainTextToken,
        // ], 200);  
            }

    }


    public function customerLogout(Request $request)
    {
        auth()->customer()->tokens()->delete();

        return response()->json(['status' => 200,
        'message'=>'Customer logged out successfully']);
    }

       
}