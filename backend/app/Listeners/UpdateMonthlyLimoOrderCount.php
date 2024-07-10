<?php

namespace App\Listeners;

use App\Models\MonthlyLimoOrder;
use App\Events\MonthlyLimoOrderCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateMonthlyLimoOrderCount
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
    public function handle(MonthlyLimoOrderCreated $event)
    {
        // Retrieve the current daily order count for the current date
        $currentDate = now()->toDateString();
        $month = now()->format('F');
        $dailyOrder = MonthlyLimoOrder::where('month', $month)->first();

        // If a daily order record doesn't exist for the current date, create it
        if (!$dailyOrder) {
            $dailyOrderCount = MonthlyLimoOrder::create([
                'month'=> $month,
                'date' => $currentDate,
                'monthly_event_order_count' => 1, // Start with 1 for the newly created order
            ]);
        } else {
            // If a daily order record already exists, increment the order count
            $dailyOrder->increment('monthly_event_order_count');
        }
    }
}