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
            SocialMediaPageSeeder::class,
            AppearanceSeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            OrderSeeder::class,
            
           
        ]);
    }
}