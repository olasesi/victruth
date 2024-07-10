<?php

namespace App\Providers;

use App\Events\EventOrderCreated;
use App\Events\MonthlyRevenueCreated;
use App\Listeners\UpdateRevenueCount;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use App\Events\MonthlyLimoOrderCreated;
use App\Listeners\UpdateDailyOrderCount;
use App\Listeners\UpdateMonthlyLimoOrderCount;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        EventOrderCreated::class => [
            UpdateDailyOrderCount::class,
        ],

        MonthlyLimoOrderCreated::class => [
            UpdateMonthlyLimoOrderCount::class,
        ],
        
        MonthlyRevenueCreated::class => [
            UpdateRevenueCount::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}