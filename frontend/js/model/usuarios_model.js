
$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  var line = '';
  $.ajax({
	    url : link_api+"/api/usuarios/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	for(var i = 0; i < data.length; i++){
	    		line += "<tr><th scope='row'>"+data[i].id+"</th><td>"+data[i].nome+"</td><td>"+data[i].matricula+"</td><td>"+data[i].email+"</td><td><button id='btn-editar' value='"+data[i].id+"' type='button' class='btn btn-primary'>Editar</button>  <button type='button' id='btn-excluir' data-toggle='modal' data-target='#modal_accept' data-whatever='"+data[i].id+"' class='btn btn-danger'>Excluir</button>  <button type='button' data-toggle='modal' data-target='#modal_info' data-whatever='"+data[i].id+"' class='btn btn-success'>Visualizar</button></td></tr>";
 	    	}

	    	$("#result-table").html(line);
    	},
    	error : function(error){
    		window.location.href = "login.html";
    	}
	});
});


$("#form_register").submit(function(e){
	e.preventDefault();
	var method = '';
	var url_link = '';
	if($("#btn-adicionar").val() == 0){
		method = 'POST';
		url_link = link_api+"/api/usuarios/";
	}else{
		method = 'PUT';
		url_link = link_api+"/api/usarios/"+$("#btn-adicionar").val();
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
	    url : link_api+"/api/usuarios/"+id,
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
    url : link_api+"/api/usuarios/"+id,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	$('body').loadingModal('destroy');
    	$("#modal-info-usuario").html("ID : "+data.id + "<br>" + "NOME : " + data.nome + "<br>" + "MATRICULA : " + data.matricula + "<br>" + "EMAIL : " + data.email + "<br>" + "CRIADO EM  : " + data.created_at + "<br>" + "MODIFICADO ULTIMA VEZ EM : " + data.updated_at);
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
    url : link_api+"/api/usuarios/"+this.value,
    beforeSend: headers,
    dataType : "json",
    method : "GET",
    success : function(data){
    	console.log(data);
    	$('body').loadingModal('destroy');
    	$("#nome_input").val(data.nome);
    	$("#matricula_input").val(data.matricula);
    	$("#email_input").val(data.email)
    	$("#btn-adicionar").val(data.id);

	},
	error : function(error){
		$('body').loadingModal('destroy');
		message_alert("Ocorreu um erro ao solicitar os dados para o servidor.");
	}
	});
});