<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    use HasFactory;
    
    protected $table = "users";
    protected $primaryKey = 'Username';
    public $incrementing = false; //cho key string k bị

    protected $fillable = [
        'Username',
        'Password',
        'Lecturer_id',
        'Firstname',
        'Lastname',
        'Faculty_id',
        'Department_id',
        'Role_id',
        'Remember_token',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'Password',
        'Remember_token',
    ];
}
