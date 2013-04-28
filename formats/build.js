x = '';
o = {};
function toXML(a) {
	x = '';
	x = x + '<?xml version="1.0" encoding="utf-8"?>';
	for(i in a) {
		//if(a[i] == 'firstname')
		//r = '</div>'
		if(a[i] == 'content')
		    x = x + '<'+a[i]+'><paragraph>&emsp;'+$('#'+i).html().replace(/<br>/g, '</paragraph><paragraph>&emsp;').replace(/<div>/g, '')+'</paragraph></'+a[i]+'>';
		else
			x = x + '<'+a[i]+'>'+$('#'+i).val()+'</'+a[i]+'>';
	}
	return x;
}
//http://stackoverflow.com/questions/1155678/javascript-string-newline-character -- Vitalii Fedorenko
function getLineSeparator() {
  var textarea = document.createElement("textarea");
  textarea.value = "\n"; 
  return textarea.value;
}
function parseContent2() {
    var domString = "", temp = "";
    $("#6").each(function()
                {
                    temp = $(this).html();
                    domString += "<br>" + ((temp == "<br>") ? "" : temp);
                });
    alert(domString);
}
function parseContent(e) {
    c = $(e).html();
    c = c.replace(/<p[^<]+>/gi, '<br>');
    c = c.replace(/<p>/gi, '<br>');
    c = c.replace(/<div[^<]+>/gi, '<br>');
    c = c.replace(/<div>/gi, '<br>');
    
    c = c.replace('</div>', '', 'gi');
    c = c.replace("<br>", "", "gi");
    c = c.replace("</p>", "", "gi");
    parseWriting(c);
    //Add headings and other assorted tags. This can be done using the same idea.
    return c;
}
function inputToJson() {
    $('.previewFullBody').empty();
    o = {};
    for(i in a) {
        if(a[i] == 'content') {
            //split into <br>, pair into blanks.
            c = parseContent('#'+i);
            ca = c.split('<br>');
            o['content'] = new Array();
            
            k=0;
            for(j in ca){
                if(ca[j].length && ca[j] != '<br>' && ca[j] != '</div>' && !(ca[j].substr(1) == '<' && ca[j].substr(-1) == '>')) {
                    o.content[j-k] = {type: 'paragraph', value: ca[j]};
                    
                    //parse special items
                    //Citations
                    /*while(ca[j].indexOf('<u class="citation">') > -1) {
                        cite = ca[j].split('<u class="citation">');
                        for(i in cite) {
                            
                            o.content[j-k]
                            
                        }
                    }*/
                } else if((ca[j].substr(1) == '<' && ca[j].substr(-1) == '>')) {
					o.content[j-k] = {type:'other', value: ca[j]};
				}
                else
                    k++;
                //this way, if there is a blank item in the array, this offsets the array so it starts at 0 and goes in order, skipping no items.
                    
            }
            
        }
        else if(a[i] == 'author') {
            o[a[i]] = {firstname: $('#'+i).val(), lastname: $('#'+i+'_2').val()}; 
        }
        else
            o[a[i]] = $('#'+i).val();
    }
    
    return o;
}
function toPreview(x) {
	o = {};
 	//x is a string.
 	index = 2;
 	page = 38;
 	while(index != 0) {
		xprime = x.slice(page);
    	var tag = xprime.substring(xprime.indexOf('<') + 1, xprime.indexOf('>'));
    	if(tag != '<?xml version="1.0" encoding="utf-8"?>') {
			o[tag] = xprime.substring(xprime.indexOf('>') + 1, xprime.indexOf('</'+tag+'>'));
			page += xprime.indexOf('</'+tag+'>') + 3 + tag.length;
			console.warn(tag);
       		console.warn(page);
       		//index--;
       		if(page >= x.length)
        		index = 0;
		}
	}
	return o;
}


/* Code Credit to David Walsh -- http://davidwalsh.name/convert-xml-json */
// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

//related to output
doubleSpaced = false;
function doubleSpace() {
   $('.previewPaginated').css('line-height', '2em');
   $('.previewCover').css('line-height', '2em');
   $('.previewAbstract').css('line-height', '2em');
   doubleSpaced = true;
}
headerstyle = '';
function format(type, style, positioning) {
	if(positioning == undefined)
			positioning = 'left';
		
    if(type == 'citation' || type == 'citation-main') {
		c = $('.previewFullBody').html();
		i = 0;
		
		index = -1;
		currentPos = c.substr(index+1);
		index2 = 0;
		while(index < c.length) {
			c = $('.previewFullBody').html();
			currentPos = c.substr(index2+1);
			
			index = currentPos.indexOf('<u class="citation"');
			currentPos = currentPos.substr(index);
			index2 = c.indexOf(currentPos);
            starttag = currentPos.indexOf('>');
            endtag = currentPos.indexOf('</u>');
            string = currentPos.substring(starttag+1, endtag);	
			console.log(type+': i.'+(index)+' '+(index2+starttag)+'-'+(index2+endtag)+' ;'+(endtag+11+index2));
			console.log(c.substr(endtag+11+index2, 16));
			//index = index + 1;
			//index++;
			currentPos = currentPos.substr(1);
				style = style.replace("LAST", citations[i].last);
				style = style.replace("PAGE", citations[i].page);
				style = style.replace("YEAR", citations[i].year);

				console.log(style, index, endtag);
				if(index > -1 && ((citations[i].main != true && type == 'citation') || (citations[i].main == true && type == 'citation-main') ))
					$('.previewFullBody').html($('.previewFullBody').html().substring(0,endtag+12+index2)+' '+style+' '+$('.previewFullBody').html().substring(endtag+12+index2));
				else if(index == -1) {
					index = c.length + 1;
					//return;
				}
		}
		console.log($('.previewFullBody').html().replace(/<u class="citation"[^<]+>/gi, ''));
		$('.previewFullBody').html($('.previewFullBody').html().replace(/<u class="citation"[^<]+>/gi, ''));
		
        /*for(i in citations) {
			if(citations[i] != undefined) {
				var currentPos = c.substr(index);
				index = currentPos.indexOf('<u class="citation"');
				//currentPos.substring(index, currentPos.indexOf('>'));
				endtag = currentPos.indexOf('</u>');

				style = style.replace("LAST", citations[i].last);
				style = style.replace("PAGE", citations[i].page);
				style = style.replace("YEAR", citations[i].year);

				console.log(style, index, endtag);
				if(index > -1 && ((citations[i].main != true && type == 'citation') || (citations[i].main == true && type == 'citation-main') ))
					$('.previewFullBody').html($('.previewFullBody').html().substring(0,endtag+11)+' '+style+' '+$('.previewFullBody').html().substring(endtag+11));
			}
		}*/
        //if(type == 'citation-main')
    } else if(type == 'header' || type == 'cover-header' || type == 'abstract-header') {
        style = style.replace("LAST", o.author.lastname);
		if(o.runninghead != undefined)
			style = style.replace("RUNNINGHEAD", o.runninghead.toUpperCase());
		
        if(style.indexOf(':') == -1)
			style = '<div class="'+positioning+'">'+style+'</div>';
		else {
			style = style.replace(':left', ';left', 'gi');
			style = style.replace(':center', ';center', 'gi');
			style = style.replace(':right', ';right', 'gi');
			var styleout = '<table><tr>';
			var start = 0;
			if(style.indexOf(';left') > -1) {
				styleout = styleout + '<td style="text-align:left;width:100%">'+style.substring(0, style.indexOf(';left'))+'</td>';
				start = style.indexOf(';left') + 6;
			}
			if(style.indexOf(';center') > -1) {
				styleout = styleout + '<td style="text-align:center;width:100%">'+style.substring(start, style.indexOf(';center'))+'</td>';
				start = style.indexOf(';center') + 8;
			}
			if(style.indexOf(';right') > -1) {
				styleout = styleout + '<td style="text-align:right;width:100%">'+style.substring(start, style.indexOf(';right'))+'</td>';
				//start = style.indexOf(':center') + 8;
			}
			styleout = styleout + '</tr></table>';
			style = styleout;
			style = style.replace(';left', '', 'gi');
			style = style.replace(';right', '', 'gi');
			style = style.replace(';center', '', 'gi');
		}
		if(type == 'header')
	        headerstyle = style;
		else if(type == 'cover-header') {
			style = style.replace('PAGE', 1, 'gi');
			$('.previewCover').html('<div class="pageHeader coverHeader" data-page="'+1+'" id="pageHeader'+1+'" style="">'+style+'</div>');
			$('.previewCover').append('<div class="pageBody coverBody" id="pageBody'+1+'" style="height:'+8.25*1+'in;top:-'+9*(1-1)+'in;"></div>');
			$('.previewCover').append('<div class="pageFooter coverFooter" id="pageFooter'+1+'" style=""></div><hr style="width:100%">');
        
		}
		else if(type == 'abstract-header') {
			//HACKING THINGS IS BAD
			style = style.replace('PAGE', 2, 'gi');
			$('.previewAbstract').html('<div class="pageHeader abstractHeader" data-page="'+2+'" id="pageHeader'+2+'" style="">'+style+'</div>');
			$('.previewAbstract').append('<div class="pageBody abstractBody" id="pageBody'+2+'" style="height:'+8.25*1+'in;margin-top:-'+9*(2-2)+'in;"></div>');
			$('.previewAbstract').append('<div class="pageFooter abstractFooter" id="pageFooter'+2+'" style=""></div><hr style="width:100%">');
		}
	} else if(type == 'heading-1x') {
		//**			
	} else {
        c = $('.previewFullBody').html();
		i = 0;
		
		index = -1;
		currentPos = c.substr(index+1);
		index2 = 0;
		while(index < c.length) {
			c = $('.previewFullBody').html();
			currentPos = c.substr(index2+1);
			
			index = currentPos.indexOf('<u class="'+type+'"');
			currentPos = currentPos.substr(index);
			index2 = c.indexOf(currentPos);
            starttag = currentPos.indexOf('>');
            endtag = currentPos.indexOf('</u>');
            string = currentPos.substring(starttag+1, endtag);	
			console.log(type+': i.'+(index2)+' '+(index2+starttag)+'-'+(index2+endtag)+' ;'+string);
			//index = index + 1;
			//index++;
			currentPos = currentPos.substr(1);
			if(index > -1) {
				style = style.replace('STYLE', string, 'gi');
				console.log(style);
                $('.previewFullBody').html($('.previewFullBody').html().substring(0,index2)+style+$('.previewFullBody').html().substring(4+endtag+index2));
			} else {
				index = c.length + 1;
				//return;
			}		
			i++;
		}
		$('.previewFullBody').html($('.previewFullBody').html().replace('<u class="'+type+'"[^<]+>', '', 'gi'));
    
        /*for(i in citations) {
            var currentPos = c.substr(index);
            index = currentPos.indexOf('<u class="'+type+'"');
            starttag = currentPos.indexOf('>');
            endtag = currentPos.indexOf('</u>');
            string = currentPos.substring(starttag+1, endtag);
            
            /*style = style.replace("LAST", citations[i].last);
            style = style.replace("PAGE", citations[i].page);
            //console.log(style, index, endtag);
            if(index > -1)
                $('.previewFullBody').html($('.previewFullBody').html().substring(0,starttag)+string+$('.previewFullBody').html().substring(endtag));
			
			
		} */
        //$('.previewFullBody').html($('.previewFullBody').html().replace('<u class="'+type+'"[^<]+>', '', 'gi'));
    
    }
}
function buildPages() {
    formatBibliography();
    $('.previewFullBody').html($('.previewFullBody').html().toString().replace(/<p>/gi, '<p style="display:none">'));
    $('.previewFullBody').html($('.previewFullBody').html().toString().replace('</p>', ' ', 'gi'));
    //console.log(b);
    //console.log($('.previewBibliography').html());
    $('.previewBibliography').html(b);
    console.log($('.previewBibliography').html());
	
	try{ coverPage() } catch(err) { }
	try{ abstractPage() } catch(err) { }
    
    /* * * PAGINATION * * */
    $('.previewFullHeader').css('height', '0.5in');
    var pixin = 2*$('#previewFullHeader').height();
    console.log('One inch is equal to '+pixin+' pixels.');
    var page = 9*pixin;
    var pages = Math.ceil($('.previewFullBody').height() / page);
    console.log('This body is equal to '+$('.previewFullBody').height() + ' pixels.');
    console.log('The document will have a body of '+$('.previewFullBody').height() + ' / ' + page + ' = ' + pages + ' page(s).');
    pagea = new Array(); 
    $('.previewPaginated').empty();
	var j = 1;
	if($('.previewCover').html().length > 0)
		j++;
	if($('.previewAbstract').html().length > 0)
		j++;
    //for(i=j;i<pages+j;i++) {
    for(i=1;i<=pages;i++) {    
		pagea.push(i);
        
        $('.previewPaginated').append('<div class="pageHeader bodyHeader" data-page="'+i+'" id="pageHeader'+i+'" style="z-index:'+(pages-i+3)+';"></div>');
        $('.previewPaginated').append('<div class="pageBody bodyBody" id="pageBody'+i+'" style="height:'+8.25*i+'in;margin-top:-'+9*(i-1)+'in;z-index:'+(pages-i+2)+';"></div>');
        $('.previewPaginated').append('<div class="pageFooter bodyFooter" id="pageFooter'+i+'" style="z-index:'+(pages-i+3)+';"></div><hr style="width:100%">');
        var headerout = headerstyle.replace('PAGE', i+j);
        //console.log(i-1 + ' ' + headerout);
    } 
    $('.bodyBody').html($('.previewFullBody').html());
    //$('.previewPaginated').append('<div class="previewBibliography page"></div>');
    
    $('.ui').css('z-index', pages+6);
	$('.previewCover').css('z-index', pages+5);
	$('.previewAbstract').css('z-index', pages+5);
	//^DO AS ABOVE FOR COVER AND ABSTRACT;
	
//DO THE SAME THING FOR BIBLIOGRAPHY
    if(citations.length && citations[0] != undefined) {
        var bpages = Math.ceil($('.previewBibliography').height() / page);
        //$('.previewBibliography').empty();
        for(i=pages+j;i<bpages+pages+j;i++) {
            pagea.push(i);
			console.log(i+': '+pages+' '+bpages+' '+j+' page 1')
            $('.previewPaginated').append('<div class="pageHeader" data-page="'+i+'" id="pageHeader'+i+'" style="z-index:'+(pages+bpages-i+3)+';"></div>')
            $('.previewPaginated').append('<div class="bibBody" id="pageBody'+i+'" style="height:'+8.25*(i-pages-bpages-j+2)+'in;margin-top:-'+9*(i-pages-bpages-j+1)+'in;z-index:'+(i-pages+2+bpages)+'"></div>');
            $('.previewPaginated').append('<div class="bibFooter" id="pageFooter'+i+'" style="z-index:'+(pages-i+3+bpages)+';"></div><hr style="width:100%">');
            //console.log(i-1 + ' ' + headerout);
        }
        $('.bibBody').html($('.previewBibliography').html());
        console.log($('.bibBody').html());
    }
	for(k=j;k<=bpages+pages+j;k++) {
		var headerout = headerstyle.replace('PAGE', k);
		var e = $('.pageHeader')[k-1];
        $(e).html(headerout);
	}
	$('.previewBibliography').empty();
    
    
    //$('.preview.p').css('display', 'none');
    
    
    /* * * PDF Output * * */
            var pdf = new jsPDF('p','in','letter')

        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        , source = $('.previewPaginated')[0]

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        , specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                'hr': function(element, renderer){
                        // true = "handled elsewhere, bypass text extraction"
                        return true
                }
        }

        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
                source // HTML string or DOM elem ref.
                , 1 // x coord
                , 0.5 // y coord
                , {
                        'width':6.5 // max width of content on PDF
                        , 'elementHandlers': specialElementHandlers
                }
        )

        
}

//bibliography
function compare(a,b) {
  if (a.last < b.last)
     return -1;
  if (a.last > b.last)
    return 1;
  return 0;
}

b = '';
function bibliographyTitle(text) {
	citationsSort = new Array();
	//citationsSort = citations;
	//root out un-used citations -- also do some formatting here)
	var ca = document.getElementsByClassName('citation');
	if(ca.length) {
		console.log(ca)
		for(i in citations) {
			console.log('Checking citation#'+i);
			for(j=0;j<=ca.length;j++) {
				if(parseInt(j) > -1) {
					console.log('  Checking citation id: '+$(ca[j]).attr('id'));
					if( $(ca[j]).attr('data-id') == i) {
						citationsSort.push(citations[i]);
						console.log('Citation identified'+i);
					}
				}
			}
		}
	}
	citationsSort = citationsSort.sort(compare);
	
    b = '<div class="center">'+text+'</div>';    
}
function bibliography(type, style, i) {
    var cite = citationsSort[i];
	if(cite != undefined) {
		if(cite.title != undefined)
			style = style.replace('TITLE', cite.title, 'g');
			style = style.replace('FIRST', cite.first, 'g');
			style = style.replace('LAST', cite.last, 'g');
			style = style.replace('CITY', cite.city, 'g');
			style = style.replace('PUBLISHER', publisherAbr(cite.publisher), 'g');
			style = style.replace('DATE', cite.year, 'g');
			style = style.replace('EDITION', edition(cite.edition), 'g');
		if(cite.type == type)
			b = b + '<p style="text-indent: -30px;margin-left: 30px;">' + style + '</p>';
	}
	function edition(e) {
		switch (e) {
			case '':
				return '';
				break;
			case 1:
				//return '1st ed.';
				return '';
				break;
			case 2:
				return '2nd ed.';
				break;
			case 3:
				return '3rd ed.';
			default:
				return e+'th ed.';
		}
	}
	function publisherAbr(publisher) {
		switch (publisher) {
			case 'Harry N. Abrams, Inc.':
				return 'Abrams';
				break;
			case 'Allyn and Bacon, Inc.':
				return 'Allyn';
				break;
			case 'Appleton-Century-Crofts':
				return 'Appleton';
				break;
			case 'Basic Books':
				return 'Basic';
				break;
			case 'R. R. Bowker Co.':
				return 'Bowker';
				break;
			case 'Cengage Learning':
				return 'Cengage';
				break;
			case 'Dodd, Mead, and Co.':
				return 'Dodd';
				break;
			case 'Doubleday and Co., Inc.':
				return 'Doubleday';
				break;
			case 'Farrar, Straus, and Giroux, Inc.':
				return 'Farrar';
				break;
			case 'The Feminist Press at the City University of New York':
				return 'Feminist';
				break;
			case 'Harcourt Brace':
				return 'Harcourt';
				break;
			case 'HarperCollins':
				return 'Harper';
				break;
			case 'Harvard University Press':
				return 'Harvard UP';
				break;
			case 'Holt, Rinehart and Winston, Inc.':
				return 'Holt';
				break;
			case 'Houghton Mifflin Co.':
				return 'Houghton';
				break;
			case 'Alfred A. Knopf, Inc.':
				return 'Knopf';
				break;
			case 'J. B. Lippincott Co.':
				return 'Lippincott';
				break;
			case 'The MIT Press':
				return 'MIT P';
				break;
			case 'The Modern Language Association of America':
				return 'MLA';
				break;
			case 'W. W. Norton and Co., Inc.':
				return 'Norton';
				break;
			case 'Oxford University Press, Inc.':
				return 'Oxford UP';
				break;
			case 'Princeton University Press':
				return 'Princeton UP';
				break;
			case 'Rand McNally and Co.':
				return 'Rand';
				break;
			case 'Random House, Inc.':
				return 'Random';
				break;
			case 'St. Martin\s Press, Inc.':
				return 'St. Martin\s';
				break;
			case 'Charles Scribner\'s Sons':
				return 'Scribner\s';
				break;
			case 'Simon and Schuster, Inc.':
				return 'Simon';
				break;
			case 'University Microfilms International':
				return 'UMI';
				break;
			case 'University of Chicago Press':
				return 'U of Chicago P';
				break;
			case 'The Viking Press, Inc.':
				return 'Viking';
				break;
			case 'Yale University Press':
				return 'Yale UP';
				break;
			default: 
				return publisher;
		} 
	}
  
}
doubleSpaced = false;
citations = new Array();
function save() {
	$('.saveprogress').html('SAVING...');
	
	//var savefile = {'citations': new Array(), 'drafts': new Array(), 'options': {}, 'file': {}};
	var savedata = {xml: {citations: new Array(), 'drafts': new Array(), 'options': {}, 'file': {}}};
	var savefile = savedata.xml;
	if(citations != undefined && citations[0] != undefined ) {
		for(i in citations) {
			for(j in citations[i]) {
				if(citations[i][j] == undefined) {
					//console.log(citations[i][j]);
					citations[i][j] = '';
				}
			}
		}
	}
	if(citations != undefined && citations[0] != undefined)
		savefile.citations = citations;
	var draftval = inputToJson();
	draftval.content = null;
	draftval.lastedit = new Date().getTime();
	//draftval.content = $('.input').html();
	localStorage[docid+'.content'] = $('.input').html();
	
	//get docid.drafts
	
	if(savefile.drafts.length) {
		savefile.drafts[savefile.drafts.length - 1].key = a;
		savefile.drafts[savefile.drafts.length - 1].value = draftval;
	} else {
		//drafts function
		savefile.drafts.push({});
		savefile.drafts[0].key = a;
		savefile.drafts[0].value = draftval;
	}
	
	savefile.options.doubleSpaced = doubleSpaced;
		savefile.options.wordcount = {'min': min, 'max': max};
		
	savefile.file.title = draftval.title;
		savefile.file.format = $('#docformat').val();
		savefile.file.tags = $('#doctags').val();
		savefile.file.language = $('#doclang').val();
		savefile.file.author = draftval.author.firstname + ' ' + draftval.author.lastname;
		savefile.file.lastedit = new Date().getTime();
		
	savedata.xml = savefile;
	
	//finally, save the document.
	//temp --
	if(docid == undefined)
		docid = "cxrsd19qa";
	//turn savefile into XML
	//window.savefile = savefile;
	var savexml = json2xml(savedata)
	localStorage[docid] = savexml;	
	
	//console.warn('Document saved. :)')
	setTimeout("$('.saveprogress').html('');", 500);
}
//get i=...
if(window.location.href.indexOf('&') > -1)
	var end = window.location.href.indexOf('&');
else 
	var end = window.location.href.length;
docid = window.location.href.substring(window.location.href.indexOf('?doc=') + 5, end);

//TODO -- Allow for options to be embedded in the future.
function restore(docid) {
	//get savefile for this item
	localjson = xml2json(parseXml(localStorage[docid]));
		localjson = '{'+localjson.substring(11);
		localjson = jQuery.parseJSON(localjson);
	json = localjson;
	
	//before we do anything else, we need to set up the format
	docformat = json.xml.file.format;
	format2 = docformat;
	checkloadjscssfile('formats/'+json.xml.file.format+'/format.js', 'js');
	setTimeout("$('#body').fadeOut(1);input();continueRestore();$('#body').fadeIn(500);", 800);
}
function continueRestore() {
	//first, preload the edit fields
	if(localjson.xml.drafts == undefined) {
		localjson = localjson.xml.drafts;
		a = new Array();
	} else {
		if(localjson.xml.drafts.length == undefined || localjson.xml.drafts.length == 0) {
			localjson = localjson.xml.drafts;
		} else {
			localjson = localjson.xml.drafts[localjson.xml.drafts.length - 1];
		}
		a = localjson.key;
	}
	
	for(i in a) {
		//console.log(i + ' ' + a[i] + ' ' + localjson.value[a[i]])
		if(a[i] == 'author') {
			$('#'+i).val(localjson.value.author.firstname);
			$('#'+i+'_2').val(localjson.value.author.lastname);
		} else if(a[i] == 'content') {
			/*if(localjson.value.content != undefined) {
				if(localjson.value.content.length == undefined) {
					out = json2xml(localjson.value.content.value);
					//$('#'+i).html(json2xml(localjson.value.content.value));
				} else {
					var out = '';
					for(i in localjson.value.content) {
						out = out + json2xml(localjson.value.content[i].value + '<br>');
					}
				}
				out = out.replace('<#text>', '', 'g');
				$('#'+i).html(out);
			}*/
		$('#'+i).html(localStorage[docid+'.content']);
		hoverCitationTag();
		}
		else {
			$('#'+i).val(localjson.value[a[i]]);
		}
	}
	
	//citations
	if(json.xml.citations == undefined || json.xml.citations.length == undefined) {
		citations = new Array();
		citations.push(json.xml.citations);
	}
	else {
		citations = json.xml.citations;
	}
	
	//options
	try { doubleSpaced = json.xml.options.doubleSpaced; } catch(e) { doubleSpaced = false; }
	try {
		$('#count_words_min').val(json.xml.options.wordcount.min);
		$('#count_words_max').val(json.xml.options.wordcount.max);
	} catch(e) {
		$('#count_words_min').val(0);
		$('#count_words_max').val(0);
	}
		//timer
	
	//file
	$('#docformat').val(json.xml.file.format);
	$('#doclang').val(json.xml.file.language);
	$('#doctags').val(json.xml.file.tags);	
	
}
// TODO - Place ParseXML() into a script file
function parseXml(xml) {
				var dom = null;
				if (window.DOMParser) {
				   try { 
					  dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
				   } 
				   catch (e) { dom = null; }
				}
				else if (window.ActiveXObject) {
				   try {
					  dom = new ActiveXObject('Microsoft.XMLDOM');
					  dom.async = false;
					  if (!dom.loadXML(xml)) // parse error ..

						 window.alert(dom.parseError.reason + dom.parseError.srcText);
				   } 
				   catch (e) { dom = null; }
				}
				else
				   alert("cannot parse xml string!");
				return dom;
			 }