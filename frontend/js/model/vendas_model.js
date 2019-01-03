
$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  $("#quantidade_input").mask('0000', {reverse: true});
  $("#preco_input").mask('#.##0,00', {reverse: true});
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
	    		line += "<tr><th scope='row'>"+data[i].id+"</th><td>"+data[i].nome+"</td><td>"+data[i].cpf+"</td><td><a href='#' data-toggle='modal' data-whatever='"+data[i].usuarios_id+"' data-target='#modal_info_user' >"+data[i].usuarios_id+"</a></td><td>"+data[i].status+"</td><td><button id='btn-editar' value='"+data[i].id+"' type='button' class='btn btn-primary'>Editar</button>  <button type='button' id='btn-excluir' data-toggle='modal' data-target='#modal_accept' data-whatever='"+data[i].id+"' class='btn btn-danger'>Excluir</button>  <button type='button' data-toggle='modal' data-target='#modal_info' data-whatever='"+data[i].id+"' class='btn btn-success'>Visualizar</button></td></tr>";	
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
	    url : link_api+"/api/clientes/"+id,
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
    url : link_api+"/api/clientes/"+id,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	$('body').loadingModal('destroy');
    	$("#modal-info-cliente").html("ID : "+data.id + "<br>" + "NOME : " + data.nome + "<br>" + "CPF : " + data.cpf + "<br>" + "RG : " + data.rg + "<br>" + "Endereço : " + data.endereco + "<br>" + "NUMERO : " + data.numero + "<br>" + "RENDA : R$" + data.renda + "<br>" + "CRIADO POR / ULTIMO A MODIFICAR : " + data.usuarios_id + "<br>" + "ESTADO  : " + data.estado + "<br>" + "CIDADE  : " + data.cidade + "<br>" + "STATUS  : " + data.status + "<br>" + "CRIADO EM  : " + data.created_at + "<br>" + "MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});


$('#modal_info_user').on('show.bs.modal', function(e) {

    var id = $(e.relatedTarget).data('whatever');
	show_loading();
	$.ajax({
    url : link_api+"/api/usuarios/"+id,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	$("#modal-info-usuario").html("ID : "+data.id + "<br>" + "NOME : " + data.nome + "<br>" + "Matricula : " + data.matricula + "<br>" + "email : " + data.email);
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
    url : link_api+"/api/clientes/"+this.value,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	$("#nome_input").val(data.nome);
    	$("#cpf_input").val(data.cpf);
    	$("#endereco_input").val(data.endereco);
    	$("#rg_input").val(data.rg);
    	$("#numero_input").val(data.numero);
    	$("#saldo_input").val(data.renda);
    	$('#select-estados').val(data.estado);
    	$('#select-status').val(data.status);
    	$("#btn-adicionar").html("Alterar Cliente");
    	$("#btn-adicionar").val(data.id);

	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});