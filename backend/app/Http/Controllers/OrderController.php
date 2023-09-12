<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function showOrders() {
        $user = Order::where('status', 1)->leftJoin('customers', 'customers.id', '=', 'orders.customer_id')->paginate(5);

        return response()->json(['users'=> $user,
        'status' => 200,
        'message'=>'Successful']);
   }

}