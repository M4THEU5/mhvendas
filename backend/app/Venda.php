<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Venda extends Model
{
    protected $table = 'vendas';
    protected $fillable = ['produtos_id','clientes_id','quantidade','forma_pagamento','data','valor_total','usuarios_id','status'];
}
