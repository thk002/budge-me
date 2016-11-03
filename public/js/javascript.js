
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

