<html>
<head>
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="json2xml.js"></script>
	<script src="xml2json.js"></script>	
		
	<script src="formats/input.js"></script>
	<script src="formats/build.js"></script>
        <script src="card.js"></script>
        
        <script src="../jspdf/jspdf.js"></script>
        <script src="../jspdf/jspdf.plugin.from_html.js"></script>
        <script src="../jspdf/libs/Blob.js/BlobBuilder.js"></script>
        <script src="../jspdf/libs/FileSaver.js/FileSaver.js"></script>
        
        
        <script type="text/javascript" src="../jspdf/libs/Deflate/adler32cs.js"></script>
	<script type="text/javascript" src="../jspdf/libs/FileSaver.js/FileSaver.js"></script>
	<script type="text/javascript" src="../jspdf/libs/Blob.js/BlobBuilder.js"></script>

	<script type="text/javascript" src="../jspdf/jspdf.plugin.addimage.js"></script>

	<script type="text/javascript" src="../jspdf/jspdf.plugin.standard_fonts_metrics.js"></script>
	<script type="text/javascript" src="../jspdf/jspdf.plugin.split_text_to_size.js"></script>
	<script type="text/javascript" src="../jspdf/jspdf.plugin.from_html.js"></script>
	
	<script type="text/javascript" src="rangy/rangy-core.js"></script>
	
        <script src="holoribbon/holoribbon.js"></script>
        
    <!--<script src="formats/mla/format.js"></script>-->
</head>
<div class="header ui bg">
	<u onclick="convertToInput();">Back to Editor</u>
	<b>Export To:</b>
	<u onclick="convertToXML();">XML</u>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<u onclick="convertToPreview();">Preview</u>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<u onclick="print();">Print Document</u>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<b>Options:</b>
	Words:&nbsp;&nbsp;
	Min&nbsp;
	<input type="number" id="count_words_min" value="0" oninput="wordCount()" min="0" class="countinput">
	&nbsp;&nbsp;Max&nbsp;
	<input type="number" id="count_words_max" value="0" oninput="wordCount()" min="0" class="countinput">
	&nbsp;&nbsp;&nbsp;Timer:&nbsp;&nbsp;
	Minutes&nbsp;
	<input type="number" id="timer_minutes" value="0" min="0">
</div>
<script>
    newRibbon('.header', {
       'File': new Array(
			   {'text': 'Back', 'img': '', 'action': 'returnHome();'},
               {'text': 'Download', 'img': '', 'action': "convertToPreview();pdf.save(o.title+'.pdf');"}
           
       ),
	   'View': new Array(
			   {'text': 'Edit', 'img': '', 'action': 'convertToInput()'},
               {'text': 'View XML', 'img': '', 'action': 'convertToXML()'},
			   {'text': 'Preview', 'img': '', 'action': 'convertToPreview()'},
			   {'text': 'Print', 'img': '', 'action': 'print();'}

		),
       'Options': new Array(
                {'group': 'Words', 'value': 'Min: <input type="number" id="count_words_min" value="0" oninput="wordCount()" min="0" class="countinput"><br>Max: <input type="number" id="count_words_max" value="0" oninput="wordCount()" min="0" class="countinput">'},
                {'group': 'Timer', 'value': 'Minutes: <input type="number" id="timer_minutes" value="0" min="0">'}
           
       )       
    });
    ribbonSwitch(2);
	
	function returnHome() {
		window.location = 'index.html'
	}
</script>
<style>
    .ribbonhead {
        width:100%;
        margin-left:5px;
        margin-top:5px;
    }
    .ribbonheader {
        width: 150px;
        text-align: center;
    }
    .ribbonstreamer {
        width:100%;
        margin-left:5px;
        height:5px;
        margin-top:-22px;
        /*background-color:#0066cc;
    */}
    .ribbonstreameritem {
        width:150px;
        height:5px;
        /*border-bottom-style:solid;*/
        border-bottom-color:#06c;
        /*background-color:#06c;*/
    }
    .ribbonbutton {
        width: 80px;
        height: 60px;
        padding-right: 35px;
        /*background-color: rgba(0,0,0,.1);*/
    }
    .ribbongroup {
        margin-left:-100%;
        position: fixed;
        top: 40px;
    }
    .ribbonbody {
        position:fixed;
    }
    
</style>

<div class="body" id="editorbody">
<i>What kind of document do you wish to create?</i>
<br>
<input type="text" value="" id="docformat" list="formats">&nbsp;&nbsp;Language:<input size="8" list="languages" type="text" value="en_us" placeholder="Language" id="doclang"> 
<br>

<datalist id="languages">
	<option value="en_us" label="English (US)">
	<option value="es" label="Spanish">
</datalist>


Tags: <input type="text" placeholder="Space-Separated Tags" id="doctags" size="40">
<br><br>

<script>
//in the future dynamically build list.
citationsAbstract = false;
formatlist = new Array('MLA', 'APA');
formatlistlabel = new Array('Essay', 'Essay');


document.write('<datalist id="formats">')
for(i in formatlist) {
	document.write('<option value="'+formatlist[i]+'" label="'+formatlistlabel[i]+'">');
}
document.write('</datalist>');

	
$("#docformat").bind("input contextmenu invalid", function(event) {
        formatShift();
});
function createjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 return fileref
}

function replacejscssfile(oldfilename, newfilename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist using
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
   var newelement=createjscssfile(newfilename, filetype)
   allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
  }
 }
}
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", filename);
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

var filesadded="" //list of files already added

function checkloadjscssfile(filename, filetype){
 if (filesadded.indexOf("["+filename+"]")==-1){
  loadjscssfile(filename, filetype)
  filesadded+="["+filename+"]" //add to list of files already added, in the form of "[filename1],[filename2],etc"
 }
 else
  alert("file already added!")
}
//format = 'mla';
function formatShift() {
	//unload js file
	format2 = $('#docformat').val();
	if(formatlist.indexOf(format2) > -1) {
		replacejscssfile('formats/'+docformat+'/format.js', 'formats/'+format2+'/format.js', 'js');
		docformat = format2;
		setTimeout("save();$('#body').empty();input();save();", 500);
	}
}
restore(docid);
</script>
<div id="body">       
</div>
</div>

<!-- Card -->
<div class="card card2" style="display:none;">
    <div class="cardBorder card" <!--style="border-color:#d00"-->>
		<div class="cardHead"></div>
	</div>
</div>
<div class="hovertag"></div>

<script>
function convertToInput() {
 	$('.xmlx').fadeOut(500);
 	$('.xml').fadeOut(500);
    $('.preview').fadeOut(500);
    
	$('#body').fadeIn(500);
	$('#editorbody').fadeIn(500);
}
function convertToXML() {
 	//a = Array of info
 	$('.body').fadeOut(500);
 	$('.preview').fadeOut(500);
 	x = toXML(a);
 	$('.xml').html(x);
 	$('.xmlx').fadeIn(500);
}
function convertToPreview() {
	//a = Array of info
 	$('.body').fadeOut(500);
 	$('.xmlx').fadeOut(500);

 	//x = toXML(a);
 	//o = toPreview(x);
        o = inputToJson();
 	//$('.preview').html('');
 	$('.previewFullBody').html(build(o));
        
        $('.preview').fadeIn(500);
        $('.previewCover').fadeIn(500);
 	$('.previewPaginated').fadeIn(500);
        $('.previewBibliography').fadeIn(500);
}

/* * * PRINT * * */ /* IGNORE */
function print() {
        alert("Make sure you set the Print Margins to None before printing!");
	convertToPreview();
	Popup($('.preview').html());
}
function Popup(data)
    {
        var mywindow = window.open('', 'my div', 'height=$(window).width(),width=$(window).width()');
        mywindow.document.write('<html><head><title>Printing '+o.title+'</title>');
        /*optional stylesheet*/ 
			//mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
			mywindow.document.write('<style>.previewFullBody{display:none;} .previewBibliography{display:none;} .pageHeader {height:0.5in;background-color:white;position:relative;padding-top:0.5in;} .pageBody{background-color:white;overflow:hidden;position:relative;height:8.25in;} .pageFooter{height:0.5in;background-color:white;position:relative;padding-bottom:0.5in;} .preview{width: 10.5in;} .page{opacity: 1;} .center { text-align: center;	padding: 0px; font-size:12pt; font-family:Times; } .right{text-align:right;padding:0px;} hr{display:none;} body {word-wrap: break-word;margin-left: 1in;margin-right:-1in;margin-top:-0.08in;width:6in;</style>');
                        if(doubleSpaced == true) {
                            mywindow.document.write('<style>body { line-height: 2em; }</style>');
                        }
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        /*mywindow.print();
        mywindow.close();
        */
        return true;
    }

window.onload = function() {
	document.onkeyup = function(e){ /* turn to content input only */
	    if (!e) e=window.event;
	
		var k = e.keyCode;
		//console.log(k);
		if(k) {
			//every key input anywhere
			c = getContent();
			if(c.split(' ').length < 800) {
				wordCount();
				if(formatlist.indexOf(format2) > -1) {
					save();
				}
            }
		}
		if(k == 32) {
         	//every space
         	c = getContent();
			if(c.split(' ').length >= 800) {
				wordCount();
                if(formatlist.indexOf(format2) > -1) {
					save();
				}
			}
		}
                if(k == 222) {
                    //citations
                    
                    //output another quote, identical to the first quote character
                    
                    //$('.input').html($('.input').substring(0,cursorPos())) + '"' + $('.input').substring(cursorPos()));
                    quote = $('.input').html().substr(cursorPos()-1,1);
                    if(quote == '"') {
                        
                        //cursorInsert(quote);
                        window.cursorposition = cursorPos();
                        launchCitation(undefined, quote);
                    } else {
						console.log('Not a quote because:\''+quote+'\' @ '+(cursorPos()-1));
					}
                }
		
	}
	//console.log('keys');
}
$('.input').mouseleave(function () {
    window.cursorposition = cursorPos();    
});
function wordCount() {
	//get min & max counts
	min = $('#count_words_min').val();
	max = $('#count_words_max').val();
	
	c = getContent();  
	n = 0;
	for(i in c.split(' ')) {
		if(c.split(' ')[i].length) 
			n++;
	}
	//n = c.split(' ').length;
	
	//now write to span
	if(n == 1)
		words = 'Word'
	else
		words = 'Words'
	$('.count_words_number').html(words + ': ' + n);
	
	if(c.length == 0)
		$('.count_words_number').html("Get started!");

	//Draw
	if((n <= min && min > 0) || (n >= max && max > 0)) {
		$('.count_words_bar').css("background-color", "red");
	}
	if((n >= min && max == 0) || (n <= max && min == 0)) {
     	$('.count_words_bar').css("background-color", "yellow");
     	$('.count_words_bar').css('width', '100%');
	}
	if((n >= min && min > 0) && (n <= max && max > 0)) {
	    $('.count_words_bar').css("background-color", "green");
	    //$('.count_words_bar').css('width', '100%');
	}
	
	if(n <= max && max > 0) {
		$('.count_words_bar').css('width', 100*n/max+'%');
	}
	if(n >= max && max > 0) {
		$('.count_words_bar').css('width', 100*max/n+'%');
	}
	if(n <= min && min > 0)
		$('.count_words_bar').css('width', 100*min/n+'%');
	if(n > min && min > 0) 
		$('.count_words_bar').css('width', 100+'%');
	/*if((n <= min && max == 0) || (n <= max && min == 0)) {
		$('.count_words_bar').css('width', '50%');
	}*/

	$('.count_words_bar').show();
	return n;
}
wordCount();
function getContent() {
 	for(i in a) {
 	 	if(a[i] == 'content') {
 	 	 	return $('#'+i).text();
 	 	}
 	}
}
</script>

<div class="xmlx body">
	<xmp class="xml">
	
	</xmp>
</div>

<div class="preview body">
    <div class="previewFullHeader" id="previewFullHeader"></div>
    <div class="previewFullBody"></div>
    
    <div class="previewCover page"></div>
	<div class="previewAbstract page"></div>
    <div class="previewPaginated page" style=""></div>
    <div class="previewBibliography page" style="display:none;"></div>
    
    <!--<button onclick="demoFromHTML()">Download PDF</button>-->
</div>

<table class="footer ui bg">
	<tr><td class="count_words">
		<table style="width:100px"><tr>
		<td class="count_words_bar"></td><td style="width:100%"></td></tr></table>
		<span class="count_words_number"></span>
	</td>
	<td class="count_paragraphs">
	
	</td>
	<td class="timer">
		<!--<div class="timer_txt"></div>-->
	</td>
	<td class="saveprogress">
			
	</td>
	<td style="width:100%">&nbsp;</td></tr>
</table>

<style>
body {
 	background-color: #ddd;
}
.ui {
 	width:101%;
 	margin-left:-1%;
 	padding-left:1%;
}
.bg {
	background-color: #ddd;
}
.header {
	position:fixed;
	top:0%;
	height:160px;
}
.body {
 	margin-top:160px;
 	background-color: white;
 	overflow-y: auto;
        margin-bottom: -192px;
}
.preview {
    background-color: inherit;
	margin-left: auto;
margin-right: auto;
width: 10.5in;
background-color: white;
}
.xmlx {
	display: none;
	background-color: white;
}
.xml {
	/*display: hidden;*/
 	width:90%;
 	margin-left:0%;
 	word-wrap: break-word;
}
.previewPaginated {
 	display: none;
 	/*width:90%;
 	margin-left:5%;*/
 	word-wrap: break-word;
 	background-color: white;
}
.footer {
	position:fixed;
	top:100%;
	margin-top: -46px;
	height: 48px;
}
.count_words {
	width: 100px;
}
.count_words_bar {
	background-color: red;
	width: 100px;
	height: 1px;
	padding-bottom: 7px;
	display: none;
}
.countinput {
	width: 55px;
}

#timer_minutes {
	width: 60px;
}

.timer {
	display: none;
}
/*.citation {
    display:none;
    width: 100px;
    height:100px;
}*/
.tool {
    cursor: pointer;
    
}
/* * * */
.center {
 	text-align: center;
 	padding: 0px;
}
.right {
    text-align: right;
    padding: 0px;
}

@media print {
    .preview {
        background-color: white;
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        /*padding: 15px;
        font-size: 14px;*/
        /* line-height: 18px; ** <- Hmmm */
    }
}

/* * * * */
.contentinput {
	width: 90%;
}
.input {
	height: 400px;
	font-family: Times;
	font-size: 12pt;
	border-color: #aaa;
	border-style: solid;
	padding: 5px;
	width: 100%;
	resize:both;
        white-space:pre;
}
.toolbar {
	width: 100%;
	word-spacing: 10px;
	background-color: #ddd;
	border-style: solid;
	border-color: #aaa;
	padding-left: 10px;
}

/* * * CARDS * * */
.card {
	background-color:#eeeeee;
	box-shadow:black, 0px, 0px, 5px;
	height: 230px;
	width: 530px;
	box-shadow: 0px 0px 2px #000;
	/*position: relative;*/
        position:fixed;
        left: 50px;
}
.card2 {
	/* stuff exclusive to outside of card */
 	padding: 10px;
}
.cardHead {
	font-size:15pt;
	font-size: 15pt;
	background-color: inherit;
	margin-top: -10px;
	margin-left: 15px;
	padding-left: 7px;
	margin-right: 55px;
}
.cardBorder {
 	border: solid 1px;
 	height: 208px;
	width: 523px;
	padding-left: 5px;
        margin-top: 10px;
        left:60px;
}
.citecard {
    overflow:auto;
    height:132px;    
}
.hovertag {
	position:fixed;
	height:40px;
	background-color:black;
	color:white;
	overflow:hidden;
	width:150px;
	left:-200px;
}
u.citation {
    text-decoration: none; border-bottom: 1px solid; border-color: #0ff;
}
.page {
    /*height: in;
    */padding-left: 1in;
    padding-right: 1in;
    /*padding-top: 0.5in;
    padding-bottom: 0.5in;
    *//*background-color: #eee;
    */margin-top: -0.08in;
    margin-left: auto;
    margin-right:auto;

    width:8.5in;
	/*height: 10.25in;*/
}
.pageHeader {
	height:0.5in;background-color:white;position:relative;padding-top:0.5in;
}
.pageBody {
	background-color:white;overflow:hidden;position:relative;
}
.pageFooter {
	height:0.5in;background-color:white;position:relative;padding-bottom:0.5in;
}

.previewFullBody {
    display:none;
}
.previewFullHeader {
    display:none;
}
.previewBibliography {
    display:none;
}
.saveprogress {
	font-size: 10pt;
}
</style>
</html>