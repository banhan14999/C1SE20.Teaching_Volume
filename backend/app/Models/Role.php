<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = "role";
    protected $primaryKey = 'Role_id';
   // public $incrementing = false; //cho key string k bị

    protected $fillable = [
        'Role_id',
        'Role_name',
        'Description',
        'created_at',
        'updated_at'
    ];
}
