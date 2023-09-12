<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([[
            'id'=>'1',
            'reference'=>'1234567653',
            'customer_id'=>'1',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        ]);
    }
}