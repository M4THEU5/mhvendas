
$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  $("#quantidade_input").mask('0000', {reverse: true});
  $("#preco_input").mask('#.##0,00', {reverse: true});
  $(".valor").mask('#.##0,00', {reverse: true});
  var line = '';
  var produtos = "<option selected disabled hidden value=''>Selecione o Produto</option>";
  var clientes = "<option selected disabled hidden value=''>Selecione o Cliente</option>";
  $.ajax({
	    url : link_api+"/api/vendas/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	for(var i = 0; i < data.length; i++){
	    		console.log(data[i]);
	    		line += "<tr><th scope='row'>"+data[i].id+"</th><td> <a href='#' data-toggle='modal' data-whatever='"+data[i].produtos_id+"' data-type='produtos' data-target='#modal_info_user'>"+data[i].produtos_id+"</a></td><td> <a href='#' data-toggle='modal' data-whatever='"+data[i].produtos_id+"' data-type='clientes' data-target='#modal_info_user'>"+data[i].clientes_id+"</a></td><td><a href='#' data-toggle='modal' data-whatever='"+data[i].usuarios_id+"' data-target='#modal_info_user' >"+data[i].usuarios_id+"</a></td><td>"+data[i].status+"</td><td><button id='btn-editar' value='"+data[i].id+"' type='button' class='btn btn-primary'>Editar</button>  <button type='button' id='btn-excluir' data-toggle='modal' data-target='#modal_accept' data-whatever='"+data[i].id+"' class='btn btn-danger'>Excluir</button>  <button type='button' data-toggle='modal' data-target='#modal_info' data-whatever='"+data[i].id+"' class='btn btn-success'>Visualizar</button></td></tr>";	
 	    	}

	    	$("#result-table").html(line);
    	},
    	error : function(error){
    		window.location.href = "login.html";
    	}
	});

   $.ajax({
	    url : link_api+"/api/produtos/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	console.log(data);
	    	for(var i = 0; i < data.length; i++){
	    		produtos += "<option data-prazo='"+data[i].preco_prazo+"' data-vista='"+data[i].preco_vista+"' value='"+data[i].id+"'>"+data[i].descricao+"</option>";
	    	}

	    	$("#select-produtos").html(produtos);
    	},
    	error : function(error){
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});

   $.ajax({
	    url : link_api+"/api/clientes/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	console.log(data);
	    	for(var i = 0; i < data.length; i++){
	    		clientes += "<option value='"+data[i].id+"'>ID : "+data[i].id+" NOME : "+data[i].nome+"</option>";
	    	}

	    	$("#select-clientes").html(clientes);
    	},
    	error : function(error){
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});
});

$("#select-produtos").on('change', function (e){
	$("#valor_prazo").val(this.selectedOptions[0].getAttribute('data-prazo'));
	$("#valor_vista").val(this.selectedOptions[0].getAttribute('data-vista'));
	$("#quantidade_input").prop("disabled", false);
	$("#select-status").prop("disabled", false);
	$("#select-pagamento").prop("disabled", false);
	$("#btn-adicionar").prop("disabled", false);

});	

$("#select-pagamento").on('change', function (e){
	console.log(this.value);
	if($(this).val() == 'DINHEIRO'){
		$("#preco_input").val(parseInt($("#valor_vista").val()) * parseInt($("#quantidade_input").val())).trigger('input');
	}else{
		$("#preco_input").val(parseInt($("#valor_prazo").val()) * parseInt($("#quantidade_input").val())).trigger('input');
	}
});	


$(document).on('keyup',"#quantidade_input", function(e){
	if($(this).val() == "0"){$(this).val(1);}
	if($(this).val() != '' && $("#select-pagamento").val() != null){
		if($("#select-pagamento").val() == 'DINHEIRO'){
			$("#preco_input").val(parseInt($("#valor_vista").val()) * parseInt($(this).val())).trigger('input');
		}else{
			$("#preco_input").val(parseInt($("#valor_prazo").val()) * parseInt($(this).val())).trigger('input');
		}
	}else{
		console.log($("#select-pagamento").val());
		$("#preco_input").val("0,00").trigger("input");
	}
});

$("#vendas_form").submit(function(e){
	e.preventDefault();
	var method = '';
	var url_link = '';
	if($("#btn-adicionar").val() == 0){
		method = 'POST';
		url_link = link_api+"/api/vendas/";
	}else{
		method = 'PUT';
		url_link = link_api+"/api/vendas/"+$("#btn-adicionar").val();
	}
	var data = formDataToJSON($(this)[0]);
	show_loading();
	$.ajax({
	    url : url_link,
	    beforeSend: headers,
	    dataType : "json",
	    method : method,
	    data : data,
	    contentType : "application/x-www-form-urlencoded",
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	location.reload();
    	},
    	error : function(error){
    		$('body').loadingModal('destroy');
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});
});
$('#modal_accept').on('show.bs.modal', function(e) {

    var id = $(e.relatedTarget).data('whatever');

  	$(document).on("click", "#excluir-btn-accept", function(event){
  		show_loading();
   		$.ajax({
	    url : link_api+"/api/vendas/"+id,
	    beforeSend: headers,
	    dataType : "json",
	    method : "DELETE",
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	location.reload();
    	},
    	error : function(error){
    		$('body').loadingModal('destroy');
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});
	});
});
$('#modal_info').on('show.bs.modal', function(e) {
    var id = $(e.relatedTarget).data('whatever');
	show_loading();
	$.ajax({
    url : link_api+"/api/vendas/"+id,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	$("#modal-info-venda").html("ID : "+data.id + "<br>" + "PRODUTO : " + data.produtos_id + "<br>" + "FORMA DE PAGAMENTO : " + data.forma_pagamento + "<br>" + "QUANTIDADE : " + data.quantidade + "<br>" + "VALOR TOTAL : R$" + data.valor_total + "<br>" + "CLIENTE : " + data.clientes_id + "<br>" + "VENDEDOR : " + data.usuarios_id + "<br>" + "STATUS  : " + data.status + "<br>" + "CRIADO EM  : " + data.created_at + "<br>" + "MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});


$('#modal_info_user').on('show.bs.modal', function(e) {
	var url = '';
    var id = $(e.relatedTarget).data('whatever');
    if($(e.relatedTarget).data('type') == "produtos"){
    	url = link_api+"/api/produtos/"+id;
    }else if($(e.relatedTarget).data('type') == "clientes"){
    	url = link_api+"/api/clientes/"+id;
    }
    else{
    	url = link_api+"/api/usuarios/"+id
    }
	show_loading();
	$.ajax({
    url : url,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	 if($(e.relatedTarget).data('type') == "produtos"){
    	 	$("#modal-title-user").html("Informações Produto...");
    	 	$("#modal-info-usuario").html("ID : "+data.id + "<br>" + "DESCRIÇÃO : " + data.descricao + "<br>" + "DETALHAMENTO : " + data.detalhamento + "<br>" + "PREÇO A VISTA : R$" + data.preco_vista + "<br>" + "PREÇO A PRAZO : R$" + data.preco_prazo + "<br>" + "CODIGO DE BARRAS : " + data.codigo_barras + "<br>" + "CRIADO / MODIFICADO POR : " + data.usuarios_id + "<br>" + "STATUS : " + data.status + "<br>" + "CRIADO EM : " + data.created_at + "<br>" +"MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
    	 }else if($(e.relatedTarget).data('type') == "clientes"){
    	 	$("#modal-title-user").html("Informações Cliente...");
    	 	$("#modal-info-usuario").html("ID : "+data.id + "<br>" + "NOME : " + data.nome + "<br>" + "CPF : " + data.cpf + "<br>" + "ENDEREÇO : " + data.endereco + "<br>" + "NUMERO : " + data.numero + "<br>" + "RENDA : R$<span class='valor'>" + data.renda + "</span><br>" + "CRIADO / MODIFICADO POR : " + data.usuarios_id + "<br>" + "STATUS : " + data.status + "<br>" + "CRIADO EM : " + data.created_at + "<br>" +"MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
    	 }
    	 else{
    	 	$("#modal-title-user").html("Informações Usuario...");
    	 	$("#modal-info-usuario").html("ID : "+data.id + "<br>" + "NOME : " + data.nome + "<br>" + "Matricula : " + data.matricula + "<br>" + "email : " + data.email);
    	 }	
	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});


$(document).on("click", "#btn-editar", function(event){
	show_loading();
	$.ajax({
    url : link_api+"/api/vendas/"+this.value,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$("#select-produtos").val(data.produtos_id);
    	$("#quantidade_input").val(data.quantidade);
    	$("#select-pagamento").val(data.forma_pagamento);
    	$("#select-clientes").val(data.clientes_id);
    	$("#select-status").val(data.status);
    	$("#preco_input").val(data.valor_total).trigger('input');
		$("#quantidade_input").prop("disabled", false);
		$("#select-status").prop("disabled", false);
		$("#select-pagamento").prop("disabled", false);
		$("#btn-adicionar").prop("disabled", false);
    	$("#btn-adicionar").html("Alterar Venda");
    	$("#btn-adicionar").val(data.id);	
		$.ajax({
			url : link_api+"/api/produtos/"+$("#select-produtos").val(),
			beforeSend: headers,
			dataType : "json",
			method : "GET",
			success: function(data){
				$("#valor_prazo").val(data.preco_prazo);
				$("#valor_vista").val(data.preco_vista);
				$('body').loadingModal('destroy');
			},
		    error : function(error){
				$('body').loadingModal('destroy');
				message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
			}
		});

	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});