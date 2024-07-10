<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

       // Event::factory()->count(50)->create();        
    //    DB::table('events')->insert([
    //     [
    //     'customer_id'=>1,
    //     'limo_ride'=> '0',
    //     'event_planners'=>'1',
    //     'caterers'=>'1',
    //     'cakes'=>'1',
    //     'drink_suppliers'=>'0',
    //     'servers_waiters'=>'0',
    //     'makeup_artists'=> '0',
    //     'venues'=> '1',
    //     'hall_decorators'=> '1',
    //     'photographers_video'=>'0',
    //     'aso_ebi'=> '1',
    //     'printers'=> '1',
    //     'souvenirs_gifts'=>'0'
        
    //     ],
    //     [
    //         'customer_id'=>1,
    //         'limo_ride'=> '1',
    //         'event_planners'=>'0',
    //         'caterers'=>'0',
    //         'cakes'=>'1',
    //         'drink_suppliers'=>'1',
    //         'servers_waiters'=>'1',
    //         'makeup_artists'=> '0',
    //         'venues'=> '1',
    //         'hall_decorators'=> '1',
    //         'photographers_video'=>'0',
    //         'aso_ebi'=> '1',
    //         'printers'=> '0',
    //         'souvenirs_gifts'=>'1'
            
    //     ],
    //     [
    //         'customer_id'=>2,
    //         'limo_ride'=> '1',
    //         'event_planners'=>'0',
    //         'caterers'=>'1',
    //         'cakes'=>'1',
    //         'drink_suppliers'=>'1',
    //         'servers_waiters'=>'0',
    //         'makeup_artists'=> '0',
    //         'venues'=> '1',
    //         'hall_decorators'=> '1',
    //         'photographers_video'=>'0',
    //         'aso_ebi'=> '0',
    //         'printers'=> '0',
    //         'souvenirs_gifts'=>'1'
            
    //        ]
    
    // ]);
    }
}