<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Console\Command;
use App\Models\MonthlyLimoOrder;
use Illuminate\Support\Facades\DB;

class ProcessMonthlyLimoOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:monthly-limo-orders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process Monthly Limo orders';

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
        $this->info('Processing monthly limo event orders...');
    
        $currentMonth = now()->subMonth()->toDateString();
        $month = now()->subMonth()->format('F');
    
        // Calculate the monthly event order count
        $monthlyEventOrderCount = MonthlyLimoOrder::where('month', $month)->first();
    
        // Update or insert the monthly limo event orders count in the database based on the month
        if(!$monthlyEventOrderCount){
       MonthlyLimoOrder::create([
        'month' => $month,
        'date'=>  $currentMonth,
        'monthly_event_order_count' => 0,
        'created_at' => now(),
        'updated_at' => now(),
       ]);
          
        }
        $this->info('Monthly orders processed successfully.');
    }
}