/**
 * Reads highlighted text and queries the text on the Freebase database
 * MHacks 2014
 *
 * Charlie Su
 * Brian Yang
 */

var popup = document.createElement('div'); //popup wraper
popup.id = "popup";
document.body.appendChild(popup);

var result_title = document.createElement('h3'); // result content area
result_title.id = "result_title";
popup.appendChild(result_title);

var result = document.createElement('div'); // result content area
result.id = "result";
popup.appendChild(result);

var selection = "";
var service_url = 'https://www.googleapis.com/freebase/v1/search';

function selectText() {
    selection = window.getSelection().toString();

    if (selection == "")
    	return;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", service_url + '?query='+ selection + '&limit=1&output=(description)&indent=false', true);
    xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	    	responseFunction(JSON.parse(xhr.responseText));
	    }
    }
    xhr.send();
}

function responseFunction(response) {
	document.getElementById("popup").style.height = "25%";

	document.getElementById("result_title").innerHTML = selection;

	// Note to self: Remove jQuery dependency! - Brian
	$('#result').empty();
    $.each(response.result, function(i, result) {
      $('<p>', {text:result['output'].description["/common/topic/description"]}).appendTo('#result');
    });

    document.body.onclick = function(e) {
    if(e.target != document.getElementById('popup')) {
        //document.getElementById("popup").style.height = "0";   
        console.log("Clicked outside!");  
    } else {
    	console.log("Clicked inside!");
    }
    }
}

document.captureEvents(Event.MOUSEUP);
document.onmouseup = selectText;