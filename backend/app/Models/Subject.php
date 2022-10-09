<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    protected $table = 'subject';
    protected $primaryKey = 'Subject_id';
    protected $fillable =[
        'IdSubject',
        'Letter',
        'Number',
        'SubjectName',
        'Credit',
        'Type',
        'created_at',
        'updated_at',
    ];
}
