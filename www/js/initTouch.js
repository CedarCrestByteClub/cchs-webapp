initialize();
		
$(document).on("swiperight", function(event) {
	var content = document.getElementById("holder2");
	var menu = document.getElementById("holder");
	//content.setAttribute("style", "width: 70%");
	content.style.cssFloat = "right";
	menu.style.display = "inline";
	//var offset = (content.clientWidth + 20);
	//menu.setAttribute("style", "right:-20px");
	//content.setAttribute("style", "margin-left:0px");
	document.getElementById("content").style.width = "102%";
	var table = document.getElementById("contentTable");
	var ratio = window.devicePixelRatio;
	var rHeight = $(window).height() - (window.outerHeight - $(window).height());
	for(i = 1; i < table.rows.length; i++) {
		var tr = table.getElementsByTagName("tr")[i];
		var td = tr.getElementsByTagName("td")[0];
		td.style.height = (rHeight / 9) + "px";
	}
	var div = document.getElementById("imageHolder");
	div.style.height = (rHeight / 5) + "px";
	var image = document.getElementById("stretchImage");
	image.style.height = div.style.height;
	image.style.width = div.style.width;
	//var holder = document.getElementById("menu");
	//console.log(holder.style.width);
	//holder.style.width = (menu.style.width + 30) + "px";
	//console.log(holder.style.width);
});

$(document).on("swipeleft", function(event) {
	//document.getElementById("holder2").setAttribute("style", "width: 100%");
	//document.getElementById("holder2").style.cssFloat = "right";
	document.getElementById("holder").style.display = "none";
	document.getElementById("content").style.width = "102%";
});