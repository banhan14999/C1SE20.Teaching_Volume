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
        Schema::create('GradingExamVolume', function (Blueprint $table) {
            $table->integer('Year', false, true);
            $table->string('Semester',10);
            $table->string('IdLecturer');
            $table->integer('IdSubject', false, true);
            $table->tinyInteger('Time', false, true);
            $table->string('Unit', 20);
            $table->smallInteger('Number', false, true);
            $table->decimal("CoefficientGradeExam", 10,2);
            $table->string("CategoryVolume", 20);
            $table->timestamps();
            $table->primary(['Year', 'Semester', 'IdLecturer', 'IdSubject', 'Time'], 'PK_LEC_YEAR_SEM_SUB_TIME');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('GradingExamVolume');
    }
};
