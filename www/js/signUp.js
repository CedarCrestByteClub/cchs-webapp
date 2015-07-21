function signUp() 
{
	alert("Entered sign up");
	
	//retrieves user entered values
	var username = document.getElementById("Username").value;
	var pass1 = document.getElementById("Password").value;
	var pass2 = document.getElementById("Password2").value;
	
	//asserts that user entered values are valid
	if (validate(username, pass1, pass2)) 
	{
		alert("validate works");
		var user = new Parse.User();
		alert("Parse is initialized");
		
		user.setUsername(username);
		user.setPassword(pass1);
		console.log("username and password set");
		
		/*var People = Parse.Object.extend("People");
		var otherUser = new People();
		
		otherUser.set("Username", username);
		otherUser.set("Password", pass1);
		otherUser.save(null,
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
		console.log("Please help");
		user.signUp(null, {
			success : function(user) {

			},
			error : function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}
	window.location = "login.html";
	return false;
}

//eventually we should change this to require a longer username
//checks for blank username and password, and checks to make sure passwords are the same
function validate(username, pass1, pass2) 
{
	console.log("Entered validate");
	if (username !== "") 
	{
		if (pass1 === pass2) 
		{
			if (pass1 !== "") 
			{
				console.log("Returning true");
				return true;
			}
			else
				alert("Password field cannot be empty");
		}
		else
			alert("Passwords do not match!");
	}
	else
		alert("Username cannot be blank!");
}