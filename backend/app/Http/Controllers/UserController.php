<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $email = User::where('email', $request->input('email'))->first();
        if(!$email){
            $user = User::create($request->all());
            return response()->json(['user' => $user]);
        } else {
            return response()->json(['user' => null]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        return response()->json(['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return response()->json(['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['user' => 0]);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if($user){
            if($request->input('password') == $user->password){
                return response()->json(['user' => $user]);
            } else {
                return response()->json(['user' => 1]);
            }
        } else {
            return response()->json(['user' => 0]);
        }
    }
    public function register(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if($user){
            if($request->input('password') == $user->password){
                return response()->json(['user' => $user]);
            } else {
                return response()->json(['user' => 1]);
            }
        } else {
            return response()->json(['user' => 0]);
        }
    }
}
