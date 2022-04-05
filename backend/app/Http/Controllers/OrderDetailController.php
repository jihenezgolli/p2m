<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderDetail;
use App\Models\Product;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $orderDetails = OrderDetail::all();
        return response()->json(['orderDetails' => $orderDetails]);

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

        // $orderDetail = OrderDetail::create($request->all());
        $orderDetail = new OrderDetail;
        $orderDetail->orderId = $request->input('orderId');
        $orderDetail->productId = $request->input('id');
        $orderDetail->quantity = $request->input('quantity');
        $orderDetail->save();
        return response()->json(['orderDetail' => $orderDetail]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $orderDetails = OrderDetail::where('orderId', '=', $id)->with('product')->get();;
        return response()->json(['orderDetails' => $orderDetails]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $orderDetail = OrderDetail::find($id);
        return response()->json(['orderDetail' => $orderDetail]);

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

        $orderDetail = OrderDetail::find($id);
        $orderDetail->quantity = $request->input('quantity');
        $orderDetail->save();
        return response()->json(['orderDetail' => $orderDetail]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        OrderDetail::destroy($id);
        return response()->json(['orderDetail' => 0]);
    }
}
