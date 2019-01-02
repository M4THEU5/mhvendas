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
