<?php

namespace App\Http\Controllers;

use App\Produto;
use App\Cliente;
use App\Venda;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Exception;
class DashBoardController extends Controller
{

    public function info(){
        $produtos = Produto::all();
        $clientes = Cliente::all();
        $vendas = Venda::all();
        $users = User::all();

        $result = [];
        $result['produtos'] = $produtos->count();
        $result['vendas'] = $vendas->count();
        $result['users'] = $users->count();
        $result['clientes'] = $clientes->count();
        return response()->json($result, 200);
        
    }

}