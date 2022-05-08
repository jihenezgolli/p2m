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
<<<<<<< HEAD
        $this->json('PUT','api/product/2',$product,['Accept'=>'application/json'] )->assertStatus(200);
=======
        $this->json('PUT','api/product/1',$product,['Accept'=>'application/json'] )->assertStatus(200);
>>>>>>> 672a6dee845c43a308ac4dc628c1233c6a8da70f
    }

    public function test_destroy_product (){

<<<<<<< HEAD
        $this->json('DELETE','api/product/55',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_product(){
        $this->get('api/product/53')
=======
        $this->json('DELETE','api/product/42',['Accept'=>'application/json'] )->assertStatus(200);
    }
    public function test_get_by_id_product(){
        $this->get('api/product/41')
>>>>>>> 672a6dee845c43a308ac4dc628c1233c6a8da70f
        ->assertStatus(200)  ;
    }



}
