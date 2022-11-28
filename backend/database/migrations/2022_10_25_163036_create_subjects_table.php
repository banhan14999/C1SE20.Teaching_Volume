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
        Schema::create('subjects', function (Blueprint $table) {
            $table->integer('IdSubject',true,true);
            $table->string('Letter',20);
            $table->smallInteger('Number',false,true);
            $table->string('SubjectName',200);
            $table->tinyInteger('Credit',false,true);
            $table->string('Type',20);
            $table->timestamps();
            //$table->unique(['Letter','Number']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
    }
};
