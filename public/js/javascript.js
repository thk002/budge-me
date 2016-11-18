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
$(".useItem").click(itemClick); 


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
	$("#defaultItems").append("<li class='budg-item'>" +category+ " <span class='delete'><button>Remove</button></span>" +"<input type='range' class='slider' min='0' max='1000' value='0' step='1' oninput='showValue("+counter+", this.value)' /><span id='range" + counter + "'>0</span></li>");
	document.getElementById("cname").value = '';	
}

function showValue(element, newValue)
{

	document.getElementById("range"+element).innerHTML=newValue;
	//access element in database using @element, update value with newValue 
};

//function for when item is clicked to update garden picture
function itemClick() {

  event.preventDefault();
  var item = $(this).text();

  $.getJSON("/JSON/dailyRewards.json", function(json) { 
    // console.log(json.dailyRewards[0]);
    for (var i = 0; i < json.dailyRewards.length; i++){
	  if (item == json.dailyRewards[i].title){
	    var img = json.dailyRewards[i].imageURL;
		itemInGarden(img);
	  } 
	}
});

  $.getJSON("/JSON/dailyPenalty.json", function(json) { 
    // console.log(json.dailyPenalty[0]);
    for (var i = 0; i < json.dailyPenalty.length; i++){
	  if (item == json.dailyPenalty[i].title){
	    var img = json.dailyPenalty[i].imageURL;
		itemInGarden(img);
	  } 
	}
});

  $.getJSON("/JSON/weeklyRewards.json", function(json) { 
    // console.log(json.weeklyRewards[0]);
    for (var i = 0; i < json.weeklyRewards.length; i++){
	  if (item == json.weeklyRewards[i].title){
	    var img = json.weeklyRewards[i].imageURL;
		itemInGarden(img);
	  } 
	}
});

  $.getJSON("/JSON/weeklyPenalty.json", function(json) { 
    // console.log(json.weeklyPenalty[0]);
    for (var i = 0; i < json.weeklyPenalty.length; i++){
	  if (item == json.weeklyPenalty[i].title){
	    var img = json.weeklyPenalty[i].imageURL;
		itemInGarden(img);
	  } 
	}
});


	//maybe try appendto?
	// console.log($(this).text());
};

function itemInGarden(image){
	var newWin = window.open("/home");

	newWin.onload = function() {
		var newGard = newWin.document.getElementById('garden-img');
		$("<img src='"+ image +"' id='newImg'/>").appendTo(newGard);
	}

};
//listener for clicking items with class useItem

// data = '[{"name" : "Ashwin", "age" : "20"},{"name" : "Abhinandan", "age" : "20"}]';
// var mydata = JSON.parse(data);
// document.getElementById("itemName").innerHTML=mydata[0].name;
