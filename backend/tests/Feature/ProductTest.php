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


}
