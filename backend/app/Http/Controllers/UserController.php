<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;
use Exception;
class UserController extends Controller
{
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
    
    public function cadastrar_usuario(Request $request)
    {
        try {
            $user = new User();
            $user->nome = $request['nome'];
            $user->matricula = $request['matricula'];
            $user->email = $request['email'];
            $user->senha = md5($request['senha']);
            $user->save();
            return response()->json($user,200);
           } catch (Exception $e) {
               return response()->json(['error' => 'Ocorreu um erro, verifique os dados e tente novamente.'], 500);
        }
    }
}