/**
 * Reads highlighted text and queries the text on the Freebase database
 * MHacks 2014
 *
 * Charlie Su
 * Brian Yang
 */
var historyArray = [];
var index = 0;
 
var popup = document.createElement('div'); //popup wrapper
popup.id = "popup";
document.body.appendChild(popup);

var wrapper = document.createElement('div');
wrapper.id = "wrapper";
popup.appendChild(wrapper);

var backButton = document.createElement('button');//creates back button
backButton.id = "forwardButton";
wrapper.appendChild(backButton);
document.getElementById("forwardButton").innerHTML = "Forward";

var backButton = document.createElement('button');//creates back button
backButton.id = "backButton";
wrapper.appendChild(backButton);
document.getElementById("backButton").innerHTML = "Back";

var result_title = document.createElement('h3'); // result content area
result_title.id = "result_title";
wrapper.appendChild(result_title);

var result = document.createElement('div'); // result content area
result.id = "result";
popup.appendChild(result);

var selection = "";
var service_url = 'https://www.googleapis.com/freebase/v1/search';

function selectText() {		
	selection = window.getSelection().toString();
	console.log(selection);

    if (selection.trim() == "")
		return;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", service_url + '?query='+ selection + '&limit=1&output=(description)&indent=true', true);
    xhr.onreadystatechange = function() {
	    if (xhr.readyState == 4) {
	    	responseFunction(JSON.parse(xhr.responseText));
	    }
    }
    xhr.send();
}

function responseFunction(response) {
	document.getElementById("popup").style.height = "27%";
	document.getElementById("result_title").innerHTML = selection;

	document.getElementById("result").innerHTML = "<p>" + response.result[0].output.description["/common/topic/description"] + "</p>";

	var attribution = document.createElement('p');
	attribution.id = "attribution";
	result.appendChild(attribution);

	attribution.innerHTML = "<p class='freebase-attribution'>The above information is provided by the Freebase and licensed under a Creative Commons Generic License (CC-BY). For more information, visit <a href='http://www.freebase.com/' target='_blank'>Freebase.com</a>.</p>";

	historyArray[historyArray.length] = response;
	currentIndex++;

    document.body.onclick = function(e) {
	    if(e.currentTarget != document.getElementById('popup')) {
			
	        document.getElementById("popup").style.height = "0";
			document.getElementById("popup").scrollTop="0";
	        //console.log("Clicked outside!");  
	    } else {
	    	//console.log("Clicked inside!");
	    }
    }
}

document.captureEvents(Event.MOUSEUP);
document.onmouseup = selectText;


function back() {
	if(index > 0)
		index--;
	responseFunction(historyArray[index]);
}
function forward() {
	if(index < historyArray.length)
		index++;
	responseFunction(historyArray[index]);
}

document.getElementById('backButton').onclick = back;
document.getElementById('forwardButton').onclick = forward;
