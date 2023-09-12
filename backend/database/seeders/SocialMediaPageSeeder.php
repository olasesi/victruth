<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SocialMediaPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
            DB::table('social_media_pages')->insert([[
                'id' => 1,
               'social_media_name'=>'Facebook',
               'social_media_url'=>'https://facebook.com/bimbolahammond',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 2,
               'social_media_name'=>'Twitter',
               'social_media_url'=>null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => 3,
               'social_media_name'=>'Instagram',
               'social_media_url'=>null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
           
            [
                'id' => 4,
               'social_media_name'=>'Whatsapp',
               'social_media_url'=>' https://wa.me/+2347084445319',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        
        ]);
        
    }
}