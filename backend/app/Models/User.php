<?php

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
        'active',
        'role',
        'firstname',
        'lastname',
        'email',
        'password',
        'verification_code',
        'forget_password',
        'remember_token',
        'phone',
        'gender',
        'profile_picture',
        'username',
        'country',
        'website',
        'bio',
        'occupation',
        'zipcode',
        'state',
        'city',
        'address',
        'business_name',
        'admin_role_id',
        'category_section_id',
        'status',
        
        
    ];
    
    protected $visible = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'gender',
        'profile_picture',
        'username',
        'country',
        'website',
        'bio',
        'occupation',
        'zipcode',
        'state',
        'city',
        'address',
        'business_name',
        'category_section_id',
        'category',
        'created_at' 
    ];
   
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d M Y');
    }
}