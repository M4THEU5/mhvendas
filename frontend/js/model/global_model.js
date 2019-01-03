const link_api = "http://localhost:8000";
const headers = function(request) {
		    request.setRequestHeader("Authorization", "Bearer "+sessionStorage.getItem("token"));
		    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    request.setRequestHeader("Accept", "application/json");
};

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
		if(page_name==="login"){
			window.location.href = "dashboard.html";
		}				  	
	}else{
		if(page_name==="dashboard"){
			window.location.href = "login.html";
		}
	}
}

function formDataToJSON(formElement) {    
    var formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function(value, key) {
    	if(key == "renda" || key == "preco_vista" || key == "preco_prazo" || key == "valor_total"){
    		value = value.replace(".","").replace(",","");
    	}
        convertedJSON[key] = value;
    });

    return convertedJSON;
}
