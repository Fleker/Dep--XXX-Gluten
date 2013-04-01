function input() {
	insert('title', 'Title');
	newLine();
	insert('author', null, 'Please type your name.');
	block();
	insert('class', 'Name of the class');
	newLine();
	insert('teacher', 'Name of the teacher');
	newLine();
	insert('due', 'Due Date', 'dd Month yyyy');
	block();
	insert('content');

	toolbarRow(['Character', 'Header', 'Citation', 'Image', 'Long Quote']);
	//quote('cite()');
}         

function build(obj) {
	//format the header
        //output('<div style="line-height: 2em">');
        doubleSpace();
	output(obj.author.firstname + ' ' + obj.author.lastname);
		newLine(1);
	output(obj.class);
		newLine(1);
	output(obj.teacher);
		newLine(1);
	output(obj.due);
		newLine(1);
	center(obj.title);
		//newLine();
        //for all in obj.content
	output(obj.content);
        for(i in obj.content) {
            if(obj.content[i].type == 'paragraph') {
                output('&emsp;'+obj.content[i].value+'<br>');
            }
            else {
                output('<br>'+obj.content[i].value);
            }
            
        }
        //pagination([1, 1, 1, 1], [8.5, 11])
        format('citation', '(LAST PAGE)');
        format('citation-main', '(PAGE)');
        buildPages();
}

function parseWriting(text) {
    //add more special types of formatting.
    
    
}
function formatBibliography() {
    bibliographyTitle('Works Cited');
    for(i in citations) {
        bibliography('Book - Print', '<i>TITLE</i>', i);
    }
}