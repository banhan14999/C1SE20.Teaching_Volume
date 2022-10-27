<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
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
            $table->string('Username',100)->unique();
            $table->string('Password');
            $table->string('IdLecturer')->unique()->nullable();
            $table->string('FirstName');
            $table->string('LastName');
            $table->string('IdFaculty',20)->nullable();
            $table->string('IdDepartment',20)->nullable();
            $table->tinyInteger('IdRole',false,true)->nullable();
            $table->rememberToken();
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
};
