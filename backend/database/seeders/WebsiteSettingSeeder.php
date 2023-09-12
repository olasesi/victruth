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
        [
            'id' => 5,
           'name'=>'address',
           'value'=>'UNIT NO. G-02, BLOCK G, GROUND FLOOR, NEW KUJE SHOPPING COMPLEX. KUJE, ABUJA. FCT.',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 6,
           'name'=>'email',
           'value'=>'victruthventures@gmail.com',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 7,
           'name'=>'email2',
           'value'=>'bookings@victruth.com',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 8,
           'name'=>'phone',
           'value'=>'07084445319',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id' => 9,
           'name'=>'phone2',
           'value'=>'09115392616',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
    ]);
    }
}