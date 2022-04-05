<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json(['products' => $products]);
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

        $name = Product::where('name', $request->input('name'))->first();
        if(!$name) {
            if($request->hasFile('imageFile')){
                $file = $request->file('imageFile');
                $ext = $file->extension();
                $image = time().'.'.$ext;
                $path = public_path().'/uploads/';
                $file->move($path, $image);
            }
            else{
                $image = 'default-image.jpg';
            }
            $product = new Product;
            $product->categoryId = $request->input('categoryId');
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->description = $request->input('description');
            $product->image = $image;
            $product->save();
            $product = Product::with('category')->find($product->id);
            return response()->json(['product' => $product]);
        } else {
            return response()->json(['product' => null]);
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
        $product = Product::with('category')->find($id);
        return response()->json(['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

        $product = Product::find($id);
        if($request->hasFile('imageFile')){
            $path = public_path().'/uploads/';
            if($product->image != 'default-image.jpg') {
                File::delete($path.$product->image);
                $file = $request->file('imageFile');
                $ext = $file->extension();
                $image = time().'.'.$ext;
                $file->move($path, $image);
            } else {
                $file = $request->file('imageFile');
                $ext = $file->extension();
                $image = time().'.'.$ext;
                $file->move($path, $image);
            }
        }
        else{
            $image = $product->image;
        }
        $product->categoryId = $request->input('categoryId');
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->image = $image;
        $product->save();
        $product = Product::with('category')->find($product->id);
        return response()->json(['product' => $product]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $product = Product::find($id);
        $path = public_path().'/uploads/';
        if($product->image != 'default-image.jpg') {
            File::delete($path.$product->image);
            $product->delete();
            return response()->json(['product' => 0]);
        } else {
            $product->delete();
            return response()->json(['product' => 0]);
        }

    }
}
