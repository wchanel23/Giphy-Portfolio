$(document).ready(function() {
	var dogs = ["labrador retriever", "poodle", "bulldog", "yorkie", "cocker spaniel", "pug", "maltese"];
	var buttonDiv = $("#buttons");

	addButtons();
	function addButtons() {
		buttonDiv.empty();

		$.each(dogs, function(index, dog) {
			var newButton = $("<button>");
			newButton.text(dog);
			newButton.attr("data-name", dog);
			newButton.attr("id", "dog-button");
			buttonDiv.append(newButton);
		});
	}

	$(document).on("click", "#dog-button", function() {
		var itemsDiv = $("#items");
		itemsDiv.empty();

		var topic = $(this).attr("data-name");
		var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
		topic + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryUrl,
			method: "GET"

		}).done(function(response){
			var items = response.data;
			
			$.each(items, function(index, item) {
				var p = $("<p>");
				p.text("Rating: " + item.rating);
				itemsDiv.append(p);

				var itemImage = $("<img>");
				itemImage.attr("id", "item-image");
				itemImage.attr("data-animateUrl", item.images.fixed_height.url);
				itemImage.attr("data-stillUrl", item.images.fixed_height_still.url);
				itemImage.attr("data-state", "animate");
				itemImage.attr("src", item.images.fixed_height.url);
				itemsDiv.append(itemImage);
			});
		});
	});

	$(document).on("click", "#item-image", function() {
		var state = $(this).attr("data-state");
		if (state === "animate") {
			$(this).attr("data-state", "still");
			$(this).attr("src", $(this).attr("data-stillUrl"));
		} else if(state === "still") {
			$(this).attr("data-state", "animate");
			$(this).attr("src", $(this).attr("data-animateUrl"));
		}
	});

	$("#newDog").click(function() {
     event.preventDefault();

        var newDog = $("#dogInput").val();
		dogs.push(newDog);
		addButtons();
		$("#dogInput").val("");
	})



});

