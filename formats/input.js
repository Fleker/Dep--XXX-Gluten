var tagi = 0;
var a = new Array();
function insert(tag, placeholder, description) { 
        console.log(tagi + ' tag:' + ' '+ tag);
	if(placeholder == undefined) {
		placeholder = '';
	}
	if(description != undefined) {
		$('.body').append('<span class="description">'+description+'</span><br>');
	}
	if(tag == 'date') {

	}
        else if(tag == 'author') {
            $('.body').append('<input type="text" id="'+tagi+'" placeholder="First Name">&nbsp;&nbsp;<input type="text" id="'+tagi+'_2" placeholder="Last Name">')
        }
	else if(tag == 'content') {
		//$('.body').append('<textarea id="'+i+'">'+placeholder+'</textarea>');
		$('.body').append('<div class="contentinput"><div class="toolbar bg"></div><div class="input" id="'+tagi+'"></div></div>');
	}
	else {
		$('.body').append('<input type="text" id="'+tagi+'" placeholder="'+placeholder+'">');
	}
	a.push(tag);
	tagi++; 
	
	$('.input').each(function(){
	    this.contentEditable = true;
	});
}
function block(b) {
    if(b)
	$('.previewFullBody').append('<br><br>');
    else
        $('#body').append('<br><br>');
}
function newLine(b) {
    if(b)
	$('.previewFullBody').append('<br>');
    else
        $('#body').append('<br>');
}

function output(text) {
	$('.previewFullBody').append(text);
}
function center(text) {
	$('.previewFullBody').append('<div class="center">'+text+'</div>');
}


function toolbarRow(arr) {
	$('.toolbar').html('');
	for(i in arr) {
		$('.toolbar').append('&nbsp;<span onclick="divInsert(\''+arr[i]+'\')" class="tool"><b>'+arr[i]+'</b></span>');
	}
}
function openTab(url) {
	window.open(url, '_blank');
  	window.focus();
}
function divInsert(type) {   
    if(type == 'Citation') {
        launchCitation();
    } else if(type == 'Character') {
        openTab('http://copypastecharacter.com/classic');
    }
}

citations = new Array();
function launchCitation(index, quote) {
    //$('.citation')[0].getAttribute('data-id')
    if(quote == undefined) {
        quote = '';        
    }
    if(index == undefined) {
        cursorInsert('<u class="citation" data-id="'+citations.length+'" ondblclick="launchCitation('+citations.length+')">QUOTE</u>'+quote+'&nbsp;&nbsp;');
        index = citations.length;
    }
        //$('.citation').show();
    card('citation', 'Citing a Reference');
    var cardCiteActive = false;
    o = 'What do you want to cite?<br><input class="citelist" type="text" list="citelist"id="citeCardType">';
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
    
    if(citations.length != index) {
        $('#citeCardType').val(citations[index].type);
        citeBuilder();
    }
    
    $(".citelist").bind("input contextmenu invalid", function(event) {
        citeBuilder();
    });
    function citeBuilder() {
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
        
        var title = '<input type="text" placeholder="Title" style="width: 30em" id="citeCardTitle">';
        var description = '<input type="text" style="width:35em" placeholder="If no official title, please describe" id="citeCardDescription">';
        var bookpub = '<br>&emsp;<input type="text" placeholder="Page" style="width: 4em" id="citeCardPage">&nbsp;<input type="text" placeholder="Volume" style="width: 5em" id="citeCardVolume">&nbsp;<input type="text" placeholder="Edition" style="width: 6em" id="citeCardEdition">&nbsp;<input type="text" placeholder="Series" id="citeCardSeries">Main Title?<input type="checkbox" id="citeCardMain" value="on">';
        var author = '<br>&emsp;Author: <input type="text" placeholder="First" id="citeCardFirst">&nbsp;<input type="text" placeholder="M" style="width: 2em" id="citeCardM">&nbsp;<input type="text" placeholder="Last" id="citeCardLast">';
        var publication = '<br>&emsp;Publication: <input type="text" placeholder="Publisher" id="citeCardPublisher">&nbsp;<input type="text" placeholder="City" id="citeCardCity">&nbsp;<input type="text" placeholder="Year" style="width: 4em" id="citeCardYear">';
        var website = '<br>&emsp;Website: <input type="text" placeholder="Website Title" id="citeCardWebsite">&nbsp;<input type="text" placeholder="Online Publisher" id="citeCardWebPublisher"><br>&emsp;&nbsp;<input placeholder="URL" id="citeCardUrl">';
        var pubdate = '<br>&emsp;&emsp;Published on: <input type="date" id="citeCardPublished">';
        var accdate = '<br>&emsp;&emsp;Accessed on: <input type="date" value='+today+' id="citeCardAccessed">';
        var database = '<br>&emsp;Database: <input placeholder="Database Name" id="citeCardDatabase">&nbsp;<input type="url" placeholder="url" style="width: 30em" id="citeCardDUrl">';
        var medium = '<br>&emsp;<input placeholder="Medium" id="citeCardMedium">';
              
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
        
        
        if(index != citations.length) {
            //preload
            $('#citeCardTitle').val(citations[index].title);
            $('#citeCardPage').val(citations[index].page);
            $('#citeCardVolume').val(citations[index].volume);
            $('#citeCardEdition').val(citations[index].edition);
            $('#citeCardSeries').val(citations[index].series);
            document.getElementById('citeCardMain').checked = citations[index].main;
                //$('#citeCardMain').val(citations[index].main);
            $('#citeCardFirst').val(citations[index].first);
            $('#citeCardM').val(citations[index].m);
            $('#citeCardLast').val(citations[index].last);
            $('#citeCardPublisher').val(citations[index].publisher);
            $('#citeCardCity').val(citations[index].city);
            $('#citeCardYear').val(citations[index].year);
            $('#citeCardWebsite').val(citations[index].website);
            $('#citeCardWebPublisher').val(citations[index].webpublisher);
            $('#citeCardUrl').val(citations[index].url);
            $('#citeCardPublished').val(citations[index].published);
            $('#citeCardDatabase').val(citations[index].database);
            $('#citeCardDUrl').val(citations[index].durl);
            $('#citeCardMedium').val(citations[index].medium);
            //console.log(citations[index]);
        }
    };
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
    citations.push({
        'type': $('#citeCardType').val(),
        'title': $('#citeCardTitle').val(),
        'page': $('#citeCardPage').val(),
        'volume': $('#citeCardVolume').val(),
        'edition': $('#citeCardEdition').val(),
        'series': $('#citeCardSeries').val(),
        'main': $('#citeCardMain').prop('checked'),
        'first': $('#citeCardFirst').val(),
        'm': $('#citeCardM').val(),
        'last': $('#citeCardLast').val(),
        'publisher': $('#citeCardPublisher').val(),
        'city': $('#citeCardCity').val(),
        'year': $('#citeCardYear').val(),
        'website': $('#citeCardWebsite').val(),
        'webpublisher': $('#citeCardWebPublisher').val(),
        'url': $('#citeCardUrl').val(),
        'published': $('#citeCardPublished').val(),
        'database': $('#citeCardDatabase').val(),
        'durl': $('#citeCardDUrl').val(),
        'medium': $('#citeCardMedium').val()
    });
    
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
    console.log(cursorPos());
    //var p = cursorPos();
    var p = window.cursorposition;
    console.log(p);
    console.log($('.input').html().substring(0,p) + text + $('.input').html().substring(p));
    $('.input').html($('.input').html().substring(0,p) + text + $('.input').html().substring(p));
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