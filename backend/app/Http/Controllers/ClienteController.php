<?php

namespace App\Http\Controllers;

use App\Cliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
class ClienteController extends Controller
{

    public function listar_cliente($id){
        try{
            return response()->json(Cliente::findOrFail($id),200); 
        } catch(Exception $e){
            return response()->json(['error' => 'Cliente não encontrado'], 400);
        }
        
    }

    public function listar_clientes(Request $request){
        return response()->json(Cliente::all(),200);
    }
    
    public function cadastrar_cliente(Request $request)
    {    
       try{
           $cliente = new Cliente();
           $cliente->fill($request->all());
           $cliente->save();
           return response()->json($cliente, 201);
       }catch(Exception $e){
            return response()->json(['error' => $e], 400);
        }
    }

    public function remover_cliente($id){
        try{
            $cliente = Cliente::findOrFail($id);
            $cliente->delete();
            return response()->json('Success', 200);
        } catch(Exception $e){
            return response()->json(['error' => 'Cliente não encontrado'], 400);
        }
    }

    public function editar_cliente(Request $request, $id){
        try{
            $cliente = Cliente::findOrFail($id);
            $cliente->fill($request->all());
            $cliente->save();
            return Response()->json($cliente,200);
        }catch(Exception $e){
            return response()->json(['error' => 'Cliente não encontrado ou dados invalidos.'], 400);
        }       
    }
}