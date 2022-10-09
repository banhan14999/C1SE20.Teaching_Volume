<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    use HasFactory;
    
    protected $table = "user";
    protected $primaryKey = 'Username';
    public $incrementing = false; //cho key string k bị

    protected $fillable = [
        'Username',
        'Password',
        'IdLecturer',
        'FirstName',
        'LastName',
        'IdFaculty',
        'IdDepartment',
        'IdRole',
        'Remember_token',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'Password',
        'Remember_token',
    ];
}
