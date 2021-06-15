document.getElementById('wordbox').style.display = 'block';//'none';

function openWordBox()
{
	document.getElementById('wordbox-title').value = 'chosen title';
	document.getElementById('wordbox').value = 'chosen text';
	document.getElementById('wordbox').style.display = 'block';
}

function hideWordBox()
{
	document.getElementById('wordbox').style.display = 'none';
}