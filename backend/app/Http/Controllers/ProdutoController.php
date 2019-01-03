<?php

namespace App\Http\Controllers;

use App\Produto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
class ProdutoController extends Controller
{

    public function listar_produto($id){
        try{
            return response()->json(Produto::findOrFail($id),200); 
        } catch(Exception $e){
            return response()->json(['error' => 'Produto não encontrado'], 400);
        }
        
    }

    public function listar_produtos(Request $request){
        return response()->json(Produto::all(),200);
    }
    
    public function cadastrar_produto(Request $request)
    {    
       try{
           $produto = new Produto();
           $request['usuarios_id'] = $request->user()->id;
           $produto->fill($request->all());
           $produto->save();
           return response()->json($produto, 201);
       }catch(Exception $e){
            return response()->json(['error' => $e], 400);
        }
    }

    public function remover_produto($id){
        try{
            $produto = Produto::findOrFail($id);
            $produto->delete();
            return response()->json('Success', 200);
        } catch(Exception $e){
            return response()->json(['error' => 'Produto não encontrado'], 400);
        }
    }

    public function editar_produto(Request $request, $id){
        try{
            $produto = Produto::findOrFail($id);
            $produto->fill($request->all());
            $produto->save();
            return Response()->json($produto,200);
        }catch(Exception $e){
            return response()->json(['error' => 'Produto não encontrado ou dados invalidos.'], 400);
        }       
    }
}