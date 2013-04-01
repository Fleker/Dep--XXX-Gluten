//courtesy of Tim Down -- http://stackoverflow.com/questions/4712310/javascript-how-to-detect-if-a-word-is-highlighted
    function getSelectedText() {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function doSomethingWithSelectedText() {
        var selectedText = getSelectedText();
        if (selectedText) {
        	//Now try to identify the type of selection.
        	if(selectedText.indexOf(' ') == -1) {
        	 	//card('word', selectedText);
        	}
        }
        else if(!cardActive) {
         	hideCard();
        }
    }

    document.onmouseup = doSomethingWithSelectedText;
    document.onkeyup = doSomethingWithSelectedText;
function hideCard() {
    $('.card').animate({
            opacity: 0,
            top: '400px'
    }, 500, function() {
            $('.cardBorder').html('<div class="cardHead"></div>');
            cardActive = false;
    });
}    
//courtesy of Steve Harrison -- http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function lowerFirstLetter(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
}

//custom
window.mouse = {onX: 0, onY: 0, X: 0, Y: 0};
$(document).mousemove(function(e){
      //$('#status').html(e.pageX +', '+ e.pageY);
      window.mouse.onX = e.pageX - scrollX;
      window.mouse.onY = e.pageY - scrollY;
      window.mouse.X = e.pageX;
      window.mouse.Y = e.pageY;
});
cardActive = false;
function card(type, input) {
        cardActive = true;
 	//displays a card
 	//see http://docs.jquery.com/Tutorials:Mouse_Position
 	$('.cardBorder').html('<div class="cardHead"></div>');
 	$('.cardHead').html(capitalizeFirstLetter(input));
 	if(type == 'word') {
 	 	/* A word, ping wikitionary. Then Google (maybe Wikipedia). Also Thesaurus and get common fixes
		*
		*	Get started with Wiki API: https://www.mediawiki.org/wiki/API
		*		http://en.wiktionary.org/w/api.php?action=query&titles=sailor&prop=revisions&rvprop=content
		* 
		*/
 	 	/*$.get('http://en.wiktionary.org/w/api.php', {format: 'json', titles: lowerFirstLetter(input), action: 'query', prop: 'revisions', rvprop: 'content'}, function(r) {
      		console.warn(r);
	    });*/
	   			var wikipediaHTMLResult = function(data) {
	   				console.log(data);
	   				window.r = data.query.pages;
	   				for(i in data.query.pages) {
	   				 	result = data.query.pages[i];
	   				}
	   				result = result.revisions[0]['*'];
	   				window.r = result;
	   				
	   				syn1 = result.indexOf('====Synonyms====');
	   				syn2 = result.indexOf('====Antonyms====');
	   				synonyms = result.substr(syn1, syn2 - syn1);
	   				
	   				readData = '<i><font color="#aaa">Wiktionary</font></i><br><b>Synonyms: </b>' + synonyms;
	   				
	   				/*Find a way to parse
	   					http://en.wiktionary.org/w/api.php?action=query&titles=aware&prop=revisions&rvprop=content
	   					http://en.wiktionary.org/wiki/aware
					*/

					/*
				    // handle redirects
				    var redirect = readData.find('li:contains("REDIRECT") a').text();
				    if(redirect != '') {
				    	callWikipediaAPI(redirect);
				        return;
				    }
					*/

				    $('.cardBorder').append(readData);
				};
	    $.getJSON("http://en.wiktionary.org/w/api.php?action=query&format=json&callback=?",
		{titles:lowerFirstLetter(input), prop: "revisions", rvprop:"content"},
		wikipediaHTMLResult);
		  
		//$.getJSON("http://en.wiktionary.org/w/api.php?action=parse&format=json&callback=?", {page:lowerFirstLetter(input), prop:"text"}, wikipediaHTMLResult);


 	}
 	else if(type == 'phrase') {
 	 	//
 	}
        else if(type == 'citation') {
            $('.cardBorder').css('border-color', '#0ff');
        }
        else if(type == 'character') {
            //$('.cardBorder').css('border-color', '#000');
        }
 	var animate = '';
 	if(window.mouse.onY < 400 && false)
 		animate = (window.mouse.onY + 20);
 	else if(window.innerHeight - window.mouse.onY > 500 && false )
 		animate = (window.mouse.onY - 400);
        else
                animate = 170;

 	$('.card').animate({
 	   	opacity: 1,
 	   	top: animate+'px'
 	}, 500, function() {

	});
        $('.cardBorder').animate({
                top: animate+11+'px'           
        }, 185, function() {
            
        });

}