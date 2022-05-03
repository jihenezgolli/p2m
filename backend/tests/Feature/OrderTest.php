<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Order;
class OrderTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $order= new Order(['userId'=>'1','total'=>'1']);
        $this->assertEquals('1',$order->userId);
        $this->assertEquals('1',$order->total);
    }
    public function test_create_order(){
        $response = $this->postJson('/api/order', ['userId'=>'3','total'=>'1']);

        $response ->assertStatus(200);

    }
    //
    public function test_update_order(){
        $order=['userId'=>'3','total'=>'1'];
        $this->json('PUT','api/order/5',$order,['Accept'=>'application/json'] )->assertStatus(200);
    }

    public function test_destroy_order (){

        $this->json('DELETE','api/order/6',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_order(){
        $this->get('api/order/8')
        ->assertStatus(200)  ;
    }
}
