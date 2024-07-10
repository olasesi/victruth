<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'limo_ride',
        'event_planners',
        'caterers',        
        'cakes',
        'drink_suppliers',
        'servers_waiters',
        'makeup_artists',
        'venues',
        'hall_decorators',
        'photographers_video',
        'aso_ebi',
        'printers',
        'souvenirs_gifts',
        'customer_id'
        
    ];

    //  protected $hidden = [
    //      'id',
    //      'customer_id',
    //      'updated_at',
    //      'password',
    //      'remember_token',
    //      'verification_code'

        
    //  ]; 


    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d M Y');
    }


    public function categorySections()
    {
        return $this->belongsToMany(CategorySection::class);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);

    }
}