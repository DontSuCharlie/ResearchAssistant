/**
 * Reads highlighted text
 * MHacks 2014
 */

var text = ''; // highlighted text

function selectText() {
	text = document.getSelection();

	document.getElementById('highlighted').innerHTML = text;
}

document.captureEvents(Event.MOUSEUP);
document.onmouseup = selectText;