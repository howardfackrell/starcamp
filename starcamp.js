document.querySelector("em").innerHTML="this is a test"

document.querySelector("em").innerHTML=document.querySelector("em").innerHTML.replace("Future", "Website");

document.querySelector("em").append("\nOh, yeah, and javascript. Don't forget javascript");


document.querySelector(".wsite-section").style.backgroundImage="url('/uploads/1/3/4/8/134807970/background-images/1656776847.jpg')";
document.querySelector(".wsite-section").style.backgroundImage="url('/uploads/1/3/4/8/134807970/editor/screenshot-2011-09-21-204306.png')";


function nativeSelector() {
    var elements = document.querySelectorAll("body, body *");
    var results = [];
    var child;
    for(var i = 0; i < elements.length; i++) {
        child = elements[i].childNodes[0];
        if(elements[i].hasChildNodes() && child.nodeType == 3) {
            results.push(child);
        }
    }
    return results;
}

function replaceTxt(target, replacement) {
    var textnodes = nativeSelector(),
        _nv;
    for (var i = 0, len = textnodes.length; i < len; i++) {
        _nv = textnodes[i].nodeValue;
        textnodes[i].nodeValue = _nv.replace(target, replacement);
    }
}