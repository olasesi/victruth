<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategorySection extends Model
{
    use HasFactory;

    protected $visible = [
        'id',
        'category'
    ];

       public function Events()
    {
        return $this->belongsToMany(Event::class);
    }
}