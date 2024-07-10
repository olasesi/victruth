<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            WebsiteSettingSeeder::class,
            CategorySectionSeeder::class,
            AdminRoleSeeder::class,
            AdminSeeder::class, 
            SocialMediaPageSeeder::class,
            AppearanceSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            OrderSeeder::class,
            EventSeeder::class,
            DailyEventOrderSeeder::class,
            MonthlyLimoOrderSeeder::class,
            MonthlyLimoOrderRevenueSeeder::class, 
        ]);
    }
}