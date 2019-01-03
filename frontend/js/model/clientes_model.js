
$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  $("#cpf_input").mask('000.000.000-00', {reverse: true});
  $("#rg_input").mask('00000000000000', {reverse: true});
  $("#numero_input").mask('00000000000000', {reverse: true});
  $("#saldo_input").mask('#.##0,00', {reverse: true});
  var line = '';
  var estados = "<option selected disabled hidden value=''>Selecione o estado</option>";
  $('#exampleModal').on('shown.bs.modal', function () {
  	$('#myInput').trigger('focus')
  });
  $.ajax({
	    url : link_api+"/api/clientes/",
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
	    url : "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	for(var i = 0; i < data.length; i++){
	    		estados += "<option data-id='"+data[i].id+"' value='"+data[i].nome+"'>"+data[i].nome+"</option>";
	    	}

	    	$("#select-estados").html(estados);
    	},
    	error : function(error){
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});
});

$("#select-estados").on('change', function(){
	var cidades = "<option selected disabled hidden value=''>Selecione a cidade</option>";
	show_loading();
	$.ajax({
	    url : "http://servicodados.ibge.gov.br/api/v1/localidades/estados/"+this.selectedOptions[0].getAttribute('data-id')+"/municipios",
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	for(var i = 0; i < data.length; i++){
	    		cidades += "<option value='"+data[i].nome+"'>"+data[i].nome+"</option>";
	    	}

	    	$("#select-cidades").html(cidades);
	    	$("#select-cidades").prop('disabled', false);
	    	$('body').loadingModal('destroy');
    	},
    	error : function(error){
    		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
    	}
	});
});



$("#client_form").submit(function(e){
	e.preventDefault();
	var method = '';
	var url_link = '';
	if($("#btn-adicionar").val() == 0){
		method = 'POST';
		url_link = link_api+"/api/clientes/";
	}else{
		method = 'PUT';
		url_link = link_api+"/api/clientes/"+$("#btn-adicionar").val();
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