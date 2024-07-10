<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Event;
use App\Models\Order;
use App\Models\Vendor;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\DailyEventOrder;
use App\Models\MonthlyLimoOrder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function showOrders() {
        $user = Order::where('status', 1)->leftJoin('customers', 'customers.id', '=', 'orders.customer_id')->paginate(5);

        return response()->json(['users'=> $user,
        'status' => 200,
        'message'=>'Successful']);
   }


   public function showLimoOrders() {
    $limo_orders = Order::count();

    $now = Carbon::now();
    $thirtyDaysAgo = Carbon::now()->subDays(30);
    
    $limo30 = Order::whereBetween('created_at', [$thirtyDaysAgo, $now])->count();
  

    return response()->json(['orders'=> number_format($limo_orders),
    'orders30'=>number_format($limo30),
    'status' => 200,
    'message'=>'Successful',
   
]);
}


public function showCustomer() {
    $customer = Customer::count();

    $now = Carbon::now();
    $thirtyDaysAgo = Carbon::now()->subDays(30);
    $customer30 = Customer::whereBetween('created_at', [$thirtyDaysAgo, $now])->count();

    return response()->json(['customer'=> number_format($customer),
   'customer30'=>number_format($customer30),
    'status' => 200,
    'message'=>'Successful']);
}

public function showCustomers() {
    $users = Customer::latest()->paginate(10);

    return response()->json(['users'=> $users,
    'status' => 200,
    'message'=>'Successful']);
}

public function showCustomersThatNeverOrdered() {
    $users = Customer::select('customers.*')
    ->join('events', 'events.customer_id', '=', 'customers.id')
    ->distinct()
    ->latest('customers.created_at')
    ->paginate(7);

return response()->json([
    'users' => $users,
    'status' => 200,
    'message' => 'Successful'
]);
}

public function showRevenue() {
   $revenue = Order::sum('price');

   $now = Carbon::now();
   $thirtyDaysAgo = Carbon::now()->subDays(30);
   $revenue30 = Order::whereBetween('created_at', [$thirtyDaysAgo, $now])->sum('price');
    
    return response()->json(['revenue'=> number_format($revenue),
    'revenue30'=> number_format($revenue30),
    'status' => 200,
    'message'=>'Successful']);
}


public function showUsersVendors() {
    $users_vendors = User::count();

    $now = Carbon::now();
    $thirtyDaysAgo = Carbon::now()->subDays(30);
    $vendors30 = User::whereBetween('users.created_at', [$thirtyDaysAgo, $now])->count();

    return response()->json(['users_vendors'=> number_format($users_vendors),
    'vendors30'=>number_format($vendors30),
    'status' => 200,
    'message'=>'Successful']);
}


public function showLatestCustomer() {

    $latest_customer = Customer::latest('created_at')->limit(7)->get();

    return response()->json(['latest_customer'=> $latest_customer,
    'status' => 200,
    'message'=>'Successful']);
}



public function showDailyEventOrders() {

    $endDate = now()->toDateString();  // End date is the current date
    $startDate = now()->subDays(6)->toDateString();  // Start date is 6 days before the current date
    
    // Retrieve daily order counts for each day of the week
    $weeklyOrderCounts = DB::table('daily_event_orders')
        ->selectRaw('DATE_FORMAT(date, "%W") as day_of_week')
        ->selectRaw('COALESCE(SUM(daily_event_order_count), 0) as order_count')
        ->whereBetween('date', [$startDate, $endDate])
        ->groupBy('day_of_week')
        ->orderBy('date', 'desc') 
        ->get();
        
        $mostRecentRecord = DB::table('events')->latest('created_at')->first();

       if ($mostRecentRecord) {
            // Calculate the relative time
            $relativeTime =  Carbon::parse($mostRecentRecord->created_at)->diffForHumans();
           
        }else {
            // If there are no records, set $relativeTime to an empty string
            $relativeTime = '';
        }
        
        
return response()->json([
    'dailyOrders' => $weeklyOrderCounts,
    'status' => 200,
    'message' => 'Successful',
    'relativeTime'=> $relativeTime
]);

//

}

public function showMonthlyLimoOrder(){

    $endDate = now()->endOfMonth();  // End date is the last day of the current month
$startDate = now()->subMonths(8)->startOfMonth();  // Start date is 11 months before the current month
// Retrieve monthly order counts for each month
$monthlyOrderCounts = DB::table('monthly_limo_orders')
    ->selectRaw('DATE_FORMAT(date, "%M") as month_of_year')
    ->selectRaw('COALESCE(SUM(monthly_event_order_count), 0) as order_count')
    ->whereBetween('date', [$startDate, $endDate])
    ->groupBy('month_of_year')
    ->orderBy('date', 'desc') 
    ->get();

     // Cast the order_count field to integers
     $monthlyOrderCounts = $monthlyOrderCounts->map(function ($item) {
        $item->order_count = (int) $item->order_count;
        return $item;
    });
    
   $mostRecentRecord = DB::table('orders')->latest('created_at')->first();
    if ($mostRecentRecord) {
        
        $relativeTimeRecord =  Carbon::parse($mostRecentRecord->created_at)->diffForHumans();
      
    }else{
        $relativeTimeRecord = '';
    }
    
    return response()->json([
        'monthlyOrders' => $monthlyOrderCounts,
        'status' => 200,
        'message' => 'Successful',
        'relativeMonthlyLimoTime'=> $relativeTimeRecord

    ]);
}

public function showMonthlyRevenue(){

    $endDate = now()->endOfMonth();  // End date is the last day of the current month
$startDate = now()->subMonths(8)->startOfMonth();  // Start date is 11 months before the current month

// Retrieve monthly revenues for each month
$monthlyOrderRevenue = DB::table('limo_monthly_revenues')
    ->selectRaw('DATE_FORMAT(date, "%M") as month_of_year')
    ->selectRaw('COALESCE(SUM(monthly_limo_revenue), 0) as revenue_count')
    ->whereBetween('date', [$startDate, $endDate])
    ->groupBy('month_of_year')
    ->orderBy('date', 'desc') 
    ->get();
    
    // Cast the order_count field to integers
    $monthlyOrderRevenue = $monthlyOrderRevenue->map(function ($item) {
        $item->revenue_count = (int) $item->revenue_count;
        return $item;
    });
    
    $mostRecentRecord = DB::table('orders')->latest('created_at')->first();
    if ($mostRecentRecord) {
        // Calculate the relative time
        $relativeTimeRecord =  Carbon::parse($mostRecentRecord->created_at)->diffForHumans();
      
    }else{
        $relativeTimeRecord = '';
    }
    
    return response()->json([
        'monthlyRevenue' => $monthlyOrderRevenue,
        'status' => 200,
        'message' => 'Successful',
        'relativeRevenueTime'=> $relativeTimeRecord

    ]);
}

//Dashboard Orders Table
public function showAllOrdersTable(){

   $orderTable = Event::leftJoin('customers', 'customers.id', 'events.customer_id')->latest('events.created_at')->paginate(10);
        
    return response()->json([
        'orderTable' => $orderTable,
        'status' => 200,
        'message' => 'Successful',

    ]);
}

public function showDashboardVendors() {
    $user = User::where('active', 1)->leftJoin('category_sections', 'category_sections.id', '=', 'users.category_section_id')->latest('users.created_at')->take(10)->get();

    return response()->json(['users'=> $user,
    'status' => 200,
    'message'=>'Successful']);
}

public function completedLimoOrders(){
    $users = Order::leftJoin('customers', 'customers.id', 'customer_id')->latest('orders.created_at')->take(7)->get();
    
    return response()->json(['users'=> $users,
    'status' => 200,
    'message'=>'Successful']);
}


}