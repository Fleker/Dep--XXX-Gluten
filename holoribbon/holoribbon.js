ribbonobj = {'index': 0};
function newRibbon(element, ribbon) {
    var out = '<table class="ribbonhead"></table><br><table class="ribbonstreamer"></table><br><div class="ribbonbody"></div>'
    $(element).html(out);
    out = '';
    outs = '';
    keys = new Array();
    i = 0
    for(var k in ribbon) {
        out = out + '<td class="ribbonheader" onclick="ribbonSwitch('+i+')">'+k+'</td>';
        outs = outs + '<td class="ribbonstreameritem"></td>';
        keys.push(k);
        i++;
    }
    out = out + '<td></td>';
    outs = outs + '<td></td>';
    $('.ribbonhead').html(out);
    $('.ribbonstreamer').html(outs);
    out = '';
    
    for(i in keys) {
        out = out + '<table class="ribbongroup">'
        //console.log(keys[i]);
        for(j in ribbon[keys[i]]) {
            //console.log(ribbon[keys[i]][j]);
            var k = ribbon[keys[i]][j];
            if(k.img != undefined) {
                //standard button
                out = out + '<td class="ribbonbutton" onclick="'+k.action+'"><div style="height:76px">' + k.img + '</div><br><div style="text-align:center;">' + k.text + '</div></td>';
            } 
            else if(k.group != undefined) {
                //group button
                out = out + '<td class="ribbonbutton"><div style="height:76px">' + k.value + '</div><br><div style="text-align:center">' + k.group + '</div></td>';
            }
        }
        out = out + '</table>'
    }
    $('.ribbonbody').html(out);
}
function ribbonSwitch(index) {
    element = $('.ribbonstreameritem')[ribbonobj.index];
    $(element).css('border-bottom-style', 'none');
    element = $('.ribbongroup')[ribbonobj.index];
    $(element).animate({
        marginLeft: '-100%'
    }, 300);
    
    
    ribbonobj.index = index;
    element = $('.ribbonstreameritem')[index];
    $(element).css('border-bottom-style', 'solid');
    element = $('.ribbongroup')[index];
    $(element).animate({
        marginLeft: '25px'
    }, 300);
    
}
ribbonSwitch(0);