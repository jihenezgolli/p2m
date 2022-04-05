<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class orderDetail extends Model
{
    public $fillable = [
        'orderId',
        'productId',
        'quantity'
       ];

    public function order(){
        return $this->belongsTo('App\Order', 'orderId');
    }

    public function product(){
        return $this->belongsTo('App\Product', 'productId');
    }
}
