/**
 * Reads highlighted text and queries the text on the Freebase database
 * MHacks 2014
 */

function selectText() {

    var service_url = 'https://www.googleapis.com/freebase/v1/search';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", service_url + '?query='+ window.getSelection().toString() + '&limit=5&output=(description)&indent=false', true);
    xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	    	console.log(xhr.responseText);
	    	responseFunction(JSON.parse(xhr.responseText));
	    }
    }
    xhr.send();
}

function responseFunction(response) {
	$('#result').html("HELLO");
    $.each(response.result, function(i, result) {
      $('<p>', {text:result['output'].description["/common/topic/description"]}).appendTo('#result');
    });
}

document.captureEvents(Event.MOUSEUP);
document.onmouseup = selectText;