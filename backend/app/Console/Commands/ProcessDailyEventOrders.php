<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Models\DailyEventOrder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ProcessDailyEventOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:daily-event-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process daily event orders';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Processing daily event orders...');
    
        // Number of orders of the day.
        $dateToString = now()->toDateString();
       
        // Check if there are new orders for the current day
        $existingDailyOrderDaily = DailyEventOrder::where('date', $dateToString)->first();

    
        if (!$existingDailyOrderDaily) {
            // Insert or update the daily order count in the database
           
                $dailyOrder = DailyEventOrder::create([
                    'date' => $dateToString,
                    'daily_event_order_count' => 0, // Start with 0 for days with no orders
                    'created_at' => now(),
                    'updated_at' => now(), 
                ]);
        

        }  
            $this->info('Daily event orders processed successfully.');
        } 
    
}