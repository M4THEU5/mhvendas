<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProdutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('descricao',45);
            $table->string('detalhamento');
            $table->float('preco_vista');
            $table->float('preco_prazo');
            $table->integer('codigo_barras');
            $table->integer('usuarios_id')->unsigned();
            $table->foreign('usuarios_id')->references('id')->on('usuarios');
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
        Schema::dropIfExists('produtos');
    }
}
