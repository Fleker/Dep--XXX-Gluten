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
                if(ca[j].length && ca[j] != '<br>' && ca[j] != '</div>') {
                    o.content[j-k] = {type: 'paragraph', value: ca[j]};
                    
                    //parse special items
                    //Citations
                    /*while(ca[j].indexOf('<u class="citation">') > -1) {
                        cite = ca[j].split('<u class="citation">');
                        for(i in cite) {
                            
                            o.content[j-k]
                            
                        }
                    }*/
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
   doubleSpaced = true;
}
headerstyle = '';
function format(type, style, positioning) {
    if(type == 'citation' || type == 'citation-main') {
        index = 0;
        c = $('.previewFullBody').html();
        for(i in citations) {
            var currentPos = c.substr(index);
            index = currentPos.indexOf('<u class="citation"');
            //currentPos.substring(index, currentPos.indexOf('>'));
            endtag = currentPos.indexOf('</u>');
            style = style.replace("LAST", citations[i].last);
            style = style.replace("PAGE", citations[i].page);
            console.log(style, index, endtag);
            if(index > -1 && ((citations[i].main != true && type == 'citation') || (citations[i].main == true && type == 'citation-main') ))
                $('.previewFullBody').html($('.previewFullBody').html().substring(0,endtag+11)+' '+style+' '+$('.previewFullBody').html().substring(endtag+11));
        }
        if(type == 'citation-main')
            $('.previewFullBody').html($('.previewFullBody').html().replace(/<u class="citation"[^<]+>/gi, ''));
    } else if(type == 'header') {
        style = style.replace("LAST", o.author.lastname);
        style = '<div class="'+positioning+'">'+style+'</div>';
        headerstyle = style;
    } else {
        index = 0;
        c = $('.previewFullBody').html();
        for(i in citations) {
            var currentPos = c.substr(index);
            index = currentPos.indexOf('<u class="'+type+'"');
            starttag = currentPos.indexOf('>');
            endtag = currentPos.indexOf('</u>');
            string = currentPos.substring(starttag+1, endtag);
            
            /*style = style.replace("LAST", citations[i].last);
            style = style.replace("PAGE", citations[i].page);*/
            //console.log(style, index, endtag);
            if(index > -1)
                $('.previewFullBody').html($('.previewFullBody').html().substring(0,starttag)+string+$('.previewFullBody').html().substring(endtag));
        }
        $('.previewFullBody').html($('.previewFullBody').html().replace(/<u class="citation"[^<]+>/gi, ''));
    
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
    for(i=1;i<pages+1;i++) {
        pagea.push(i);
        
        $('.previewPaginated').append('<div class="pageHeader" data-page="'+i+'" id="pageHeader'+i+'" style="height:0.5in;background-color:white;position:relative;z-index:'+(pages-i+3)+';padding-top:0.5in;"></div>');
        $('.previewPaginated').append('<div class="pageBody" id="pageBody'+i+'" style="height:'+8.25*i+'in;top:-'+9*(i-1)+'in;background-color:white;overflow:hidden;position:relative;z-index:'+(pages-i+2)+'"></div>');
        $('.previewPaginated').append('<div class="pageFooter" id="pageFooter'+i+'" style="height:0.5in;background-color:white;position:relative;z-index:'+(pages-i+3)+';padding-bottom:0.5in;"></div><hr style="width:100%">');
        var headerout = headerstyle.replace('PAGE', i);
        //console.log(i-1 + ' ' + headerout);
        var e = $('.pageHeader')[i-1];
        $(e).html(headerout);
    } 
    $('.pageBody').html($('.previewFullBody').html());
    //$('.previewPaginated').append('<div class="previewBibliography page"></div>');
    
    $('.ui').css('z-index', pages+4);
    //DO THE SAME THING FOR BIBLIOGRAPHY
    if(citations.length) {
        var bpages = Math.ceil($('.previewBibliography').height() / page);
        //$('.previewBibliography').empty();
        for(i=pages+1;i<bpages+pages+1;i++) {
            pagea.push(i);

            $('.previewPaginated').append('<div class="pageHeader" data-page="'+i+'" id="pageHeader'+i+'" style="height:0.5in;background-color:white;position:relative;z-index:'+(pages-i+3)+';padding-top:0.5in;"></div>')
            $('.previewPaginated').append('<div class="bibBody" id="pageBody'+i+'" style="height:'+8.25*(i-pages)+'in;top:-'+9*(i-1-pages)+'in;background-color:white;overflow:hidden;position:relative;z-index:'+(pages-i+2)+'"></div>');
            $('.previewPaginated').append('<div class="bibFooter" id="pageFooter'+i+'" style="height:0.5in;background-color:white;position:relative;z-index:'+(pages-i+3)+';padding-bottom:0.5in;"></div><hr style="width:100%">');
            
            var headerout = headerstyle.replace('PAGE', i);
            //console.log(i-1 + ' ' + headerout);
            var e = $('.pageHeader')[i-1];
            $(e).html(headerout);
        }
        $('.bibBody').html($('.previewBibliography').html());
        console.log($('.bibBody').html());
    }
    
    
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
	citationsSort = citations;
	citationsSort = citationsSort.sort(compare);
	
    b = '<div class="center">'+text+'</div>';    
}
function bibliography(type, style, i) {
    var cite = citationsSort[i];
    style = style.replace('TITLE', cite.title, 'g');
     
    if(cite.type == type)
        b = b + style; 
}
doubleSpaced = false;
citations = new Array();
function save() {
	$('.saveprogress').html('SAVING...');
	
	//var savefile = {'citations': new Array(), 'drafts': new Array(), 'options': {}, 'file': {}};
	var savedata = {xml: {citations: new Array(), 'drafts': new Array(), 'options': {}, 'file': {}}};
	var savefile = savedata.xml;
	if(citations != undefined) {
		for(i in citations) {
			for(j in citations[i]) {
				if(citations[i][j] == undefined) {
					//console.log(citations[i][j]);
					citations[i][j] = '';
				}
			}
		}
	}
	if(citations != undefined)
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
	
	//first, preload the edit fields
	if(localjson.xml.drafts.length == undefined || localjson.xml.drafts.length == 0) {
		localjson = localjson.xml.drafts;
	} else {
		localjson = localjson.xml.drafts[localjson.xml.drafts.length - 1];
	}
	a = localjson.key;
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
		}
		else {
			$('#'+i).val(localjson.value[a[i]]);
		}
	}
	
	//citations
	if(json.xml.citations.length == undefined) {
		citations = new Array();
		citations.push(json.xml.citations);
	}
	else {
		citations = json.xml.citations;
	}
	
	//options
	doubleSpaced = json.xml.options.doubleSpaced;
	$('#count_words_min').val(json.xml.options.wordcount.min);
	$('#count_words_max').val(json.xml.options.wordcount.max);
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