document.getElementById('wordbox').style.display = 'none';

var words = {
	'title1': 
	'Back in the belly',
	'words1': 
	`Back in the belly<br>
	Forecasting unclear skies<br>
	Wherever I strive<br>
	Just backing the medley<br>
	<br>
	Promises aren’t accessible<br>
	Futures aren’t predictable<br>
	<br>
	Chaotic habit, grasps at control<br>
	Patterns immutable<br>
	Mourning the incurable<br>
	<br>
	In this discordance<br>
	Thoughts differ from their duty<br>
	The rest dance<br>
	Two minds obsessed with beauty<br>
	<br>
	Out of the belly <br>
	For peek and response<br>
	Closed and cut off<br>
	Circling the life of sense<br>
	<br>
	Discordance stirs stronger<br>
	Swirling vortices form a cohort<br>
	Gasps murmur<br>
	<br>
	Chaos speeds the reaction of life<br>
	Breeding more from the more bred<br>
	Until all walls are covered<br>
	Grey inside and out`,
}


function openWordBox(n)
{
	n = n.toString();
	document.getElementById('wordbox-title').innerHTML = words['title'+n];
	document.getElementById('wordbox-content').innerHTML = words['words'+n];
	document.getElementById('wordbox').style.display = 'block';
}

function hideWordBox()
{
	document.getElementById('wordbox').style.display = 'none';
}

function getWords()
{
	console.log('GET WORDS');	
}