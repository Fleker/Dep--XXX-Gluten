var i = 0;
var a = new Array();
function insert(tag, placeholder, description) { 
	if(placeholder == undefined) {
		placeholder = '';
	}
	if(description != undefined) {
		$('.body').append('<span class="description">'+description+'</span><br>');
	}
	if(tag == 'date') {

	}
	else if(tag == 'content') {
		$('.body').append('<textarea id="'+i+'">'+placeholder+'</textarea>');
	}
	else {
		$('.body').append('<input type="text" id="'+i+'" placeholder="'+placeholder+'">');
	}
	a.push(tag);
	i++;
}
function block() {
	$('.body').append('<br><br>');
}
function newLine() {
	$('.body').append('<br>');
}

function output(text) {
	$('.preview').append(text);
}
function center(text) {
	$('.preview').append('<div class="center">'+text+'</div>');
}