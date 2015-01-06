function login() {
	alert("Entered Login Function");
	var user = document.getElementById("Username").value;
	var pass = document.getElementById("Password").value;
	alert("Username is " + user);
	alert("Password is " + pass);
	Parse.User.logIn(user, pass, {
		success : function(user) {
			alert("Entered success");
			window.location = "home.html";
		},
		error : function(user, error) {
			alert("Your username and password do not match!");
		}
	});

}

function signUp() {
	window.location = "signUp.html";
}