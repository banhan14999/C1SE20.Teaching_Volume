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
        Schema::create('classes', function (Blueprint $table) {
            $table->string('IdClass',50)->primary();
            $table->integer('Year',false,true);
            $table->string('Semester',10);
            $table->string('Grade',10);
            $table->integer('IdSubject',false,true);
            $table->string('IdLecturer',20)->nullable();
            $table->string('TypeClass',20);
            $table->tinyInteger('CreditClass',false,true);
            $table->smallInteger('NumberOfStudent',false,true);
            $table->decimal('Coefficient',10,2,true);
            $table->decimal('SubjectCoefficient',10,2,true);
            $table->tinyInteger('TimeTeaching',false,true);
            $table->string('Unit',20);
            $table->timestamps();
            //$table->unique(['Year', 'Semester', 'IdSubject', 'Grade']);
            $table->foreign('IdSubject')
                  ->references('IdSubject')
                  ->on('subjects')
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();
            $table->foreign('IdLecturer')
                  ->references('IdLecturer')
                  ->on('users')
                  ->cascadeOnUpdate()
                  ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
};
