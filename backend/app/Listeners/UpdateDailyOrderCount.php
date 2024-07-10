<?php

namespace App\Listeners;

use App\Models\DailyEventOrder;
use App\Events\EventOrderCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateDailyOrderCount
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(EventOrderCreated $event)
    {
        // Retrieve the current daily order count for the current date
        $currentDate = now()->toDateString();
        $dailyOrder = DailyEventOrder::where('date', $currentDate)->first();

        // If a daily order record doesn't exist for the current date, create it
        
        
        if (!$dailyOrder) {
            $dailyOrderCount = DailyEventOrder::create([
                'date' => $currentDate,
                'daily_event_order_count' => 1, // Start with 1 for the newly created order
            ]);
        } else {
            // If a daily order record already exists, increment the order count
            $dailyOrder->increment('daily_event_order_count');
        }
    }
}