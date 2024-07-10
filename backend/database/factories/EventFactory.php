<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'customer_id' => '1',
            'limo_ride'=> '0',
            'event_planners'=>'1',
            'caterers'=>'1',
            'cakes'=>'1',
            'drink_suppliers'=>'0',
            'servers_waiters'=>'0',
            'makeup_artists'=> '0',
            'venues'=> '1',
            'hall_decorators'=> '1',
            'photographers_video'=>'0',
            'aso_ebi'=> '1',
            'printers'=> '1',
            'souvenirs_gifts'=>'0'
        ];
    }
}