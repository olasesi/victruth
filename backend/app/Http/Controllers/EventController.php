<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function showEvents(){
        
       $events = Event::where('customer_id', auth('customer')->user()->id)->paginate(10);

       return response()->json([
        'status' => '200',
        'messages' => 'Events successfully loaded',
       ]);
    }
}