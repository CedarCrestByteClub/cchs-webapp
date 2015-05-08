function login() {

	var user = document.getElementById("Username").value;
	var pass = document.getElementById("Password").value;

	Parse.User.logIn(user, pass, {
		success : function(user) {
			console.log("Entered success");
			window.location = "home.html";
		},
		error : function(user, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

}

function signUp() {
	window.location = "signUp.html";
}

function home() {
	window.location = "home.html";
}