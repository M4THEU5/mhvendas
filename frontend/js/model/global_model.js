const link_api = "http://localhost:8000";

function show_loading(){
	$('body').loadingModal({
		  position: 'auto',
		  text: 'Aguarde...',
		  color: '#fff',
		  opacity: '0.7',
		  backgroundColor: 'rgb(0,0,0)',
		  animation: 'wave'
	});
}

function create_alert(){
	$("#stage_alert").html("<div class='alert alert-danger' role='alert' id='alert'></div>");
}
function message_alert(message){
	create_alert();
	$("#alert").html(message+"<a href='#'' class='close' data-dismiss='alert' aria-label='close'>&times;</a>");
}

function login_user(token){
	sessionStorage.setItem('token', token);
}

function verify_authentication_exits(page_name){
	if (!(sessionStorage.getItem("token") === null)) {
		console.log(sessionStorage.getItem("token"));
		console.log(sessionStorage.getItem("token"));
		if(page_name==="login"){
			window.location.href = "dashboard.html";
		}				  	
	}else{
		if(page_name==="dashboard"){
			window.location.href = "login.html";
		}
	}
}