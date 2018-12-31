<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Auth; 
use Validator;

class UserController extends Controller
{

    public $successStatus = 200;

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['matricula' => request('matricula'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('mhvendasapi')-> accessToken; 
            return response()->json(['success' => $success], $this-> successStatus); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }
    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'nome' => 'required', 
            'email' => 'required|email', 
            'password' => 'required',
            'matricula' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('mhvendasapi')-> accessToken; 
        $success['nome'] =  $user->nome;
        return response()->json(['success'=>$success], $this-> successStatus); 
    }
    public function listar_usuario($id){
        try{
            return response()->json(User::findOrFail($id),200); 
        } catch(Exception $e){
            return response()->json(['error' => 'Usuario não encontrado'], 400);
        }
        
    }

    public function listar_usuarios(Request $request){
        return response()->json(User::all(),200);
    }
    
}