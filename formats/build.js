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
   $('.preview').css('line-height', '2em');
   doubleSpaced = true;
}
function finish() {
    $('.preview').html($('.preview').html().toString().replace(/<p>/gi, '<p style="display:none">'));
    $('.preview').html($('.preview').html().toString().replace('</p>', ' ', 'gi'));
    
    //$('.preview.p').css('display', 'none');
}