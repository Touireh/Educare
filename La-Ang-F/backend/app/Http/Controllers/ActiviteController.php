<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Activite::select('id','name', 'type', 'description')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
            'description' => 'required'
        ]);
        Activite::create($request->post());
             return response()->json([
                 'message' => 'new item added successfully'
             ]);

    }

    public function show(Activite $activite)
    {
        return response()->json([
            'activite' => $activite
        ]);
    }

    public function update(Request $request, Activite $activite)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
            'description' => 'required'
        ]);

        $activite->fill($request->post())->update();
        return response()->json([
            'message' => 'new item updated successfully'
        ]);
    }

    public function destroy(Activite $activite)
    {
        $activite->delete();
        return response()->json([
            'message' => 'this item deleted successfully'
        ]);
    }
}
