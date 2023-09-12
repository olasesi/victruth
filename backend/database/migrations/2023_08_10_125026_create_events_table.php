<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('event_location')->nullable();
            $table->unsignedBigInteger('customer_id'); 
            $table->date('event_date')->nullable();
            $table->text('form_request')->nullable();
            $table->string('event_planners')->nullable();
            $table->string('caterers')->nullable();
            $table->string('cakes')->nullable();
            $table->string('drinks_suppliers')->nullable();
            $table->string('servers_waiters')->nullable();
            $table->string('makeup_artists')->nullable();
            $table->string('venues')->nullable();
            $table->string('hall_decorators')->nullable();
            $table->string('photographers_videos')->nullable();
            $table->string('aso_ebi')->nullable();
            $table->string('printers')->nullable();
            $table->string('souvenirs_gifts')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
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
        Schema::dropIfExists('events');
    }
}