<?php

namespace App\Listeners;

use App\Models\LimoMonthlyRevenue;
use App\Events\MonthlyRevenueCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateRevenueCount
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(MonthlyRevenueCreated $price)
    {
         // Retrieve the current daily order count for the current date
         $currentDate = now()->toDateString();
         $month = now()->format('F');
         $dailyOrder = LimoMonthlyRevenue::where('month', $month)->first();
 
         // If a daily order record doesn't exist for the current date, create it
         if (!$dailyOrder) {
             $dailyOrderCount = LimoMonthlyRevenue::create([
                'month'=> $month,
                 'date' => $currentDate,
                 'monthly_limo_revenue' => $price, // Start with 1 for the newly created order
             ]);
         } else {
             // If a daily order record already exists, increment the order count
             $incrementValue = $price; 
             $dailyOrder->increment('monthly_limo_revenue', $incrementValue);

             
         }
    }
}