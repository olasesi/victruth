<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id'
    ];

    public function categorySections()
    {
        return $this->belongsToMany(CategorySection::class);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);

    }
}