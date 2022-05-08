<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\orderDetails;
class orderDetailsDetailTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */


    //
    public function test_get_orderDetails(){
        $this->get('api/orderDetail')
        ->assertStatus(200)  ;
    }
    public function test_update_orderDetails(){
<<<<<<< HEAD
        $orderDetails=['orderId'=>'8','productId'=>'4','quantity'=>'1556'];
        $this->json('PUT','api/orderDetail/3',$orderDetails,['Accept'=>'application/json'] )->assertStatus(200);
=======
        $orderDetails=['orderId'=>'8','productId'=>'42','quantity'=>'1236'];
        $this->json('PUT','api/orderDetail/8',$orderDetails,['Accept'=>'application/json'] )->assertStatus(200);
>>>>>>> 672a6dee845c43a308ac4dc628c1233c6a8da70f
    }

    public function test_destroy_orderDetails (){

<<<<<<< HEAD
        $this->json('DELETE','api/orderDetail/1',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_orderDetails(){
        $this->get('api/orderDetail/4')
=======
        $this->json('DELETE','api/orderDetail/2',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_orderDetails(){
        $this->get('api/orderDetail/3')
>>>>>>> 672a6dee845c43a308ac4dc628c1233c6a8da70f
        ->assertStatus(200)  ;
    }

}
