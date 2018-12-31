<?php

namespace App\Http\Controllers;

use App\Venda;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
class VendaController extends Controller
{

    public function listar_venda($id){
        try{
            return response()->json(Venda::findOrFail($id),200); 
        } catch(Exception $e){
            return response()->json(['error' => 'Venda não encontrado'], 400);
        }
        
    }

    public function listar_vendas(Request $request){
        return response()->json(Venda::all(),200);
    }
    
    public function cadastrar_venda(Request $request)
    {    
       try{
           $venda = new Venda();
           $venda->fill($request->all());
           $venda->save();
           return response()->json($venda, 201);
       }catch(Exception $e){
            return response()->json(['error' => $e], 400);
        }
    }

    public function remover_venda($id){
        try{
            $venda = Venda::findOrFail($id);
            $venda->delete();
            return response()->json('Success', 200);
        } catch(Exception $e){
            return response()->json(['error' => 'Venda não encontrado'], 400);
        }
    }

    public function editar_venda(Request $request, $id){
        try{
            $venda = Venda::findOrFail($id);
            $venda->fill($request->all());
            $venda->save();
            return Response()->json($venda,200);
        }catch(Exception $e){
            return response()->json(['error' => 'Venda não encontrado ou dados invalidos.'], 400);
        }       
    }
}