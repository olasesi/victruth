<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LimoMonthlyRevenue extends Model
{
    use HasFactory;
    protected $fillable = [
        'month', // Add the 'month' attribute to the fillable array
        // other fillable attributes...
        'date',
        'monthly_limo_revenue',

    ];
   
}