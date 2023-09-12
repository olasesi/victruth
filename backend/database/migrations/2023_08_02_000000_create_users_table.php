<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('active')->default('0');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->nullable();
            $table->string('business_name')->nullable();
            $table->text('business_description')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->string('gender')->nullable();
            $table->string('profile_picture')->default('placeholder.png');
            $table->string('username')->nullable();
            $table->string('verification_code')->nullable();
            $table->string('country')->nullable();
            $table->string('website')->nullable();
            $table->string('bio')->nullable();
            $table->string('forget_password')->nullable();
            $table->string('occupation')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->integer('status')->default('0');
            $table->rememberToken();
            $table->string('address')->nullable();
            $table->string('vendor_business_image')->default('/storage/assets/images/logo/logo.png');
            $table->foreignId('category_section_id')->constrained()->onUpdate('cascade');
            $table->unsignedBigInteger('admin_role_id')->default(3);
            $table->foreign('admin_role_id')->references('id')->on('admin_roles')->onUpdate('cascade');
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
        Schema::dropIfExists('users');
    }
}