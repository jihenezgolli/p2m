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
    public function test_update_orderDetails(){
        $orderDetails=['orderId'=>'8','productId'=>'42','quantity'=>'1236'];
        $this->json('PUT','api/orderDetail/8',$orderDetails,['Accept'=>'application/json'] )->assertStatus(200);
    }

    public function test_destroy_orderDetails (){

        $this->json('DELETE','api/orderDetail/2',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_orderDetails(){
        $this->get('api/orderDetail/3')
        ->assertStatus(200)  ;
    }

}
