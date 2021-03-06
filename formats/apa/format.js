function input() {
	startInput();
	insert('runninghead', 'Running Head (50 c max)')
	insert('title', 'Title (12 w max-<br> for new line)');
	block();
	insert('author', null, 'Please type your name.');
	newLine();
	insert('university', 'Institutional Affiliation', 'University/School');
	block();
	insert('abstract', null, 'Abstract (150-250 w)');
	
	block();
	insert('content');

	toolbarRow(['Character', 'Heading-1', 'Citation', 'Image', 'LongQuote', 'CloseTag']);
	//quote('cite()');
	citationAbstract = true;
}         
function coverPage() {
	$('.previewCover').empty();
	format('cover-header', 'Running Head: RUNNINGHEAD:left PAGE:right');
	coverOutput('<div style="height:3.25in;"></div>');
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
	$('.previewAbstract').empty();
	format('abstract-header', 'RUNNINGHEAD:left PAGE:right');
	abstractOutput(center('Abstract'));
	abstractOutput(o.abstract)
	abstractOutput('<br>&emsp;&emsp;<i>Keywords:</i>&nbsp;'+$('#doctags').val().toLowerCase().replace(' ', ', ', 'gi'));
	
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
                output('<div>&emsp;'+obj.content[i].value+'</div>');
            }
            else {
                output(obj.content[i].value);
            }
            
        }
		//console.log($('.previewFullBody').html());
		format(/*'TopHeader'*/ 'header', 'RUNNINGHEAD:left PAGE:right');
		format('longquote', '<div style="margin-left:0.5in">STYLE</div>');
        //pagination([1, 1, 1, 1], [8.5, 11])
        format('citation', '(LAST, YEAR, p. PAGE)');
		format('citation-play', '(RACT.rSCENE.LINE)')
		format('heading-1', '<br><div class="center"><b>STYLE</b></div>', 'center')
        //format('citation-main', '(PAGE)');
        buildPages();
}

function parseWriting(text) {
    //add more special types of formatting.
    
    
}
function formatBibliography() {
    bibliographyTitle('References');
    for(i in citationsSort) {
		//AUTHORS, Author multiple sources
        bibliography('Book - Print', 'LAST, FIRST. <i>TITLE</i>. EDITION CITY: PUBLISHER, DATE. Print.', i);
    }
}