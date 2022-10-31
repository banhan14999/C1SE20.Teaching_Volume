<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradingExam extends Model
{
    use HasFactory;

    protected $table = "gradingexamvolume";
    public $incrementing = false; 
    
    protected $guarded = [];
}
