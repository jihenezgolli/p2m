<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $fillable = [
        'title',
        'description'
       ];

    public function product(){
        return $this->hasMany('App\Product', 'id');
    }
}
