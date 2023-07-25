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
            'password'=>Hash::make('123456'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [

            'active'=>'1',
            'admin_role_id'=>'2',
            'firstname'=>'admin',
            'lastname'=>'one',
            'email'=>'admin@victruth.com',
            'password'=>Hash::make('123456'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [

            'active'=>'1',
            'admin_role_id'=>'3',
            'firstname'=>'user',
            'lastname'=>'one',
            'email'=>'user@victruth.com',
            'password'=>Hash::make('123456'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],]
    );
    }
}