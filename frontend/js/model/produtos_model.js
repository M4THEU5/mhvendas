
$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  $("#cod_barra_input").mask('00000000000000', {reverse: true});
  $("#preco_prazo_input").mask('#.##0,00', {reverse: true});
  $("#preco_vista_input").mask('#.##0,00', {reverse: true});
  var line = '';
  $.ajax({
	    url : link_api+"/api/produtos/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	for(var i = 0; i < data.length; i++){
	    		line += "<tr><th scope='row'>"+data[i].id+"</th><td>"+data[i].descricao+"</td><td>"+data[i].codigo_barras+"</td><td><a href='#' data-toggle='modal' data-whatever='"+data[i].usuarios_id+"' data-target='#modal_info_user' >"+data[i].usuarios_id+"</a></td><td>"+data[i].status+"</td><td><button id='btn-editar' value='"+data[i].id+"' type='button' class='btn btn-primary'>Editar</button>  <button type='button' id='btn-excluir' data-toggle='modal' data-target='#modal_accept' data-whatever='"+data[i].id+"' class='btn btn-danger'>Excluir</button>  <button type='button' data-toggle='modal' data-target='#modal_info' data-whatever='"+data[i].id+"' class='btn btn-success'>Visualizar</button></td></tr>";	
 	    	}

	    	$("#result-table").html(line);
    	},
    	error : function(error){
    		window.location.href = "login.html";
    	}
	});
});


$("#produto_form").submit(function(e){
	e.preventDefault();
	var method = '';
	var url_link = '';
	if($("#btn-adicionar").val() == 0){
		method = 'POST';
		url_link = link_api+"/api/produtos/";
	}else{
		method = 'PUT';
		url_link = link_api+"/api/produtos/"+$("#btn-adicionar").val();
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
	    url : link_api+"/api/produtos/"+id,
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
    url : link_api+"/api/produtos/"+id,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	$('body').loadingModal('destroy');
    	$("#modal-info-produto").html("ID : "+data.id + "<br>" + "DESCRIÇÃO : " + data.descricao + "<br>" + "DETALHAMENTO : " + data.detalhamento + "<br>" + "PREÇO A VISTA  : R$" + data.preco_vista + "<br>" + "PREÇO A PRAZO : R$" + data.preco_prazo + "<br>" + "CODIGO DE BARRAS : " + data.codigo_barras + "<br>" + "STATUS : " + data.status + "<br>" + "CRIADO POR / ULTIMO A MODIFICAR : " + data.usuarios_id + "<br>" + "CRIADO EM  : " + data.created_at + "<br>" + "MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
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
    url : link_api+"/api/produtos/"+this.value,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	$("#descricao_input").val(data.descricao);
    	$("#detalhamento_input").val(data.detalhamento);
    	$("#preco_vista_input").val(data.preco_vista);
    	$("#preco_prazo_input").val(data.preco_prazo);
    	$("#cod_barra_input").val(data.codigo_barras);
    	$('#select-status').val(data.status);
    	$("#btn-adicionar").html("Alterar Produto");
    	$("#btn-adicionar").val(data.id);

	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});