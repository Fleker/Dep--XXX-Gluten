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
function divInsert(type) {   
    if(type == 'Citation') {
        launchCitation();
    }
}

citations = new Array();
function launchCitation(index, quote) {
    if(index == undefined) {
        cursorInsert('<u class="citation" data-id="'+citations.length+'" ondblclick="launchCitation('+citations.length+')">QUOTE&nbsp;</u>'+quote);
    }
    else {
        //preload
    }
        //$('.citation').show();
    card('citation', 'Citing a Reference');
    var cardCiteActive = false;
    o = 'What do you want to cite?<br><input class="citelist" type="text" list="citelist">';
    o = o + '<datalist id="citelist">\n\
                <option value="Article Online">\n\
                <option value="Book - Print">\n\
                <option value="Book - Online">\n\
                <option value="Book - eBook Reader">\n\
                <option value="Book - Database">\n\
                <option value="eBook">\n\
                <option value="Encyclopedia">\n\
                <option value="Online Article">\n\
                <option value="Newspaper">\n\
                <option value="Podcast">\n\
                <option value="Website - Blog">\n\
                <option value="Website - Book">\n\
                <option value="Website - Image">\n\
            </datalist>';
    $('.cardBorder').append(o);
    $('.citelist')[0].focus();
    citeCard(cardCiteActive);
    
    $(".citelist").bind("input contextmenu invalid", function(event) {
        var t = new Date();
        if(t.getMonth() + 1 < 10)
            month = '0' + (t.getMonth() + 1);
        else
            month = t.getMonth() + 1;
        if(t.getDate() < 10)
            date = '0' + t.getDate();
        else
            date = t.getDate();
        window.today = t.getFullYear() + '-' + month + '-' + date;
        //today = new Date().toJSON().substring(0,10);
        //today = t.toLocaleDateString();
        
        var title = '<input type="text" placeholder="Title" style="width: 30em">';
        var description = '<input type="text" style="width:35em" placeholder="If no official title, please describe">';
        var bookpub = '<br>&emsp;<input type="text" placeholder="Volume" style="width: 5em">&nbsp;<input type="text" placeholder="Edition" style="width: 6em">&nbsp;<input type="text" placeholder="Series">';
        var author = '<br>&emsp;Author: <input type="text" placeholder="First">&nbsp;<input type="text" placeholder="M" style="width: 2em">&nbsp;<input type="text" placeholder="Last">';
        var publication = '<br>&emsp;Publication: <input type="text" placeholder="Publisher">&nbsp;<input type="text" placeholder="City">&nbsp;<input type="text" placeholder="Year" style="width: 4em">';
        var website = '<br>&emsp;Website: <input type="text" placeholder="Website Title">&nbsp;<input type="text" placeholder="Online Publisher"><br>&emsp;&nbsp;<input placeholder="URL">';
        var pubdate = '<br>&emsp;&emsp;Published on: <input type="date">';
        var accdate = '<br>&emsp;&emsp;Accessed on: <input type="date" value='+today+'>';
        var database = '<br>&emsp;Database: <input placeholder="Database Name">&nbsp;<input type="url" placeholder="url" style="width: 30em">';
        var medium = '<br>&emsp;<input placeholder="Medium">';
        
        
        
        z = $('.citelist').val();
        if(z == 'Book - Print') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication);
            citeCardOK();
        }
        else if(z == 'Book - Online') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+website+pubdate+accdate);
            citeCardOK();
        }
        else if(z == 'Book - eBook' || z == 'eBook' || z == 'Website - Book') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+medium);
            citeCardOK();
        }
        else if(z == 'Book - Database') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+database);
            citeCardOK();
        }
        else if(z == 'Website - Blog') {
            $('.citecard').html('\n\
                '+title+author+website+pubdate+accdate);
            citeCardOK();            
        }
        else if(z == 'Website - Image') {
            $('.citecard').html('\n\
                '+title+description+author+website+pubdate+accdate);
            citeCardOK();
        }
    });
}
function citeCard(cardCiteActive) {
    if(!cardCiteActive)
        $('.cardBorder').append('<div class="citecard"></div>')    
    cardCiteActive = true;
}
function citeCardOK() {
    $('.citecard').append('<br><button onclick="hideCard();citeSubmit();">Add Citation</button>');    
}
function citeSubmit() {
    citations.push({});
    
}
//Tim Down -- http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
function getCharacterOffsetWithin(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNode(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;
    while (treeWalker.nextNode()) {
        charCount += treeWalker.currentNode.length;
    }
    if (range.startContainer.nodeType == 3) {
        charCount += range.startOffset;
    }
    return charCount;
}
var savedRange;
function cursorPos() {
    var range = window.getSelection().getRangeAt(0);
    var el = document.getElementsByClassName("input")[0];
    
    
    if(window.getSelection)//non IE Browsers
    {
        savedRange = window.getSelection().getRangeAt(0);
    }
    else if(document.selection)//IE
    { 
        savedRange = document.selection.createRange();  
    }  
    
    
    return getCharacterOffsetWithin(range, el);  
}
function cursorInsert(text) {
    var p = cursorPos();
    $('.input').html($('.input').html().substring(0,cursorPos()) + text + $('.input').html().substring(cursorPos()));
    setCursorPos(savedRange);
}
function setCursorPos(savedRange) {
    isInFocus = true;
    document.getElementsByClassName("input")[0].focus();
    if (savedRange != null) {
        if (window.getSelection)//non IE and there is already a selection
        {
            var s = window.getSelection();
            if (s.rangeCount > 0) 
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        else 
            if (document.createRange)//non IE and no selection
            {
                window.getSelection().addRange(savedRange);
            }
            else 
                if (document.selection)//IE
                {
                    savedRange.select();
                }
    }
}