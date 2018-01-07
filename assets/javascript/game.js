//Making sure the DOM is ready, once the code is ready, it will manipulate the DOM to get it working
$(document).ready(function() {
// console.log("Get ready to click");

var aud = document.getElementById("myAudio");
aud.volume = 0.2; // 1 means 100%

//create an array of strings for topics
var topics = ['Acura NSX', 'Subaru STI', "Nissan GTR", 'Toyota Supra', 'Toyota AE86', 'Honda Type-R', 'Mazada RX-7'];

function createButtons(){
	$('.buttons').empty();
	for (var i= 0; i < topics.length; i++){
	$('.buttons').css('color', 'red').append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
}
};

createButtons();

function createNewButton(){
	var newButtonText= $('#searchInput').val();
	console.log(newButtonText);
	topics.push(newButtonText);
	createButtons()
};

$(".buttons").on("click", "button", function(event) {
	event.preventDefault();
	$(".coolGifs").empty();
	var buttonText = $(this).attr("data-name");
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.data.length; i++) {

			// HEY GUYS! See below for the stuff of interest!
			// The code below does the same thing that the messy code 
			// block we had before does... but it's a lot cleaner
			// and easier to make sense of. Message me if you have
			// any questions on the what/why/how of it!

			// first, each time we loop through, we're creating a new img tag
			var newDiv = $("<div />").addClass("divContent");
			var newImg = $("<img class='giphy' />");
      var rating= response.data[i].rating;
      var p = $('<h6>').text("Ratings: " + rating);

			// then, with each chained '.attr', we add the different data
			// attributes as well as the img src attribute
			newImg.attr("data-state", "still")
				.attr("data-still", response.data[i].images.fixed_height_small_still.url)
				.attr("data-anim", response.data[i].images.fixed_height_small.url)
				.attr("src", response.data[i].images.fixed_height_small_still.url)
			// then, the last thing we do is we append the newImg to the coolGifs container
			
			newDiv.append(newImg).append(p);
			$(".coolGifs").append(newDiv);

		}
	});

});

$(".coolGifs").on("click", ".giphy", function(event) {
	event.preventDefault();
	// clear the coolGifs container first!!!
	// $('.giphy').empty();

	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");

	if (gifState == "still") {
		$(this).attr("src", animUrl).attr('data-state', 'animate');
		 // this sets the src attribute to the animated url
		// set 'data-state' to be equal to 'anim'

	} else {
		$(this).attr("src", stillUrl).attr('data-state', 'still');
		// set src to be equal to value to data-still
		// set 'data-state' to be equal to still
	}

});

// Add a click event for the submit button in the 'add animal' section
// This click event should call the 'createNewButton' function

// this is calling it initially --- you'll be calling it again 
// each time a new button is created
$("#submitButton").on("click", function(event){
	event.preventDefault();
	console.log("Watch Grand Tour Season 2");
createNewButton();
})
});