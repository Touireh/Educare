<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /*public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->accessToken;
            return response()->json(['access_token' => $token]);
        } else {
            return response()->json(['error' => 'Invalid email or password']);
        }

    }




public function login(Request $request)
{
    $email = $request->input('email');
    $password = $request->input('password');

    $user = User::where('email', $email)->first();

    if (!$user || !password_verify($password, $user->password)) {
        return response()->json(['error' => 'Invalid email or password']);
    }

    return response()->json(['name' => $user->name]);
}*/

/*public function login(Request $request)
{
    $email = $request->input('email');
    $password = $request->input('password');

    $user = User::where('email', $email)->first();

    if (!$user || !password_verify($password, $user->password)) {
        return response()->json(['error' => 'Invalid email or password']);
    }

    return response()->json(['name' => $user->name]);
}

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out']);
    }*/
}

