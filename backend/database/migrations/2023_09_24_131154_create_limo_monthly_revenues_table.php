<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLimoMonthlyRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('limo_monthly_revenues', function (Blueprint $table) {
            $table->id();
            $table->string('month');
            $table->date('date');
            $table->integer('monthly_limo_revenue')->default(0);
            $table->timestamps();
        });
    }
   
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('limo_monthly_revenues');
    }
}