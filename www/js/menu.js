function initialize() {
	document.getElementById("linkOne").setAttribute("href", "newHome.html");
	document.getElementById("linkTwo").setAttribute("href", "newScores.html");
	document.getElementById("linkThree").setAttribute("href", "lunches.html");
	document.getElementById("linkFour").setAttribute("href", "store.html");
	document.getElementById("linkFive").setAttribute("href", "club.html");
	document.getElementById("linkSix").setAttribute("href", "calendar.html");
	document.getElementById("linkSeven").setAttribute("href", "planner.html");
	document.getElementById("linkEight").setAttribute("href", "talon.html");
	document.getElementById("linkNine").setAttribute("href", "schoolNews.html");
	document.getElementById("linkTen").setAttribute("href", "map.html");
	document.getElementById("linkEleven").setAttribute("href", "delays.html");
	document.getElementById("linkTwelve").setAttribute("href", "FlappyFalcon.html");
	document.getElementById("linkThirteen").setAttribute("href", "info.html");
	//document.getElementById("linkFourteen").setAttribute("href", "Moodle.html");
	//document.getElementById("linkFifteen").setAttribute("href", "skyward/Skyward.html");
	
	document.getElementById("spanOne").innerHTML = "Home";
	document.getElementById("spanTwo").innerHTML = "Sports";
	document.getElementById("spanThree").innerHTML = "Lunches";
	document.getElementById("spanFour").innerHTML = "School Store";
	document.getElementById("spanFive").innerHTML = "Clubs";
	document.getElementById("spanSix").innerHTML = "Calendar";
	document.getElementById("spanSeven").innerHTML = "Homework Planner";
	document.getElementById("spanEight").innerHTML = "Talons";
	document.getElementById("spanNine").innerHTML = "District News";
	document.getElementById("spanTen").innerHTML = "Map";
	document.getElementById("spanEleven").innerHTML = "Delays/Closings";
	document.getElementById("spanTwelve").innerHTML = "Flappy Falcon";
	document.getElementById("spanThirteen").innerHTML = "About";
	if(localStorage.getItem("adminMode") == "true") {
		document.getElementById("linkFourteen").setAttribute("href", "admin.html");
		document.getElementById("spanFourteen").innerHTML = "Admin";
		var tr15 = document.getElementById("linkFifteen").parentNode.parentNode;
		tr15.parentNode.removeChild(tr15);	
	} else {
		var tr14 = document.getElementById("linkFourteen").parentNode.parentNode;
		var tr15 = document.getElementById("linkFifteen").parentNode.parentNode;
		tr14.parentNode.removeChild(tr14);
		tr15.parentNode.removeChild(tr15);	
	}
	
	console.log(localStorage.getItem("connection"));
	if(localStorage.getItem("connection") == "false") {
		removeOptions();
	}
}

function removeOptions() {
	console.log("ran");
	var table = document.getElementById("contentTable");
	if(localStorage.getItem("adminMode") == "true") {
		table.deleteRow(14);
	}
	table.deleteRow(11);
	table.deleteRow(9);
	table.deleteRow(8);
	table.deleteRow(6);
	table.deleteRow(5);
	table.deleteRow(4);
	table.deleteRow(3);
	table.deleteRow(2);
} 