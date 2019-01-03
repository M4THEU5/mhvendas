<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('produtos_id')->unsigned();
            $table->integer('clientes_id')->unsigned();
            $table->foreign('produtos_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('clientes_id')->references('id')->on('clientes')->onDelete('cascade');
            $table->integer('quantidade')->unsigned();
            $table->enum('forma_pagamento', array('DINHEIRO', 'CARTAO', 'CHEQUE','BOLETO'));
            $table->dateTime('data');
            $table->integer('valor_total');
            $table->integer('usuarios_id')->unsigned();
            $table->foreign('usuarios_id')->references('id')->on('usuarios')->onDelete('cascade');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendas');
    }
}
