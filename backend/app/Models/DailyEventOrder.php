<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyEventOrder extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'date', // Add the 'date' attribute to the fillable array
        // other fillable attributes...
        'daily_event_order_count',
    ];
}