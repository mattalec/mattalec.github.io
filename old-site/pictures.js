function closeContent() {
	document.getElementById('full-screen-div').style.display = 'none';
	document.getElementById('fader').style.display = 'none';
	/*
	document.getElementById('close-content-div').style.display = 'none';
	document.getElementById('content-div').style.display = 'none';
	*/
}

function getContent(imgs) {
	var content = document.getElementById("content");
	content.style.background = "url("+imgs+") no-repeat center";

	document.getElementById('full-screen-div').style.display = 'block';
	document.getElementById('fader').style.display = 'block';
	/*
	document.getElementById('close-content-div').style.display = 'block';
	document.getElementById('content-div').style.display = 'flex';
	*/

}