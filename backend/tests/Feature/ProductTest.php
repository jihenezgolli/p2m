<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $product= new Product(['name'=>'jihene','categoryId'=>'1','price'=>'123456','description'=>'ffff']);
        $this->assertEquals('jihene',$product->name);
        $this->assertEquals('1',$product->categoryId);
        $this->assertEquals('123456',$product->price);
        $this->assertEquals('ffff',$product->description);

    }
    public function test_show_product()
    {
        $this->get('api/product')
        ->assertStatus(200)  ;}
    public function test_create_product(){
        $response = $this->postJson('/api/product', ['name'=>'jihene','categoryId'=>'1','price'=>'123456','description'=>'ffff']);

        $response
            ->assertStatus(200);

    }
    //
    public function test_update_product(){
        $product=['name'=>'jihene','categoryId'=>'1','price'=>'123456','description'=>'ffff'];
        $this->json('PUT','api/product/2',$product,['Accept'=>'application/json'] )->assertStatus(200);
    }

    public function test_destroy_product (){

        $this->json('DELETE','api/product/46',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_product(){
        $this->get('api/product/2')
        ->assertStatus(200)  ;
    }



}
