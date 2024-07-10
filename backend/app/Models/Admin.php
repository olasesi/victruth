<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable implements MustVerifyEmail
{
 use HasApiTokens, HasFactory, Notifiable;

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

}