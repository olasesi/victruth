<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AppearanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('appearances')->insert([[
            'id' => 1,
           'name'=>'heading',
           'value'=>'Hire a Limo Now',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 2,
           'name'=>'paragraph1',
           'value'=>'Start designing your landing page here.',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 3,
           'name'=>'paragraph2',
           'value'=>null,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 4,
           'name'=>'slider',
           'value'=>'/storage/assets/images/slider/slider.jpg',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
    
    ]);
    }
}