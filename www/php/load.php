<?php
	//LEJ I started this and might not finish it...
	//if network is available
	try
	{
		//open files
		$lunch = fopen("lunch.txt", "w") or die("Unable to open lunch file.");
		$clubs = fopen("clubs.txt", "w") or die("Unable to open clubs file.");
		$sports = fopen("sports.txt", "w") or die("Unable to open sports file.");
		$news = fopen("news.txt", "w") or die("Unable to open news file.");
		$notif = fopen("notif.txt", "w") or die("Unable to open notif file.");
		
		//okay, I dont know PHP. I'll admit that... future generations, please fix
		Parse.initialize("1nbCZcm4WHUpYs0C89oTo231mhcpL2LRa5KfsYtw", "nNWuXfGI2ujbWBzxd5Om3F3OgFIIZRfvonOxfdEc");
		fwrite($lunch, "did do");
	}
	catch(Exception $e) 
	{
		fwrite($lunch, "did not do");
	}
?>