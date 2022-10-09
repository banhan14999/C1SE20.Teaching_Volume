<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = "role";
    protected $primaryKey = 'IdRole';
   // public $incrementing = false; //cho key string k bị mất

    protected $fillable = [
        'IdRole',
        'RoleName',
        'Description',
        'created_at',
        'updated_at'
    ];
}
