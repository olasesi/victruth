<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Console\Command;
use App\Models\LimoMonthlyRevenue;
use Illuminate\Support\Facades\DB;

class ProcessLimoMonthlyRevenue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:monthly-limo-revenue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process limo monthly revenues';

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
    $this->info('Processing monthly limo revenues...');

    $currentMonth = now()->subMonth()->toDateString();
    $month = now()->subMonth()->format('F');
    // Calculate the monthly event order count
   
    $monthlyLimoRevenue = LimoMonthlyRevenue::where('month', $month)->first();
    
    // Update or insert the monthly limo revenue in the database based on the month
    
      if (!$monthlyLimoRevenue) {
    LimoMonthlyRevenue::create([
        'month' => $month,
        'date' => $currentMonth,
        'monthly_limo_revenue' => 0,
        'created_at' => now(),
        'updated_at' => now(), // Start with 0 for days with no orders
    ]);
   
} 
    $this->info('Monthly limo revenues processed successfully.');
}
}