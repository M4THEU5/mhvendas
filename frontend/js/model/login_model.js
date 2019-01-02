$(window).on('load', function() {
  verify_authentication_exits("login");
});
$("#form_login").submit(function(e){
	e.preventDefault();
	var formData = new FormData($(this)[0]);
	show_loading();
	$.ajax({
	    url : link_api+"/api/login/",
	    dataType : "json",
	    method : "post",
	    data : formData,
	    contentType : false,
	    processData : false,
	    success : function(data){
	    	$('body').loadingModal('destroy');
	    	login_user(data['success']['token']);
	    	window.location.href = "dashboard.html";
    	},
    	error : function(error){
    		$('body').loadingModal('destroy');
    		message_alert("<strong>Matricula</strong> ou <strong>Senha</strong> Invalido(s).");
    	}
	});

});