
var counter = 4;

$(document).ready(function() {
	initializePage();
})

$(document).on('click', '.delete', function() {
   $(this).closest("li").remove(); 
});

function initializePage() {

$("#new-cat").click(projectClick);
$("#newt").click(teamAdd);

}

function teamAdd(e) {
	e.preventDefault();
	var user = document.getElementById("uname").value;
	console.log(user);
	counter++;
	$("#you").append("<li class='def'>" + user + " <span class='delete'><button>Remove</button></span></li>");
	document.getElementById("uname").value = '';	
}

function projectClick(e) {
	e.preventDefault();
	var category = document.getElementById("cname").value;
	var item = $("#items");
	console.log(category);
	counter++;
	$("#defaultItems").append("<li class='budg-item'>" +category+ " <span class='delete'><button>Remove</button></span>" +"<input type='range' class='slider' min='0' max='50' value='0' step='10' oninput='showValue("+counter+", this.value)' /><span id='range" + counter + "'>0</span></li>");
	document.getElementById("cname").value = '';	
}

function showValue(element, newValue)
{

	document.getElementById("range"+element).innerHTML=newValue;
	//access element in database using @element, update value with newValue 
};

function itemImage(itemName) {
	//check to see which item was clicked and get the image
	if (itemName == "small fertilizer"){
	  console.log("working");
	  return "http://www.clipartkid.com/images/681/some-fertilizers-are-manufactured-in-the-laboratory-while-others-are-lkQqF2-clipart.gif";
	}

	else if (itemName == "small pesticide") {
	  console.log(itemName);
	  return "http://www.clipartkid.com/images/349/pesticidesymptoms-of-poisoning-list-of-banned-pesticides-in-japan-DTEP1y-clipart.bmp";
	}

	else if (itemName == "small water") {
	  console.log(itemName);
	  return "http://www.clipartkid.com/images/512/11-cartoon-watering-can-free-cliparts-that-you-can-download-to-you-2VEZbZ-clipart.gif";
	}

	else if (itemName == "lettuce") {
	  console.log(itemName);
	  return "http://thegraphicsfairy.com/wp-content/uploads/2014/04/Public-Domain-Lettuce-Image-GraphicsFairy1.jpg";
	}

	else if (itemName == "natural fertilizer") {
	  console.log(itemName);
	  return "https://openclipart.org/download/172608/earthworm.svg";
	}

	else if (itemName == "lady bugs") {
	  console.log(itemName);
	  return "http://images.clipartpanda.com/bug-clipart-bug-clipart-09.jpg";
	}

	else if (itemName == "scarecrow") {
	  console.log(itemName);
	  return "http://images.clipartpanda.com/scarecrow-clip-art-scarecrow-clip-art-3.gif";
	}
		else if (itemName == "ants") {
	  console.log(itemName);
	  return "http://cliparting.com/wp-content/uploads/2016/10/Ants-clipart-clipart.jpg";
	}
		else if (itemName == "goat") {
	  console.log(itemName);
	  return "http://images.clipartpanda.com/goat-clip-art-clip-art-goats-445410.jpg";
	}
		else if (itemName == "large fertilizer") {
	  console.log(itemName);
	  return "http://www.clipartkid.com/images/681/some-fertilizers-are-manufactured-in-the-laboratory-while-others-are-lkQqF2-clipart.gif";
	}
	
};

//function for when item is clicked to update garden picture
function itemClick() {

	event.preventDefault();
	var item = $(this).text();
	var image = itemImage(item);

    var test = window.open("/"); // works the way i want, kinda, opens a new tab
	test.onload = function() {
	var pewp = test.document.getElementById('garden-img');
	$("<img src='"+ image +"' id='newImg'/>").appendTo(pewp);
	}

	//maybe try appendto?
	// console.log($(this).text());
};

//listener for clicking items with class useItem
$(".useItem").click(itemClick); 

// data = '[{"name" : "Ashwin", "age" : "20"},{"name" : "Abhinandan", "age" : "20"}]';
// var mydata = JSON.parse(data);
// document.getElementById("itemName").innerHTML=mydata[0].name;
