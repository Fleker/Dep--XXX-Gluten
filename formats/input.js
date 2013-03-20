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
        else if(tag == 'author') {
            $('.body').append('<input type="text" id="'+i+'" placeholder="First Name">&nbsp;&nbsp;<input type="text" id="'+i+'_2" placeholder="Last Name">')
        }
	else if(tag == 'content') {
		//$('.body').append('<textarea id="'+i+'">'+placeholder+'</textarea>');
		$('.body').append('<div class="contentinput"><div class="toolbar bg"></div><div class="input" id="'+i+'"></div></div>');
	}
	else {
		$('.body').append('<input type="text" id="'+i+'" placeholder="'+placeholder+'">');
	}
	a.push(tag);
	i++; 
	
	$('.input').each(function(){
	    this.contentEditable = true;
	});
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


function toolbarRow(arr) {
	$('.toolbar').html('');
	for(i in arr) {
		$('.toolbar').append('&nbsp;<span onclick="divInsert(\''+arr[i]+'\')" class="tool"><b>'+arr[i]+'</b></span>');
	}
}