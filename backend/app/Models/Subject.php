<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $table = 'subjects';
    protected $fillable =[
        'Subject_id',
        'Letter',
        'Number',
        'Subject_name',
        'Credit',
        'Type',
        'created_at',
        'updated_at',
    ];
}
