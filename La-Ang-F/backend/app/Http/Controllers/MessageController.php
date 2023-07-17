<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Message::select('id','name', 'email', 'message')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'message' => 'required'
        ]);
        Message::create($request->post());
             return response()->json([
                 'message' => 'new item added successfully'
             ]);

    }

    public function show(Message $message)
    {
        return response()->json([
            'message' => $message
        ]);
    }
}
