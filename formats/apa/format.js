function input() {
	startInput();
	insert('runninghead', 'Running Head (50 c max)')
	insert('title', 'Title (12 w max-<br> for new line)');
	block();
	insert('author', null, 'Please type your name.');
	newLine();
	insert('university', 'Institutional Affiliation', 'University/School');
	block();
	insert('abstract', null, 'Abstract (150-250 c)');
	
	block();
	insert('content');

	toolbarRow(['Character', 'Top Heading', 'Citation', 'Image', 'Long Quote']);
	//quote('cite()');
	citationAbstract = true;
}         
function coverPage() {
	$('.previewCover').empty();
	format('cover-header', 'Running Head: RUNNINGHEAD:left PAGE:RIGHT');
	coverOutput(center(o.title));
		newLine(2);
	coverOutput(center(o.author.firstname + ' ' + o.author.lastname));
		newLine(2);
	coverOutput(center(o.university));
	//AUTHOR NOTE
}
function abstractPage() {
	//**HEADING-1
	//**PROPER PAGINATION OF COVER/ABSTRACT
	format('abstract-header', 'RUNNINGHEAD:left PAGE:RIGHT');
	abstractOutput(center('Abstract'));
	abstractOutput('&emsp;<i>Keywords:</i>&nbsp;'+$('#doctags').val());
	
}

function build(obj) {
	//format the header
        //output('<div style="line-height: 2em">');
        doubleSpace();
	output(center(obj.title));
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
        format('citation', '(LAST, YEAR, p. PAGE)');
		format('heading-1', '<b>STYLE</b>', 'center')
        //format('citation-main', '(PAGE)');
        format('header', 'RUNNINGHEAD:left PAGE:right');
        buildPages();
}

function parseWriting(text) {
    //add more special types of formatting.
    
    
}
function formatBibliography() {
    bibliographyTitle('References');
    for(i in citationsSort) {
        bibliography('Book - Print', '<i>TITLE</i>', i);
    }
}