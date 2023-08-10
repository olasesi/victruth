<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;


class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    //     DB::table('customers')->insert([[

    //         'fullname'=>'olusesi ahmed',
    //         'email'=>'olusesia@gmail.com',
    //         'special_request'=>'I want a special request to use my own driver',
    //         'password'=>Hash::make('123456'),
    //         'event_date'=>'01-01-2001',
    //         'phone'=>'08000000000',
    //         'event_location'=>'Lagos Nigeria',
    //         'created_at' => Carbon::now(),
    //         'updated_at' => Carbon::now()
    //     ],
    //    ]
    // );
    }
}