<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

    // USUARIOS
Route::get('/usuarios/{id}','UserController@listar_usuario')->where('id', '[0-9]+');
Route::get('/usuarios', 'UserController@listar_usuarios');
Route::post('/usuarios', 'UserController@cadastrar_usuario');

    // PRODUTOS
Route::get('/produtos/{id}','ProdutoController@listar_produto')->where('id', '[0-9]+');
Route::get('/produtos', 'ProdutoController@listar_produtos');
Route::post('/produtos', 'ProdutoController@cadastrar_produto');
Route::delete('/produtos/{id}', 'ProdutoController@remover_produto')->where('id', '[0-9]+');  
Route::put('/produtos/{id}', 'ProdutoController@editar_produto')->where('id', '[0-9]+');

    // CLIENTES
Route::get('/clientes/{id}','ClienteController@listar_cliente')->where('id', '[0-9]+');
Route::get('/clientes', 'ClienteController@listar_clientes');
Route::post('/clientes', 'ClienteController@cadastrar_cliente');
Route::delete('/clientes/{id}', 'ClienteController@remover_cliente')->where('id', '[0-9]+');  
Route::put('/clientes/{id}', 'ClienteController@editar_cliente')->where('id', '[0-9]+');

    // CLIENTES
Route::get('/vendas/{id}','VendaController@listar_venda')->where('id', '[0-9]+');
Route::get('/vendas', 'VendaController@listar_vendas');
Route::post('/vendas', 'VendaController@cadastrar_venda');
Route::delete('/vendas/{id}', 'VendaController@remover_venda')->where('id', '[0-9]+');  
Route::put('/vendas/{id}', 'VendaController@editar_venda')->where('id', '[0-9]+'); 