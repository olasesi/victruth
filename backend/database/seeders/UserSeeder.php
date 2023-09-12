<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([[

            'active'=>'1',
            'admin_role_id'=>'1',
            'firstname'=>'super admin',
            'lastname'=>'one',
            'email'=>'superadmin@victruth.com',
            'business_name'=>'Victruth',
            'password'=>Hash::make('123456'),
            'category_section_id'=>'1',
            'status'=>'1',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [

            'active'=>'1',
            'admin_role_id'=>'2',
            'firstname'=>'admin',
            'lastname'=>'one',
            'email'=>'admin@victruth.com',
            'business_name'=>'Victruth admin',
            'password'=>Hash::make('123456'),
            'category_section_id'=>'3',
            'status'=>'1',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [

            'active'=>'1',
            'admin_role_id'=>'3',
            'firstname'=>'user',
            'lastname'=>'one',
            'email'=>'user@victruth.com',
            'business_name'=>'Victruth user',
            'password'=>Hash::make('123456'),
            'category_section_id'=>'5',
            'status'=>'0',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],]
    );
    }
}