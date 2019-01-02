$("#form_register").submit(function(e){
	e.preventDefault();
	var formData = new FormData($(this)[0]);
	if($("#inputPassword").val() == $("#confirmPassword").val()){
		show_loading();
		$.ajax({
		    url : link_api+"/api/register/",
		    dataType : "json",
		    method : "post",
		    data : formData,
		    contentType : false,
		    processData : false,
		    success : function(data){
		    	$('body').loadingModal('destroy');
		    	$("#nome_user").html("Olá, "+$("#firstName").val());
		    	$("#message_sucess").show();
		    	$("#card").hide();
	    	},
	    	error : function(error){
	    		$('body').loadingModal('destroy');
	    		message_alert("Ocorreu um erro");
	    	}
    	});
	}else{
		message_alert("O campo <strong>senha</strong> não está igual.");
	}	
});
