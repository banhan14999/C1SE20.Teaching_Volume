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
        Schema::create('totalvolume', function (Blueprint $table) {
            $table->string('IdLecturer',20);
            $table->integer('Year', false, true);
            $table->string('Semester', 10);
            $table->decimal('TeachingVolume', 10, 2);
            $table->decimal('ProjectVolume', 10, 2);
            $table->decimal('ExamVolume', 10, 2);
            $table->decimal('ActivitiesVolume', 10, 2);
            $table->decimal('ExamMonitorVolume', 10, 2);
            $table->decimal('GradingVolume', 10, 2);
            $table->decimal('AdvisorVolume', 10, 2);
            $table->decimal('TimeScientificVolume', 10, 2);
            $table->decimal('TotalVolume', 10, 2);
            $table->string('Status', '100');
            //$table->primary(['IdLecturer', 'Year', 'Semester'],'PK_Lec_Year_Sem');
            $table->timestamps();
            $table->foreign('IdLecturer')
                  ->references('IdLecturer')
                  ->on('users')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('totalvolume');
    }
};
