
var counter = 4;

$(document).ready(function() {
	initializePage();
})


function initializePage() {

$("#new-cat").click(projectClick);

}

function projectClick(e) {
	e.preventDefault();
	var category = $('#new-cat');
	var item = $("#items");
	console.log(category);
	counter++;
	$("#defaultItems").append("<li class='budg-item'>" +category+"<input type='range' class='slider' min='0' max='50' value='0' step='10' oninput='showValue("+counter+", this.value)' /><span id='range" + counter + "'>0</span></li>");
}

function showValue(element, newValue)
{

	document.getElementById("range"+element).innerHTML=newValue;
	//access element in database using @element, update value with newValue 
}

// data = '[{"name" : "Ashwin", "age" : "20"},{"name" : "Abhinandan", "age" : "20"}]';
// var mydata = JSON.parse(data);
// document.getElementById("itemName").innerHTML=mydata[0].name;



/* game functions/varialbes from here on */
var player, goat, grass;
var dirt = [];
var dirtX, dirtY;

function startGame() {
	setUpDirt();
	player = new component(45, 45, "deepskyblue", 200, 150);
	goat = new component(80, 30, "gray", 100, 100);
	myGameArea.start();
}

function setUpDirt() {
	dirtY = 0;
	grass = new component(1000,1000,"darkgreen", 0,0);

	for (i = 0; i < 3; i++){
		dirtX = 0;
			for (j = 0; j < 5; j++) {
				dirt.push(new component(160,135, "saddlebrown", dirtX+5, dirtY+5));
				dirtX = dirtX + 200;
			}
		dirtY = dirtY + 200;
	}
}

var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 960;
		this.canvas.height = 540;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);

		window.addEventListener('keydown', function(e) {
			myGameArea.keys = (myGameArea.keys || []);
			myGameArea.keys[e.keyCode] = true;
		})

		window.addEventListener('keyup', function(e) {
			myGameArea.keys[e.keyCode] = false;
		})
	},
	clear : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

}

//make it a person instead
function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.color = color;

	this.update = function() {
	  ctx = myGameArea.context;
	  ctx.fillStyle = color;
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	this.clear = function(){
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}

	this.catchGoat = function(otherObj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBott = this.y + (this.height);

		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + (otherObj.width);
		var otherTop = otherObj.y;
		var otherBott = otherObj.y +(otherObj.height);

		var caught = true;

		if((myBott < otherTop) || (myTop > otherBott) ||
			(myRight < otherLeft) || (myLeft > otherRight)) {
			caught = false;
		}
		return caught;
	}

	this.plant = function(otherObj) {
		var myLeft = this.x;
		var myRight = this.x + (this.width);
		var myTop = this.y;
		var myBott = this.y + (this.height);

		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + (otherObj.width);
		var otherTop = otherObj.y;
		var otherBott = otherObj.y +(otherObj.height);

		var plant = false;

		
		//if player touches the dirt from the top
		if ( (myBott == otherTop)  && (myLeft >= otherLeft) && (myRight <= otherRight) ) {
			plant = true;
		}
		//if player touches the dirt from the bottom
		else if ( (myTop == otherBott)  && (myLeft >= otherLeft) && (myRight <= otherRight) ) {
			plant = true;
		}
		//if player touches the dirt from the right side
		else if ( (myRight == otherLeft)  && (myTop >= otherTop) && (myBott <= otherBott) ) {
			plant = true;
		}
		//if player touches the dirt from the left side
		else if ( (myLeft == otherRight) && (myTop >= otherTop) && (myBott <= otherBott) ) {
			plant = true;
		}
		return plant;		
	}

	this.recolor = function (color){
	  this.color = color;
	}
}

function updateGameArea() {
	myGameArea.clear();



	player.speedY = 0;
	player.speedX = 0;

	if (myGameArea.keys && myGameArea.keys[65]) player.speedX = -5;
	
	if (myGameArea.keys && myGameArea.keys[68]) player.speedX = 5;

	if (myGameArea.keys && myGameArea.keys[83]) player.speedY = 5;

	if (myGameArea.keys && myGameArea.keys[87]) player.speedY = -5;

	//see if player caught the goat
	if (player.catchGoat(goat)){
		goat.x = goat.x + 10;
		goat.y = goat.y;
	}

	//display the grass and dirt
	grass.update();
	for (i = 0; i < dirt.length; i++){
		dirt[i].update();
		//if player touches dirt, let them plant
		if (player.plant(dirt[i])){
			switch(i) {
				case 0:
					dirt[0] = new component(dirt[0].width, dirt[0].height, "darkorange", dirt[0].x, dirt[0].y);
					break;

				case 1:
					dirt[1] = new component(dirt[1].width, dirt[1].height, "gold", dirt[1].x, dirt[1].y);
					break;

				case 2:
					dirt[2] = new component(dirt[2].width, dirt[2].height, "lime", dirt[2].x, dirt[2].y);
					break;

				case 3:
					dirt[3] = new component(dirt[3].width, dirt[3].height, "green", dirt[3].x, dirt[3].y);
					break;

				case 4:
					dirt[4] = new component(dirt[4].width, dirt[4].height, "darkblue", dirt[4].x, dirt[4].y);
					break;

				case 5:
					dirt[5] = new component(dirt[5].width, dirt[5].height, "crimson", dirt[5].x, dirt[5].y);
					break;

				case 6:
					dirt[6] = new component(dirt[6].width, dirt[6].height, "darkgoldenrod", dirt[6].x, dirt[6].y);
					break;

				case 7:
					dirt[7] = new component(dirt[7].width, dirt[7].height, "darkorchid", dirt[7].x, dirt[7].y);
					break;

				case 8:
					dirt[8] = new component(dirt[8].width, dirt[8].height, "maroon", dirt[8].x, dirt[8].y);
					break;

				case 9:
					dirt[9] = new component(dirt[9].width, dirt[9].height, "purple", dirt[9].x, dirt[9].y);
					break;

				case 10:
					dirt[10] = new component(dirt[10].width, dirt[10].height, "mediumslateblue", dirt[10].x, dirt[10].y);
					break;

				case 11:
					dirt[11] = new component(dirt[11].width, dirt[11].height, "mediumseagreen", dirt[11].x, dirt[11].y);
					break;

				case 12:
					dirt[12] = new component(dirt[12].width, dirt[12].height, "mediumvioletred", dirt[12].x, dirt[12].y);
					break;

				case 13:
					dirt[13] = new component(dirt[13].width, dirt[13].height, "yellow", dirt[13].x, dirt[13].y);
					break;

				case 14:
					dirt[14] = new component(dirt[14].width, dirt[14].height, "red", dirt[14].x, dirt[14].y);
					break;
				}
			}
		}
	
	
	goat.update();

	player.newPos();
	player.update();
}