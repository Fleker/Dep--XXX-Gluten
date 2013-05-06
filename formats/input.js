function startInput() {
	tagi = 0;
	a = new Array();
}
function insert(tag, placeholder, description) { 
        console.log(tagi + ' tag:' + ' '+ tag);
	if(placeholder == undefined) {
		placeholder = '';
	}
	if(description != undefined) {
		$('#body').append('<span class="description">'+description+'</span><br>');
	}
	if(tag == 'date') {

	}
        else if(tag == 'author') {
            $('#body').append('<input type="text" id="'+tagi+'" placeholder="First Name">&nbsp;&nbsp;<input type="text" id="'+tagi+'_2" placeholder="Last Name">')
        }
	else if(tag == 'content') {
		//$('.body').append('<textarea id="'+i+'">'+placeholder+'</textarea>');
		$('#body').append('<div class="contentinput"><div class="toolbar bg"></div><div class="input" id="'+tagi+'"></div></div>');
	} else if(tag == 'abstract') {
		$('#body').append('<textarea id="'+tagi+'"></textarea>');
	}
	else {
		$('#body').append('<input type="text" id="'+tagi+'" placeholder="'+placeholder+'">');
	}
	a.push(tag);
	tagi++; 
	
	$('.input').each(function(){
	    this.contentEditable = true;
	});
}
function block(b) {
    if(b == 1)
		$('.previewFullBody').append('<br><br>');
	else if(b == 2)
		$('.coverBody').append('<br><br>');
	else if(b == 3)
		$('.abstractBody').append('<br><br>');
    else
        $('#body').append('<br><br>');
}
function newLine(b) {
    if(b == 1)
		$('.previewFullBody').append('<br>');
	else if(b == 2)
		$('.coverBody').append('<br>');
	else if(b == 3)
		$('.abstractBody').append('<br>');
    else
        $('#body').append('<br>');
}

function output(text) {
	$('.previewFullBody').append(text);
}
function center(text) {
	//$('.previewFullBody').append('<div class="center">'+text+'</div>');
        return '<div class="center">'+text+'</div>'
}
function coverOutput(text) {
	$('.coverBody').append(text);
}
function abstractOutput(text) {
	$('.abstractBody').append(text);
}


function toolbarRow(arr) {
	$('.toolbar').html('');
	for(i in arr) {
		$('.toolbar').append('&nbsp;<span onclick="divInsert(\''+arr[i]+'\')" class="tool"><b>'+arr[i]+'</b></span>');
		setTimeout("if('"+arr[i].toLowerCase()+"' != 'citation') {hoverTag('"+arr[i].toLowerCase()+"', '"+arr[i].toLowerCase()+"')};", 1000);	
	}
}
function openTab(url) {
	window.open(url, '_blank');
  	window.focus();
}
function divInsert(type) {  
	type = type.replace(' ', '', 'g');
    if(type == 'Citation') {
        launchCitation();
		hoverCitationTag();
		//setTimeout("launchCitation()", 400);
    } else if(type == 'Character') {
        openTab('http://copypastecharacter.com/classic');
	} else if(type == 'CloseTag') {
		cursorInsert('</u>&nbsp;');
    } else if(type == 'LongQuote') {
		cursorInsert('<u class="longquote" style="margin-left:30px">Within these bounds, you may place a quote that is three lines or longer.</u>')
	} 	
	else {
		var extrapre = '';
		var extrapost = '';
		if(type == 'Heading-1') {
			extrapre = '<br>'; 
			extrapost = '<br>';
		} else if(type == 'Longquote') {
			extrapre = '<br>';
			extrapost = '<br>';
		}
		//<!--onmouseover="hoverTag(\''+type.toLowerCase()+'\', \''+type.toLowerCase()+'\');" onmouseout="/*alert(5);*/hideCitationTag()" -->
		cursorInsert(extrapre+'<u class="'+type.toLowerCase()+'">'+type.toUpperCase()+'</u>'+extrapost+'&nbsp;');
		//hoverTag(type, type);
	}
}

//citations = new Array();
function launchCitationTag(index, string, element) {
	if(index == null) 
		index = -1;
	//console.log('x');
	$('.hovertag').css('left', window.mouse.onX-75);
	$('.hovertag').css('top', window.mouse.onY-1);
	//console.log(window.mouse);
	if(element != undefined) {
		//console.log(element);
		$('.hovertag').css('left', element.offsetLeft-scrollX);
		$('.hovertag').css('top', element.offsetTop+20-scrollY);
	}
	$('.hovertag').css('display', 'block');
	//console.log("launchCitation("+index+", "+undefined+", "+element+");");
	
	try {
		console.log('launchCitationx('+index+', "'+element.id+'");');
		$('.hovertag').html('<div class="center" onclick="launchCitationx('+index+', \''+element.id+'\');">'+citations[index].title+'</div>');	
	}
	catch(e) {
		if(string == undefined) 
			$('.hovertag').html('<div class="center" onclick="launchCitationx('+index+', \''+element.id+'\');">Edit citation</div>');
		else
			$('.hovertag').html('<div class="center">'+string+'</div>');
	}
	
}

function hideCitationTag() {
	//$('.hovertag').css('left', -200
	$('.hovertag').css('display', 'none');
}
function hoverTag(string, classname) {
	//live is depreciated, but 'on' doesn't do future items
	
	if(classname != undefined) {
		$('.'+classname).on('mouseenter', function() {
			//!--!
			launchCitationTag(null, string, this)
		});
		$('.'+classname).on('mouseleave', function() {
			hideCitationTag();
		});
		console.log('Hovertagged '+classname+': '+string);
	}
}
function hoverCitationTag() {
	/*$('.citation').hover(
	function() {
		launchCitationTag($(this).attr('data-id'));
	}, function () {
		hideCitationTag();
	}
	);*/
	$('.citation').on('mouseenter', function() {
		launchCitationTag($(this).attr('data-id'), undefined, this);	
		//console.log(); -GET HEIGHT AND WIDTH IN DOC TO INTERACT WITH TAG
	});
	y2 = 0;
	//just having the hideTag code seems to produce a bug where it constantly hides the tag even while properly on the citation.
	$('.citation').on('mouseleave', function() {
		var y = 0;
		y = y+1;
		y2 = y2+1;
		console.log(y)
		if(y2 >= 2) {
			hideCitationTag();
			y = 0;
			y2 = 0;
		}
	});
	$('.hovertag').on('mouseleave', function() {
		hideCitationTag();
	});
	console.log($('.citation'));
}
//setTimeout("hoverCitationTag()", 1000);

//onmouseover="launchCitationTag('+citations.length+')" onmouseout="hideCitationTag()"
function launchCitationx(index, elid) {
	console.log('5x'+elid);
	launchCitation(index, undefined, elid);
	setTimeout("launchCitation("+index+", "+undefined+", "+elid+");", 500);
}
citationIndex = 0;
function launchCitation(index, quote, elid) {
	//hoverCitationTag();
	card('citation', 'Citing a Reference');
	
    //$('.citation')[0].getAttribute('data-id')
	if(citations == undefined) {
		citations = new Array();
		citations.length = 0;
	}
	if(citationsAbstract == undefined) {
		citationsAbstract = false;
	}
    if(quote == undefined) {
        quote = '';        
    }
	if(elid != undefined) {
		console.log('eid: '+elid);
		try{ eid = $('#'+elid); } 
		catch(e) { }
		indexId = eid.attr('id').substr(4);
	}
    if(index == undefined) {
		citationIndex++;
		indexId = citationIndex;
        cursorInsert('<u class="citation" data-id="'+citations.length+'" id="cite'+citationIndex+'">QUOTE</u>'+quote+'. &nbsp;&nbsp;');
		//index = citations.length;
		//citations.push();
		//hoverCitationTag();
    }
        //$('.citation').show();
    
    var cardCiteActive = false;
    out = 'What do you want to cite?<br><input class="citelist" type="text" list="citelist"id="citeCardType">';
    out = out + '<datalist id="citelist">\n\
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
    $('.cardBorder').append(out);
	console.log(out);
    $('.citelist')[0].focus();
    citeCard(cardCiteActive);
	console.log($('.cardBorder'))
    
    if(index != undefined && citations[index] != undefined) {
		console.log(index+' '+citations[index]);
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
        
        var title = '<input type="text" placeholder="Title" list="citetitlelist" style="width: 30em" id="citeCardTitle">';
        var description = '<input type="text" style="width:35em" placeholder="If no official title, please describe" id="citeCardDescription">';
        var bookpub = '<br>&emsp;<input type="text" placeholder="Page" style="width: 4em" id="citeCardPage">&nbsp;<input type="text" placeholder="Volume" style="width: 5em" id="citeCardVolume">&nbsp;<input type="text" placeholder="Edition" style="width: 6em" id="citeCardEdition">&nbsp;<input type="text" placeholder="Series" id="citeCardSeries">Main Title?<input type="checkbox" id="citeCardMain" value="on">';
        var author = '<br>&emsp;Author: <input type="text" placeholder="First" id="citeCardFirst">&nbsp;<input type="text" placeholder="M" style="width: 2em" id="citeCardM">&nbsp;<input type="text" placeholder="Last" id="citeCardLast">';
        var publication = '<br>&emsp;Publication: <input type="text" placeholder="Publisher" id="citeCardPublisher">&nbsp;<input type="text" placeholder="City" id="citeCardCity">&nbsp;<input type="text" placeholder="Year" style="width: 4em" id="citeCardYear">';
        var website = '<br>&emsp;Website: <input type="text" placeholder="Website Title" id="citeCardWebsite">&nbsp;<input type="text" placeholder="Online Publisher" id="citeCardWebPublisher"><br>&emsp;&nbsp;<input placeholder="URL" id="citeCardUrl">';
        var pubdate = '<br>&emsp;&emsp;Published on: <input type="date" id="citeCardPublished">';
        var accdate = '<br>&emsp;&emsp;Accessed on: <input type="date" value='+today+' id="citeCardAccessed">';
        var database = '<br>&emsp;Database: <input placeholder="Database Name" id="citeCardDatabase">&nbsp;<input type="url" placeholder="url" style="width: 30em" id="citeCardDUrl">';
        var medium = '<br>&emsp;<input placeholder="Medium" id="citeCardMedium">';
        var abstract = '<br>&emsp;Type a summary of this work.<br><textarea></textarea>';
				
        z = $('.citelist').val();
        if(z == 'Book - Print') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication);
            citeCardOK(index);
        }
        else if(z == 'Book - Online') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+website+pubdate+accdate);
            citeCardOK(index);
        }
        else if(z == 'Book - eBook' || z == 'eBook' || z == 'Website - Book') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+medium);
            citeCardOK(index);
        }
        else if(z == 'Book - Database') {
            $('.citecard').html('\n\
                '+title+bookpub+author+publication+database);
            citeCardOK(index);
        }
        else if(z == 'Website - Blog') {
            $('.citecard').html('\n\
                '+title+author+website+pubdate+accdate);
            citeCardOK(index);            
        }
        else if(z == 'Website - Image') {
            $('.citecard').html('\n\
                '+title+description+author+website+pubdate+accdate);
            citeCardOK(index);
        }
        
        
        if(index != citations.length) {
			preload(index);
		}
		
		function preload(index) {
            //preload
			$('#citeCardType').val(citations[index].type);
            $('#citeCardTitle').val(citations[index].title);
            $('#citeCardPage').val(citations[index].page);
            $('#citeCardVolume').val(citations[index].volume);
            $('#citeCardEdition').val(citations[index].edition);
            $('#citeCardSeries').val(citations[index].series);
			if(citations[index].main == true || citations[index].main == 'true')
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
			eid.attr('data-id', index);
        }
		function citeCardOK(index) {
			var abstract = '<br>&emsp;Type a summary of this work.<br><textarea></textarea>';

			if(citationsAbstract)
				$('.citecard').append(abstract);
			$('.citecard').append('<br><button onclick="hideCard();citeSubmit('+index+');">Add Citation</button>'); 


			cite_title = new Array();
			cite_author = new Array();
			cite_edition = new Array();
				var out = '<datalist id="citetitlelist">';
				for(i in citations) {
					if(citations[i] != undefined) {
						cite_title.push(citations[i].title);
						cite_author.push(citations[i].author);
						cite_edition.push(citations[i].edition);
						out = out + '<option value="'+cite_title[cite_title.length-1]+'">'
					} else if(citations[i].author != undefined) {
						cite_title.push('Undefined by'+citations[i].author);
						cite_author.push(citations[i].author);
						cite_edition.push(citations[i].edition);
						out = out + '<option value="'+cite_title[cite_title.length-1]+'">';
					} else {
						cite_title.push('Undefined');
						cite_author.push('');
						cite_edition(citations[i].edition);
						out = out + '<option value="'+cite_title[cite_title.length-1]+'">';
					}
				}
				
				out = out + '</datalist>';
				$('.cardBorder').append(out);

			$('#citeCardTitle,#citeCardAuthor,#citeCardEdition').on('input click keyup', function() {
				//console.log('oninput');
				console.log(cite_title);
				if(cite_title.indexOf($('#citeCardTitle').val()) > -1) {
					console.log('Preload Test: '+cite_title[cite_title.indexOf($('#citeCardTitle').val())]+' vs '+$('#citeCardTitle').val()+' @ #'+cite_title.indexOf($('#citeCardTitle').val()))
					if(cite_title[cite_title.indexOf($('#citeCardTitle').val())] == $('#citeCardTitle').val()) {
						//do more for author and edition
						console.log('Preloading...');
						index = cite_title.indexOf($('#citeCardTitle').val());
						preload(cite_title.indexOf($('#citeCardTitle').val()));
					}
				}
			});
		}			
	}
}
			function citeSubmit(index) {
				if(index == undefined) {
					index = citations.length;
					citations.push({});
				}
				if(cite_title[cite_title.indexOf($('#citeCardTitle').val())] == $('#citeCardTitle').val()) {
					index = cite_title.indexOf($('#citeCardTitle').val());
				} else {
					index = citations.length;
					citations.push({});	
				}
				//lets make sure it is all set.
				$('#'+indexId).attr('data-id', index);
				citations[index] = {
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
				};
			}
	
//}
function citeCard(cardCiteActive) {
    if(!cardCiteActive)
        $('.cardBorder').append('<div class="citecard"></div>')    
    cardCiteActive = true;
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
window.onload = function() {
	rangy.init();
}
function cursorPos() {
	inspectorobj = rangy.getSelection().inspect();
	console.log(inspectorobj);
}
function cursorPosX() {
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
	if(p == undefined)
		p = $('.input').html().length;
	if(p == undefined)
		p = 0;
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