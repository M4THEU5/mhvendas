$(window).on('load', function() {
  verify_authentication_exits('dashboard');
  show_loading();
  var line = '';
  $.ajax({
	    url : link_api+"/api/usuarios/",
	    beforeSend: function(request) {
		    request.setRequestHeader("Authorization", "Bearer "+sessionStorage.getItem("token"));
		    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    request.setRequestHeader("Accept", "application/json");
		},
	    dataType : "json",
	    method : "get",
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	for(var i = 0; i < data.length; i++){
	    		line += "<tr><th scope='row'>"+data[i].id+"</th><td>"+data[i].matricula+"</td><td>"+data[i].nome+"</td><td><button type='button' class='btn btn-primary'>Editar</button>  <button type='button' class='btn btn-danger'>Excluir</button></td></tr>";	
	    	}

	    	$("#result-table").html(line);
    	},
    	error : function(error){
    		window.location.href = "login.html";
    	}
	});
});