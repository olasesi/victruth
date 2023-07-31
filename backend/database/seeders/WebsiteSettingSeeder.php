<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebsiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('website_settings')->insert([[
            'id' => 1,
           'name'=>'website name',
           'value'=>'Victruth',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 2,
           'name'=>'logo',
           'value'=>'/storage/assets/images/logo/logo.png',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 3,
           'name'=>'fav logo',
           'value'=>'/storage/assets/images/logo/fav.png',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
       
        [
            'id' => 4,
           'name'=>'meta description',
           'value'=>'Victruth',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
    
    ]);
    }
}