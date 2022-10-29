<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;
    protected $primaryKey = "IdClass";
    public $incrementing = false; 
    
    protected $guarded = [];
}
