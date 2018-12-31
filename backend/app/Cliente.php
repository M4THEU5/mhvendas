<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $fillable = ['nome','cpf','rg','endereco','numero','estado','cidade','renda','usuarios_id','status'];
}
