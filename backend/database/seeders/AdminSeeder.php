<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([[

            'active'=>1,
            'admin_role_id'=>1,
            'firstname'=>'Admin',
            'lastname'=>'VictruthAdmin',
            'email'=>'victruthventures@gmail.com',
            'business_name'=>'Victruth',
            'password'=>Hash::make('123456'),
            'category_section_id'=>'1',
            'status'=>1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
       
        ]
    );
    }
}