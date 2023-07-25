<?php

namespace Database\Seeders;

use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin_roles')->insert([[
            'id'=>'1',
            'user_roles'=>'Super admin',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'2',
            'user_roles'=>'Admin',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'3',
            'user_roles'=>'User',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]
        ]
        
    );
    }
    
}