// canvas settings
var canvas = document.querySelector('canvas');
// search for canvas vairable
var fullwidth = window.innerWidth;
var fullheight = window.innerHeight;
canvas.width = fullwidth;
canvas.height = fullheight;
var c = canvas.getContext('2d');

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


//Event listeners
window.addEventListener('resize', function(event) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	fullwidth = window.innerWidth;
	fullheight = window.innerHeight;
	height = fullheight / 8;
	init();
})


//Chessboard settings
var height = fullheight / 8;

var r = Math.random() * 255;
var g = Math.random() * 255;
var b = Math.random() * 255;
var dr = (Math.random() - 0.5) * 2;
var dg = (Math.random() - 0.5) * 2;
var db = (Math.random() - 0.5) * 2;


// Draw chessboard with updated r,g,b
function update_board(r,g,b)
{

	// taking height / 8 as the length of the square

	var rowcount = 0
	var square_side_cnt = Math.ceil(fullwidth / height);
	if (square_side_cnt % 2 == 1) square_side_cnt++;
	var square_cnt = square_side_cnt * 8 + 1

	// for chess board i < 65;
	for (var i = 0; i < square_cnt; i++)
	{
		// for chess board i % 8;
		var real = i % square_side_cnt;
		var x = real * height; 
		var y = rowcount * height;
		if (!(rowcount % 2))
		{
			if (i % 2)
			{
				c.fillRect(x, y, height, height);
				c.fillStyle = 'rgba('+r+','+g+','+b+',1)';
			}
		}
		else
		{
			if (!(i % 2))
			{
				c.fillRect(x, y, height, height);
				c.fillStyle = 'rgba('+r+','+g+','+b+',1)';
			}
		}

		if ((!real) & (i != 0))
		{
			++rowcount;
		}
	}
}


// Piece class for movement
function Piece(image, x, y, dx, height, lvl) 
{
	// initialise variables
	this.image = image;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.height = height;
	this.lvl = lvl;
	this.changed = 1;
	
	this.draw = function()
	{	
		piece_height = this.y + (-this.height * (this.lvl * 2));
		c.drawImage(this.image, this.x , piece_height, this.height, this.height);
	}

	this.update = function()
	{
		// random element of being able to reverse dx on square center
		if (this.x % height)
		{
			if (Math.random() > 0.999)
			{
				if (this.dx) this.dx = 0;
				else this.dx = 1;
			}		
		}

		// piece movement
		if (this.dx) this.x++; // and dx == 1 which is
		else this.x--;

		// piece barriers, if piece > than stopping right, it will go back

		stopping_xleft = this.lvl * 2 * this.height;
		stopping_xright = this.lvl * 12 * this.height;
		if (this.lvl == 0)
		{
			stopping_xleft = this.height;
			stopping_xright = this.height * 12;		
		}
		if (this.lvl >= 2) stopping_xleft = (this.lvl * 2 + (lvl / 2)) * this.height;
		if (this.x <= stopping_xleft)
		{
			// makes pieces go right
			this.dx = 1;
		}
		else if (this.x >= stopping_xright)
		{
			// makes pieces go left
			this.dx = 0;
		}

		this.draw();
	}
}


function draw_roofs()
{
	get_roof(0);
	get_roof(1);
	get_roof(2);
	get_roof(3);

}
function get_roof(lvl) // 0 is ground
{
	corner_width = height * (3 * lvl)
	if (lvl == 12) corner_width = height * ((8/3) * lvl);
	roof_height = height * (3.3 + (2 * -lvl))
	// y distance to get roofs touching
	n = -height * 0.4;

	c.drawImage(roof_left_image, corner_width, roof_height, height, height * 7);
	// now the second, slightly higher and to the right
	c.drawImage(roof_left_image, corner_width + height, roof_height + n, height, height * 7);

	for (i = 0; i < 4; i++)
	{
		c.drawImage(roof_mid_image, corner_width + (((4 * i) + 1) * height), roof_height, height * 4, height * 7);
		c.drawImage(roof_mid_image, corner_width + (((4 * i) + 2) * height), roof_height + n, height * 4, height * 7);
	}
}


var rook_image = new Image();
rook_image.src = 'images/rook.png';
var bishop_image = new Image();
bishop_image.src = 'images/bishop.png';
var knight_image = new Image();
knight_image.src = 'images/knight.png';
var king_image = new Image();
king_image.src = 'images/king.png';
var queen_image = new Image();
queen_image.src = 'images/queen.png';

var roof_left_image = new Image();
roof_left_image.src = 'images/roof_left.png';
var roof_mid_image = new Image();
roof_mid_image.src = 'images/roof_middle.png';

var pieceArray = [];

function piece_place(pieceArray, pieceImage, n, lvl)
{

	for (var i =0; i < n; i++)
	{
		var x = Math.round(Math.random() * 10) * (height) + (height * 2 * i);
		var y = height * 7;//Math.round(Math.random()*8) * height;
		var dx = Math.round(Math.random());;

		pieceArray.push(new Piece(pieceImage, x, y, dx, height, lvl));	
	}

	return pieceArray
}

function init()
{
	pieceArray = [];
	n = [8, 4, 4, 1, 1]; // number of pieces on each lvl
	lvl = [0, 1, 2, 3, 3];
	images = [rook_image, bishop_image, knight_image, king_image, queen_image];

	for (i = 0; i < 5; i++)
	{
		pieceArray = piece_place(pieceArray, images[i], n[i], lvl[i]); 
	}
}

init();


function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	if (r > 255) dr = -1;
	else if (r < 0) dr = 1;	

	if (g > 255) dg = -1;
	else if (g < 0) dg = 1;	

	if (b > 255) db = -1;
	else if (b < 0) db = 1;	

	r += Math.random() * 3 * dr;
	g += Math.random() * 3 * dg;
	b += Math.random() * 3 * db;

	update_board(r,g,b);
	draw_roofs();
	for (var i = 0; i < pieceArray.length; i++)
	{
		pieceArray[i].update();
	}
}

animate()