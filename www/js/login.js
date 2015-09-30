function login()
{

	var user = document.getElementById("Username").value;
	var pass = document.getElementById("Password").value;
	localStorage.username = user;
	localStorage.password = pass;
	Parse.User.logIn(user, pass, {
		success : function(user) {
			window.location = "home.html";
		},
		error : function(user, error) {
			alert(error);
		}
	});
}

function signUp()
{
	window.location = "signUp.html";
}

function home()
{
	window.location = "home.html";
}

function autologin(user, pass)
{
	Parse.User.logIn(user, pass, {
		success : function(user) {
			window.location = "home.html";
		},
		error : function(user, error) {
			window.location = "login.html";
		}
	});
}