$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  var line = '';
  $.ajax({
	    url : link_api+"/api/dashboard/",
	    beforeSend: headers,
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	$("#clientes_cadastrados").html(data.clientes+" Cliente(s) Cadastrado(s)");
	    	$("#produtos_cadastrados").html(data.produtos+" Produto(s) Cadastrado(s)");
	    	$("#usuarios_cadastrados").html(data.users+" Usuário(s) Cadastrado(s)");
	    	$("#vendas_cadastradas").html(data.vendas+" Venda(s) Cadastrada(s)");
    	},
    	error : function(error){
    		window.location.href = "login.html";
    	}
	});
});