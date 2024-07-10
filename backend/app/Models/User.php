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
        'phone',
        'gender',
        'profile_picture',
        'website',
        'bio',
        'occupation',
        'state',
        'city',
        'address',
        'business_name',
        'business_description',
        'admin_role_id',
        'category_section_id',
        'status',
        'facebook',
        'twitter',
        'instagram',
        'expiry_timestamp',
        'charges'
    ];
    
    protected $visible = [
        'admin_role_id',
        'id',
        'status',
        'firstname',
        'lastname',
        'email',
        'phone',
        'gender',
        'verification_code',
        'profile_picture',
        'website',
        'bio',
        'occupation',
        'state',
        'city',
        'business_description',
        'address',
        'business_name',
        'category_section_id',
        'category',
        'created_at',
        'facebook',
        'twitter',
        'instagram',
        'charges',
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
        'expiry_timestamp' => 'datetime',
    ];


    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d M Y');
    }

    public function getStatusAttribute()
    {
        if($this->attributes['status'] === 0){
            return 'Unconfirmed';
        }else{
            return 'Confirmed';
        }
    }

    // public function getShortBusinessDescriptionAttribute()
    // {
    //     // Adjust the length (50 characters) according to your needs
    //     $maxLength = 50;

    //     // Check if the description is longer than the maximum length
    //     if (strlen($this->attributes['business_description']) > $maxLength) {
    //         // Truncate the description and add an ellipsis
    //         return substr($this->attributes['business_description'], 0, $maxLength) . '...';
    //     }

    //     // If the description is already within the limit, return it as is
    //     return $this->attributes['business_description'];
    // }
    
}