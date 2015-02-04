function signUp() {
	//alert("Entered sign up")
	var username = document.getElementById("Username").value;
	var pass1 = document.getElementById("Password").value;
	var pass2 = document.getElementById("Password2").value;
	if (validate(username, pass1, pass2)) {
		//alert("validate works");
		var user = new Parse.User();
		//alert("Parse is initialized");
		user.set("username", username);
		user.set("password", pass1);
		alert("username and password set");
		var People = Parse.Object.extend("People");
		var otherUser = new People();
		otherUser.set("Username", username);
		otherUser.set("Password", pass1);
		/*otherUser.save(null,
		 {
		 success: function(otherUser)
		 {
		 alert("Entered signUp() success call");
		 },
		 error: function(otherUser, error)
		 {
		 alert("Entered my signUp() error call");
		 }
		 });*/
		alert("Please help");
		user.signUp(null, {
			success : function(user) {

			},
			error : function(user, error) {
				/*alert("Error: " + error.code + " " + error.message);*/
			}
		});
	}
	window.location = "login.html";

}

//eventually we should change this to require a longer username
//checks for blank username and password, and checks to make sure passwords are the same
function validate(username, pass1, pass2) {
	alert("Entered validate");
	if (username !== "") {
		if (pass1 === pass2) {
			if (pass1 !== "") {
				alert("Returning true");
				return true;
			} else
				alert("Password field cannot be empty");
		} else
			alert("Passwords do not match!");
	} else
		alert("Username cannot be blank!");
}