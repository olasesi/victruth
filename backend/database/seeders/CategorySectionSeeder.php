<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('category_sections')->insert([[
            'id'=>'1',
            'category'=>'Event Planners',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'2',
            'category'=>'Caterers',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'3',
            'category'=>'Cakes',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'4',
            'category'=>'Drink Suppliers',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'5',
            'category'=>'Servers/Waiters',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'6',
            'category'=>'Make-up Artists',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'7',
            'category'=>'Venues',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'8',
            'category'=>'Hall Decorators',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'9',
            'category'=>'Photographers and Video',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'10',
            'category'=>'Aso-Ebi',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'11',
            'category'=>'Printers',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ],
        [
            'id'=>'12',
            'category'=>'Souvenirs and Gifts',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]
        ]
        
    );
    }
}