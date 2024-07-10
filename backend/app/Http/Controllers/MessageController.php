<?php

namespace App\Http\Controllers;

use App\Mail\MessageUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function messageUs(Request $request) {
        

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|min:3',
            'email' => 'required|email',
            'message' => 'required|min:3|max:1000',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validator_errors' => $validator->messages(),
            ]);
        } else {

            $messages = ['fullname'=>$request->input('fullname'), 'message'=>$request->input('message'), 'sender_email'=>$request->input('email')];

          Mail::to(env('HOMEPAGE_VICTRUTH_EMAIL'))->send(new MessageUs($messages));
          

            return response()->json([
                'status' => 200,
                'message' => 'Message was successfully sent'
            ]);
        }
    }
}