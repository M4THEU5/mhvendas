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
    public function verify_if_user_email_exits($email){
        $users = User::all();
        
        $user = $users->where('email', $email)->first();
        if($user != ''){
            return true;
        }

        return false;

    }

    public function verify_if_user_matricula_exits($matricula){
        $users = User::all();
        
        $user = $users->where('matricula', $matricula)->first();
        if($user != ''){
            return true;
        }

        return false;
    } 
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
        if($this->verify_if_user_email_exits($request['email'])){
            return response()->json('Já existe um usuario cadastrado com esse email', 406);  
        }
        if($this->verify_if_user_matricula_exits($request['matricula'])){
            return response()->json('Já existe um usuario cadastrado com essa matricula', 406);  
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

    public function remover_usuario(Request $request,$id){
        try{
            if($request->user()->id == $id){
                return response()->json('Você não pode remover seu propio usuario.', 406); 
            }
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json('Success', 200);
        } catch(Exception $e){
            return response()->json(['error' => 'Usuário não encontrado'], 400);
        }
    }

    public function editar_usuario(Request $request, $id){
        try{
            $user = User::findOrFail($id);
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
            
            
            if($user->email != $request['email']){
                if($this->verify_if_user_email_exits($request['email'])){
                    return response()->json('Já existe um usuario cadastrado com esse email', 406);  
                }
            }
            if($user->matricula != $request['matricula']){
                if($this->verify_if_user_matricula_exits($request['matricula'])){
                    return response()->json('Já existe um usuario cadastrado com essa matricula', 406);  
                }
            }
            
            $request['password'] = bcrypt($request['password']);
            $user->fill($request->all());
            $user->save();
            return Response()->json($user,200);
        }catch(Exception $e){
            return response()->json(['error' => $e->getMessage()], 400);
        }       
    }

    public function listar_usuarios(Request $request){
        return response()->json(User::all(),200);
    }

    
    
}