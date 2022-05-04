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
        $orderDetails=['orderId'=>'8','productId'=>'41','quantity'=>'1236'];
        $this->json('PUT','api/orderDetail/3',$orderDetails,['Accept'=>'application/json'] )->assertStatus(200);
    }

    public function test_destroy_orderDetails (){

        $this->json('DELETE','api/orderDetail/2',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_orderDetails(){
        $this->get('api/orderDetail/8')
        ->assertStatus(200)  ;
    }

}
