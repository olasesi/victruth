<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Event;
use App\Models\Order;
use GuzzleHttp\Client;
use App\Models\Customer;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\ConfirmUserPayment;
use App\Events\EventOrderCreated;
use App\Mail\ForgetPasswordCustomer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Events\MonthlyRevenueCreated;
use App\Events\MonthlyLimoOrderCreated;
use Illuminate\Support\Facades\Validator;


class CustomerController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|min:3',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:6|confirmed',
            'phone' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 401,
                'message' => $validator->messages(),
            ]);
        } else {

          
            $customer = Customer::create([
                'email' => $request->input('email'),
                'fullname' => $request->input('fullname'),
                'password' => Hash::make($request->input('password')),
                'phone' => $request->input('phone'),
               // 'verification_code' => $email_verification,
            ]);

            return response()->json([
                'status' => 200,
                 'message' => 'Registration was successful'
            ]);

            
        }
    }

    public function forgetPasswordCustomer(Request $request){
        $validator = Validator::make($request->all(), [
            'email'=>'required|email',
             ]);

             if($validator->fails()){
                return response()->json([
                    'status' => 401,
            'message'=> $validator->messages()
                ]);
            }else{
                $countForgotPassword = Customer::where('email', $request->input('email'))->first();
                if($countForgotPassword){
                   
                    $randomToken = random_int(100000, 999999);
                    $email_verification = Str::random(30);
                    $expiryTimestamp = now()->addHour();
                    
                    $countForgotPassword->forget_password = $email_verification;
                    $countForgotPassword->expiry_timestamp = $expiryTimestamp;
                    $countForgotPassword->save();
        
                    $email_verification_code = ['verification-code'=>$email_verification,'token'=> $randomToken, 'email'=> $request->input('email')];
                  
                                     
                    Mail::to($request->input('email'))->send(new ForgetPasswordCustomer($email_verification_code));
                   
                    return response()->json(['status' => 200,
                    'message'=>'Forget password link has been sent']);
                
                }else{

                    return response()->json(['status' => 500,
                    'message'=>'Invalid']);
                }

            }

}

public function confirmPasswordCodeCustomer(Request $request){
    $validator = Validator::make($request->all(), [
        'forget_password' => 'required|string|size:30',
    ]);
 
    if($validator->fails()){
        return response()->json([
            'status' => 401,
            'message'=> "Invalid",
        ]);
    }else{

        $countForgotPassword = Customer::where('forget_password', $request->input('forget_password'))->first();
        
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


public function customerNewPassword(Request $request){

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

        $countForgotPassword = Customer::where('email', $request->input('email'))->where('forget_password', $request->input('forget_password'))->first();
              
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


    public function customerOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'limo_ride'=>'nullable | numeric',
            'event_planners' => 'nullable | numeric',
            'caterers' => 'nullable | numeric',
            'cakes' => 'nullable | numeric',
            'drink_suppliers' => 'nullable | numeric',
            'servers_waiters' => 'nullable | numeric',
            'makeup_artists' => 'nullable | numeric',
            'venues' => 'nullable | numeric',
            'hall_decorators' => 'nullable | numeric',
            'photographers_video' => 'nullable | numeric',
            'aso_ebi' => 'nullable | numeric',
            'printers' => 'nullable | numeric',
            'souvenirs_gifts' => 'nullable | numeric',
            'package_price'=> 'required | numeric'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ]);
        } else {
          
            
              $events = Event::create([
                  'limo_ride' => $request->input('limo_ride'),
                    'event_planners' => $request->input('event_planners'),
                    'caterers' => $request->input('caterers'),
                    'cakes' => $request->input('cakes'),
                    'drink_suppliers' => $request->input('drink_suppliers'),
                    'servers_waiters' => $request->input('servers_waiters'),
                    'makeup_artists' => $request->input('makeup_artists'),
                    'venues' => $request->input('venues'),
                    'hall_decorators' => $request->input('hall_decorators'),
                    'photographers_video' => $request->input('photographers_video'),
                    'aso_ebi' => $request->input('aso_ebi'),
                    'printers' => $request->input('printers'),
                    'souvenirs_gifts' => $request->input('souvenirs_gifts'),
                    'customer_id' => auth('customer')->user()->id,
                        ]);

                     
                         event(new EventOrderCreated($events->id));

                         
                        if($request->input('limo_ride') === 0){

                            return response()->json([
                                'status' => 200,
                                'message' => 'Order for vendor services was successfully placed. You will be contacted shortly' 
                                
                            ]);
                            
                        }else{
                          
                            
            // Initiate payment using Paystack API
            // Create a transaction and redirect user to Paystack payment page
            // return response()->json([
            //     'api'=> env('PAYSTACK_SECRET_KEY'),
            //     'status' => 200,
            //     'message' => 'Order was successful'
            // ]);

            // Define the base URL for Paystack's API
            $paystackUrl = "https://api.paystack.co/transaction/initialize";

            // Create an instance of Guzzle client
            $client = new Client();

            // Define the payment data. This might vary depending on your application's needs.
            $paymentData = [
                'email' => auth('customer')->user()->email, // email of the user making the payment
                'amount' => $request->input('package_price') * 100, // Paystack's amount is in kobo, hence multiplied by 100
               // 'callback_url' => route('payment.callback'), // callback URL after payment is done
                // Additional fields like 'reference', 'metadata', etc. can be added as needed
            ];

            try {
                $response = $client->post($paystackUrl, [
                    'headers' => [
                        'Authorization' => 'Bearer sk_test_4cab8d4d937b1ab5f847c78c0014a2f6a6e3405c',
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'json' => $paymentData
                ]);

                

                $data = json_decode($response->getBody(), true);

                if (!$data['status']) {
                    return response()->json(['status' => false, 'message' => 'Error initiating payment']);
                }

                // Get the payment URL from the Paystack's response and return to the frontend
                $paymentUrl = $data['data']['authorization_url'];

                //return redirect($paymentUrl);
                return response()->json(['status' => true, 'payment_url' => $paymentUrl]);
            } catch (Exception $e) {
                // Handle errors
                return response()->json(['status' => false, 'message' => $e->getMessage()]);
            }
            }

        }
    }

  


    public function handleCallback(Request $request)
    {
        $customer = Auth::guard('customer')->user();
        
        $reference = $customer->id . '_' . time();
  
        // Verify payment status using Paystack API
        $response = $this->client->get("https://api.paystack.co/transaction/verify/$reference", [
            'headers' => [
                'Authorization' => 'Bearer sk_test_4cab8d4d937b1ab5f847c78c0014a2f6a6e3405c',
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        if ($data['status'] === 'success') {
            // Update your application records for successful payment
            $price = $data['data']['amount'] / 100; // Assuming Paystack returns the amount in kobo

            $order = Order::create([
                'reference' => $reference,
                'customer_id' => $customer->id,
                'price' => $price
               
            ]);

           $getCustomer = Event::where('customer_id', $customer->id)->latest()->first();
            
            $payment_verification = ['price'=> $price, 'reference'=> $reference, 'orders'=>$getCustomer, 'name'=>$customer->fullname];

            $recipients = [
                $customer->email,
                env("VICTRUTH_EMAIL")
            ];
            
            event(new MonthlyLimoOrderCreated($order->id));
            event(new MonthlyRevenueCreated($price));

             Mail::to($recipients)->send(new ConfirmUserPayment($payment_verification));

            return response()->json(['status' => 200, 'message' => "Your Payment is being proccessed"]);
            //return redirect(env('APP_URL').'/dashboard'); // Replace with your desired URL

        } else {
            // Handle payment failure
               return response()->json(['status' => 401, 'message' => "Payment failed"]);
           // return redirect('https://payme.com/dashboard'); // Replace with your desired URL

        }
    }

    public function saveCustomerLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'remember_token'=>'nullable',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_errors' => $validator->messages()
            ]);
        } else {

             $user = Customer::where('email', $request->email)->first();

             if (!$user || !Hash::check($request->password, $user->password)) {
                 return response()->json([
                     'status' => 401,
                     'message' => 'Invalid credentials'
                 ]);
             } else {
                              
                $rememberMe = $request->input('remember_token');
                $remember = $rememberMe ? Str::random(60) : null;

                $user->remember_token = $remember;
                $user->save();
                 
                 $token = $user->createToken($user->email. '_customer_token')->plainTextToken;

                 return response()->json([
                     'status' => 200,
                     'email' => $user->email,
                     'token' => $token,
                     'is_customer' => $user->is_customer,
                     'remember_me' => $rememberMe,
                     'message' => 'Login was successful'
                 ]);
                }
             
           
        }
    }

    public function customerLogout()
    {
        auth('customer')->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Customer logged out successfully'
        ]);
    }


    public function getUser()
    {
        $user = Customer::find(auth('customer')->user()->id);

        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'Successful'
        ]);
    }


    public function getEvents()
    {
        $user = Event::where('customer_id', auth('customer')->user()->id)->latest()->paginate(10);

        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'Successful'
        ]);
    }

       public function getOrders()
    {
        $user = Order::where('customer_id', auth('customer')->user()->id)->latest()->paginate(10);

        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'Successful'
        ]);
    }
}