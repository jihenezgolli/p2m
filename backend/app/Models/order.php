<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class order extends Model
{
    public $fillable = [
        'userId',
        'total'
       ];

    public function user(){
        return $this->belongsTo('App\User', 'userId');
    }
}
