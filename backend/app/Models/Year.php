<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    use HasFactory;
    protected $primaryKey = "start";
    
    protected $fillable = [
        "start",
        "finish",
    ];
}
