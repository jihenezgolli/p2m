<?php

namespace Tests\Feature;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\TestResponse;


class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user= new User(['name'=>'jihene','email'=>'jihene@gmail.com','password'=>'123456','userType'=>'user']);
        $this->assertEquals('jihene',$user->name);
        $this->assertEquals('jihene@gmail.com',$user->email);
        $this->assertEquals('123456',$user->password);

    }
    public function test_show_users()
    {
        $this->get('api/user')
        ->assertStatus(200);
        }
    public function test_register_user(){
        $user=['name'=>'jihene','email'=>'jihene@gmail.com','password'=>'123456','userType'=>'user'];
        $response=$this->call ('POST', '/api/register', ['Accept'=>'application/json'])
        ->assertStatus(302);

        //$response->assertStatus($response->status(),200);
       // $this->assertTrue(true);

    }
    public function test_login_user() {
        $user=['email'=>'jihene@gmail.com','password'=>'123456',];
        $this->json('POST','api/login',$user,['Accept'=>'application/json'])->assertStatus(200);

    }
    public function test_edit_user (){
        $user=['name'=>'jihene','email'=>'jihene@gmail.com','password'=>'123456'];
        $this->json('PUT','api/user/3',$user,['Accept'=>'application/json'] )->assertStatus(200);

    }
    public function test_destroy_user (){

        $this->json('DELETE','api/user/4' )->assertStatus(200);
    }


    }





