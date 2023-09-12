<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Order;
use GuzzleHttp\Client;
use App\Models\Customer;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class CustomerController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required||min:3',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:6|confirmed',
            'phone' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_errors' => $validator->messages(),
            ]);
        } else {

            $randomToken = random_int(100000, 999999);
            $email_verification = Str::random(30);

            $customer = Customer::create([
                'email' => $request->input('email'),
                'fullname' => $request->input('fullname'),
                'password' => Hash::make($request->input('password')),
                'phone' => $request->input('phone'),
                'verification_code' => $email_verification,
            ]);

            $token = $customer->createToken($customer->email . '_Token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'email' => $customer->email,
                'token' => $token,
                'admin_role_id' => $customer->admin_role_id,
                'message' => 'Login was successful'
            ]);
        }
    }


    public function saveCustomerRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required||min:3',
            'email' => 'required|email|unique:customers',
            'password' => 'required|min:6|confirmed',
            'special_request' => 'nullable',
            'event_date' => 'nullable|date',
            'phone' => 'required',
            'event_location' => 'nullable',
            'event_planners' => 'nullable',
            'caterers' => 'nullable',
            'cakes' => 'nullable',
            'drinks_suppliers' => 'nullable',
            'servers_waiters' => 'nullable',
            'makeup_artists' => 'nullable',
            'venues' => 'nullable',
            'hall_decorators' => 'nullable',
            'photographers_videos' => 'nullable',
            'aso_ebi' => 'nullable',
            'printers' => 'nullable',
            'souvenirs_gifts' => 'nullable',


        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_errors' => $validator->messages(),
            ]);
        } else {

            $randomToken = random_int(100000, 999999);
            $email_verification = Str::random(30);

            $customer = Customer::create([
                'email' => $request->input('email'),
                'fullname' => $request->input('fullname'),
                'password' => Hash::make($request->input('password')),
                'phone' => $request->input('phone'),
                'verification_code' => $email_verification,
            ]);

            $customer_id = $customer->id;

            $events = Event::create([
                'customer_id' => $customer_id,
                'special_request' => $request->input('special_request'),
                'event_date' => $request->input('event_date'),
                'event_location' => $request->input('event_location'),
                'event_planners' => $request->input('event_planners'),
                'caterers' => $request->input('caterers'),
                'cakes' => $request->input('cakes'),
                'drinks_suppliers' => $request->input('drinks_suppliers'),
                'servers_waiters' => $request->input('servers_waiters'),
                'makeup_artists' => $request->input('makeup_artists'),
                'venues' => $request->input('venues'),
                'hall_decorators' => $request->input('hall_decorators'),
                'photographers_videos' => $request->input('photographers_videos'),
                'aso_ebi' => $request->input('aso_ebi'),
                'printers' => $request->input('printers'),
                'souvenirs_gifts' => $request->input('souvenirs_gifts'),
            ]);


            // Initiate payment using Paystack API
            // Create a transaction and redirect user to Paystack payment page

            // Define the base URL for Paystack's API
            $paystackUrl = "https://api.paystack.co/transaction/initialize";

            // Create an instance of Guzzle client
            $client = new Client();

            // Define the payment data. This might vary depending on your application's needs.
            $paymentData = [
                'email' => $request->input('email'), // email of the user making the payment
                'amount' => $request->input('package') * 100, // Paystack's amount is in kobo, hence multiplied by 100
                'callback_url' => route('payment.callback'), // callback URL after payment is done
                // Additional fields like 'reference', 'metadata', etc. can be added as needed
            ];

            try {
                $response = $client->post($paystackUrl, [
                    'headers' => [
                        'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
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
                return response()->json(['status' => true, 'payment_url' => $paymentUrl]);
            } catch (\Exception $e) {
                // Handle errors
                return response()->json(['status' => false, 'message' => $e->getMessage()]);
            }
        }
    }

    public function makeCustomerOrder(Request $request)
    {


        
        $validator = Validator::make($request->all(), [
           
            'packages' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_errors' => $validator->messages(),
            ]);
        } else {

             if($request->input('packages') == "PACKAGE_ONE"){
              $price = env('PACKAGE_ONE');
            }
           
            // Initiate payment using Paystack API
            // Create a transaction and redirect user to Paystack payment page

            // Define the base URL for Paystack's API
            $paystackUrl = "https://api.paystack.co/transaction/initialize";

            // Create an instance of Guzzle client
            $client = new Client();

            // Define the payment data. This might vary depending on your application's needs.
            $paymentData = [
                'email' => Auth::guard('customer')->user()->email, // email of the user making the payment
                'amount' => $price * 100, // Paystack's amount is in kobo, hence multiplied by 100
                'callback_url' => url(route('payment.callback')), // callback URL after payment is done
                // Additional fields like 'reference', 'metadata', etc. can be added as needed
            ];

            try {
                $response = $client->post($paystackUrl, [
                    'headers' => [
                        'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'json' => $paymentData
                ]);

                $data = json_decode($response->getBody(), true);

                if (!$data['status']) {
                    return response()->json(['status' => false, 'message' => 'Error initiating payment']);
                }

                return redirect()->away($data['data']['authorization_url']);

            } catch (\Exception $e) {
                // Handle errors
                return response()->json(['status' => false, 'message' => $e->getMessage()]);
            }
        }
    }


    public function handleCallback(Request $request)
    {
        // Handle Paystack payment callback
        $reference = Auth::guard('customer')->user()->id . '_' . time();

        // Verify payment status using Paystack API
        $response = $this->client->get("https://api.paystack.co/transaction/verify/$reference", [
            'headers' => [
                'Authorization' => 'Bearer ' . env('PAYSTACK_SECRET_KEY'),
            ],
        ]);

        $data = json_decode($response->getBody(), true);

        if ($data['status'] === 'success') {
            // Update your application records for successful payment
            $price = $data['data']['amount'] / 100; // Assuming Paystack returns the amount in kobo

            $order = Order::create([
                'reference' => $reference,
                'customer_id' => Auth::guard('customer')->user()->id,
                'price' => $price
               
            ]);
        
            return redirect(env('APP_URL').'/dashboard'); // Replace with your desired URL

        } else {
            // Handle payment failure
            return redirect('https://payme.com/dashboard'); // Replace with your desired URL

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

                //   if (Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password'], 'active' => 1],  $remember_me )) {
                       Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember_token);

                 $token = $user->createToken($user->email . '_CustomerToken')->plainTextToken;

                 return response()->json([
                     'status' => 200,
                     'email' => $user->email,
                     'token' => $token,
                     'message' => 'Login was successful'
                 ]);
             }




            // if (Auth::guard('customer')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember_token)) {
            //     $user = Customer::user();
            //     $token = $user->createToken($user->email . '_CustomerToken')->plainTextToken;
            
            //     return response()->json([
            //         'status' => 200,
            //         'email' => $user->email,
            //         'token' => $token,
            //         'message' => 'Login was successful'
            //     ]);
            // } else {t
            //     return response()->json([
            //         'satus' => 401,
            //         'message' => 'Invalid credentials'
            //     ]);
            // }
            
           
        }
    }


    public function customerLogout(Request $request)
    {
        auth()->customer()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Customer logged out successfully'
        ]);
    }
}