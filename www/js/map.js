for(i = 0; i < 1; i++) {
	//Create variables that need to be used globally
	//Get original canvas and its height and width
	var canvasstart = document.getElementById("drawCanvas");
	var height = canvasstart.height - 10;
	var width = canvasstart.width - 10;
	//Get actual drawing surface
	var canvas = canvasstart.getContext("2d");
	//console.log("Got canvas");
	var roomStart = "";
	var roomEnd = "";
	var path = [];
	var directions = [];
	var directionsIndex = 0;
	var specialCase = 0;
	var pressStart = false;
	var check1 = false;
	var check2 = false;
	var sClass = 0;
	var eClass = 0;
	var screenWidth = screen.width;
	var screenHeight = screen.height;
	var ratio = screenWidth / 250;
	//alert("" + ratio);
	canvas.canvas.width = 250 * ratio;
	canvas.canvas.height = 150 * ratio;
	canvas.lineWidth = canvas.lineWidth * ratio;
	var originalWidth = canvas.lineWidth;
	
}   
//Searches teacher array and finds entries that match what the user types in and adds them to the select
//For starting classroom
function searchStart() {
	check1 = true;
    var textBox = document.getElementById("startRoomInput");
    var text = textBox.value;
    var list = [];
    var names = [];
    var holder = [];
    var temp = [];
    var select = document.getElementById("slistOfOptions");
    if(pressStart == true) {
    	text = select.options[select.selectedIndex].value;
    } else {
	    while(select.options.length > 0) {
	        select.removeChild(select.options[0]);
	    }
	    var tempoption = document.createElement("option");
    	tempoption.value = "";
    	tempoption.innerHTML = "Select";
    	select.appendChild(tempoption);
    }
    //console.log(text);
    //console.log(parseInt(text));
    if(!isNaN(parseInt(text))) {
	    for(i = 0; i < teachers.length; i++) {
	        var Croom = "" + teachers[i].get("room");
	        if((Croom.indexOf(text) == 0 && text != null) || (teachers[i].get("name").indexOf(text) == 0 && text != null)) {
	            list.push(Croom);
	            names.push("" + teachers[i].get("name"));
	        }
	    }
	    for(var i= 0; i < list.length; ++i){
		    var min = i;
		    for (z = i; z < list.length; ++z){
		        if (list[min].localeCompare(list[z]) > 0){
		        	min = z;
		        }
		    }
			var temp = list[min];
			var temp2 = names[min];
			list[min] = list[i];
			names[min] = names[i];
			list[i] = temp;
			names[i] = temp2;
		}
	    for(i = 0; i < list.length; i++) {
	        var Croom = list[i];
	        var option = document.createElement("option");
	        option.value = Croom;
	        option.innerHTML =Croom + " - " + names[i];
	        select.appendChild(option);
	    }
        if([1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 707, 103].indexOf(parseInt(text)) >= 0) {
            roomStart = text;
        } else {
            var room = parseInt(text);
            var index = 0;
            for(i = 0; i < teachers.length; i++) {
                //console.log(teachers[i].get("room"));
                if(parseInt(teachers[i].get("room")) == room) {
                    index = i;
                }
            }
            //console.log(index);
            roomStart = teachers[index].get("room");
        }
    } else {
        var room = text.toLowerCase();
        //console.log(room);
        for(i = 0; i < teachers.length; i++) {
        	//console.log(teachers[i].get("name").toLowerCase());
        	if(((teachers[i].get("name").toLowerCase()).indexOf(room) == 0 && room.length > 0)) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,3).localeCompare("Mr.") == 0 && teachers[i].get("name").substring(4).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,4).localeCompare("Mrs.") == 0 && teachers[i].get("name").substring(5).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,4).localeCompare("Sra.") == 0 && teachers[i].get("name").substring(5).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	}
        }
    }
    var room = text.toLowerCase();
    var specialRooms = ["Auditorium", "LGI", "Cafeteria", "Library", "Gym A", "Gym B", "Weight Room", "Main Office", "Counseling Office", "Nurse", "Career Center", "Flex Lab"]; 
	var specialValues = ["1006","707","1001","1002","1003","1004","1005","1008","1009","1010","1011","103"];
	for(i = 0; i < specialRooms.length; i++) {
		if(specialRooms[i].toLowerCase().indexOf(room) == 0) {
			var option = document.createElement("option");
	        option.value = specialValues[i];
	        option.innerHTML = specialRooms[i];
	        select.appendChild(option);
		}
	}
}
//Searches teacher array and finds entries that match what the user types in and adds them to the select
//For end classroom
function searchEnd() {
	check2 = true;
    var textBox = document.getElementById("endRoomInput");
    var text = textBox.value;
    var list = [];
    var names = [];
    var holder = [];
    var temp = [];
    var select = document.getElementById("elistOfOptions");
    if(pressStart == true) {
    	text = select.options[select.selectedIndex].value;
    } else {
	    while(select.options.length > 0) {
	        select.removeChild(select.options[0]);
	    }
	    var tempoption = document.createElement("option");
	    tempoption.value = "";
	    tempoption.innerHTML = "Select";
	    select.appendChild(tempoption);
    }
    if(!isNaN(parseInt(text))) {
	    for(i = 0; i < teachers.length; i++) {
	        var Croom = "" + teachers[i].get("room");
	        if((Croom.indexOf(text) == 0 && text != null) || (teachers[i].get("name").indexOf(text) == 0 && text != null)) {
	            list.push(Croom);
	            names.push("" + teachers[i].get("name"));
	        }
	    }
	    for(var i= 0; i < list.length; ++i){
		    var min = i;
		    for (z = i; z < list.length; ++z){
		        if (list[min].localeCompare(list[z]) > 0){
		        	min = z;
		        }
		    }
			var temp = list[min];
			var temp2 = names[min];
			list[min] = list[i];
			names[min] = names[i];
			list[i] = temp;
			names[i] = temp2;
		}
	    for(i = 0; i < list.length; i++) {
	        var Croom = list[i];
	        var option = document.createElement("option");
	        option.value = Croom;
	        option.innerHTML =Croom + " - " + names[i];
	        select.appendChild(option);
	    }
        if([1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014].indexOf(parseInt(text)) >= 0) {
            roomEnd = text;
        } else {
            var room = parseInt(text);
            //console.log(room);
            var index = 0;
            for(i = 0; i < teachers.length; i++) {
                //console.log(teachers[i].get("room"));
                if(parseInt(teachers[i].get("room")) == room) {
                    index = i;
                }
            }
            //console.log(index);
            roomEnd = teachers[index].get("room");
        }
    } else {
        var room = text.toLowerCase();
        //console.log(room);
        for(i = 0; i < teachers.length; i++) {
        	//console.log(teachers[i].get("name").toLowerCase());
        	if((teachers[i].get("name").toLowerCase()).indexOf(room) == 0 && room.length > 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,3).localeCompare("Mr.") == 0 && teachers[i].get("name").substring(4).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,4).localeCompare("Mrs.") == 0 && teachers[i].get("name").substring(5).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	} else if(teachers[i].get("name").substring(0,4).localeCompare("Sra.") == 0 && teachers[i].get("name").substring(5).toLowerCase().indexOf(room) == 0) {
        		var option = document.createElement("option");
	        	option.value = teachers[i].get("room");
	        	option.innerHTML = teachers[i].get("room")+ " - " + teachers[i].get("name");
	        	select.appendChild(option);
        	}
        }
    }
    var room = text.toLowerCase();
    var specialRooms = ["Auditorium", "LGI", "Cafeteria", "Library", "Gym A", "Gym B", "Weight Room", "Main Office", "Counseling Office", "Nurse", "Career Center", "Flex Lab"]; 
	var specialValues = ["1006","707","1001","1002","1003","1004","1005","1008","1009","1010","1011","103"];
	for(i = 0; i < specialRooms.length; i++) {
		if(specialRooms[i].toLowerCase().indexOf(room) == 0) {
			var option = document.createElement("option");
	        option.value = specialValues[i];
	        option.innerHTML = specialRooms[i];
	        select.appendChild(option);
		}
	} 
}
//Changes text field to match what the user selects in the select
function changeStart(selected) {
    if(selected != "") {
        var textBox = document.getElementById("startRoomInput");
        textBox.value = selected;
	}
}
//Changes text field to match what the user selects in the select
function changeEnd(selected) {
    if(selected != "") {
        var textBox = document.getElementById("endRoomInput");
        textBox.value = selected;
    }
}

//Passes the x and y coords of the top left of the hallway, the direction(0 for vertical and 1 for horizontal)
//The length is centimeters, the id number, an array of the rooms in the hall, and the distance and side from the start of the hall
function Hallway(x,y,direc,length,id,allRooms,coords){  
   this.x = x;  
   this.y = y;
   this.direc = direc;
   this.length = length;
   this.id = id;
   this.allRooms = allRooms;
   this.coords = coords;
}
//Passes the two hallway ids that are intersecting, which holds two hall objects, the coords of it, and the ids of the hallways
function Intersection(num1,num2) {
   //For normal intersections
   if(num1 < 50 && num2 < 50) {
    this.hall1 = halls[num1-1];
    this.hall2 = halls[num2-1];
    this.x = halls[num1-1].x;
    this.y = halls[num2-1].y;
    this.id1 = num1;
    this.id2 = num2;
   //For the basement stairways
   } else if(num1 == 100 && num2 == 200) {
    this.hall1 = null;
    this.hall2 = null;
    this.x = 20;
    this.y = 5;
    this.id1 = 100;
    this.id2 = 200;
   } else if(num1 == 200 && num2 == 300) {
    this.hall1 = null;
    this.hall2 = null;
    this.x = 23.5;
    this.y = 5;
    this.id1 = 200;
    this.id2 = 300;
   }
}
//Polymorphic class that takes place of an intersection, only handles one entrance to a staircase
function Stair(x,y) {
	this.x = x;
	this.y = y;
}
//Allows teachers to be stored offline and accessed in the same way that Parse handles its objects
function Teacher(name, room) {
	this.name = name;
	this.room = room;
}
//Create draw "method"
Hallway.prototype.draw = function(x1, y1, x2, y2) {
    canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
    canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
    canvas.strokeStyle = "#858585";
    canvas.stroke();
};
//Mimics the Parse function that returns a field of an object
Teacher.prototype.get = function(param) {
	if(param === "name") {
		return this.name;
	}
	if(param === "room") {
		return this.room;
	}
};

//Manually creates all of the hallways and intersections and adds them to arrays
for(i = 0; i < 1; i++) {
    //Creates all of the hallways in the school
    var hall1 = new Hallway(.4,11.5,0,6,1,["301","302","304","305","306","307","308","310","311","312"], ["r1.0", "l1.0", "l1.5", "r3.5", "l3.5", "r4.0", "l4.0", "l6.5", "r6.5", "l7.0"]);
    var hall2 = new Hallway(.4,9.4,1,4.5,2,["303","1001"], ["r3.5","l5.0"]);
    var hall3 = new Hallway(.4,6.8,1,12.3,3,["309","313","315","317","417","415","413","412","411","410","409","408","407","406","405","404", "403", "402"], ["r1.5", "r2.5", "r3.0", "r4.0", "l1.5", "l3.0", "l4.0", "r6.0", "l6.0", "r7.0", "l7.5", "r8.5", "l8.0", "r9.0", "l9.5", "r10.5", "l11.0", "r11.0"]);
    var hall4 = new Hallway(.4,5.6,1,4.7,4,["314","316","313","315","318","320","322","317"], ["r1.0", "r1.5", "l2.5", "l3.0", "r2.5", "r3.0", "r4.0", "l4.0"]);
    var hall5 = new Hallway(5,9.5,0,4.8,5,[], []);
    var hall6 = new Hallway(6,6.8,0,5.3,6,[], []);
    var hall7 = new Hallway(6,4.4,1,2.9,7,["213","212","211","209","207"], ["l0.2", "r1.5", "l1.5", "l2.0", "l2.5"]);
    var hall8 = new Hallway(2,3.5,1,6.8,8,["221","219","217","215","210","208","206","204","1002"], ["l1.0", "l2.0", "l2.5", "l3.5", "r4.5", "r5.5", "r6.0", "r6.5","r1.0"]);
    var hall9 = new Hallway(8.8,4.4,0,1,9,[], []);
    var hall10 = new Hallway(1.5,1.4,1,9.3,10,["120","118","116","114","113","112","110","111","108","109","107","105","103"], ["r0.5", "r1.0", "r2.0", "r3.0", "l3.0", "r4.0", "r4.5", "l4.7", "r5.0", "l5.5", "l6.0", "l7.0", "l7.5"]);
    var hall11 = new Hallway(10.9,5.7,0,4.7,11,["201","1010","1011"], ["r2.0","r3.5","l4.5"]);
    var hall12 = new Hallway(12.7,6.9,0,5.8,12,["514","512","1014"], ["l2.5", "l3.0","l5.0"]);
    var hall13 = new Hallway(10.8,5.7,1,7,13,["610","608","606","604","602"], ["r2.5", "r3.5", "r4.0", "r5.5", "r6.0"]);
    var hall14 = new Hallway(12.7,3.5,1,5.2,14,["510","508","506","504","502"], ["l0.5", "l1.5", "l2.5", "l3.0", "l4.0"]);
    var hall15 = new Hallway(17.8,13,0,12,15,["500","707","705","703","701","1005","1006","1013"], ["l8.0", "r5.5", "r4.5", "r4.0", "r3.5","r1.0","l11.5","l4.5"]);
    var hall16 = new Hallway(12,10.7,1,5.8,16,["1003"], ["l4.5"]);
    var hall17 = new Hallway(20.6,3.8,1,3.3,17,["809","808","807"], ["l0.5", "r1.0", "r2.5"]);
    var hall18 = new Hallway(22.5,3.8,0,2.7,18,["806","805","804"], ["r2.5", "r3.0", "r3.5"]);
    var hall19 = new Hallway(20.7,1.7,1,1.8,19,["803","802","801"], ["r1.0", "l1.0", "l0.5"]);
    var hall20 = new Hallway(20.8,1.7,0,1.7,20,[], []);
    var hall21 = new Hallway(5,4.7,1,1,21,["214"], ["r0.5"]);
    var hall22 = new Hallway(10.8,1,1,7,22,["106","104","102","1008","1009","1012"],["r3.7", "r3.7", "r6.2","r9.0","r9.5","l1.0"]);
    var hall23 = new Hallway(12.1,10.7,0,3.9,23,["401","1004"],["l3.5","r4.0"]);
    var hall24 = new Hallway(8.8,4,1,2.1,24,["205","203","202"],["l0.5", "l1.0", "r0.5"]);
    var halls = [hall1,hall2,hall3,hall4,hall5,hall6,hall7,hall8,hall9,hall10,hall11,hall12,hall13,hall14,hall15,hall16,hall17,hall18,hall19, hall20,hall21,hall22,hall23,hall24];
    
    var tstair1 = new Stair(12.7,6.8);
	var tstair2 = new Stair(17.8,5.7);
	var tstair3 = new Stair(17.8,3.5);
	var bstair1 = new Stair(20.8,0);
	var bstair2 = new Stair(20.6,3.8);
	var bstair3 = new Stair(23.9,3.8);
	var stairs = [tstair1,tstair2,tstair3,bstair1,bstair2,bstair3];
    
    //Configures all of the intersections in the school
    var int1 = new Intersection(1,2);
    var int2 = new Intersection(1,3);
    var int3 = new Intersection(1,4);
    var int4 = new Intersection(5,2);
    var int5 = new Intersection(5,3);
    var int6 = new Intersection(5,4);
    var int7 = new Intersection(5,21);
    var int8 = new Intersection(6,3);
    var int9 = new Intersection(6,7);
    var int10 = new Intersection(6,8);
    var int11 = new Intersection(6,10);
    var int12 = new Intersection(9,7);
    var int13 = new Intersection(9,8);
    var int14 = new Intersection(9,24);
    var int15 = new Intersection(11,13);
    var int16 = new Intersection(11,24);
    var int17 = new Intersection(11,10);
    var int18 = new Intersection(11,22);
    var int19 = new Intersection(23,16);
    var int20 = new Intersection(23,3);
    var int21 = new Intersection(12,3);
    var int22 = new Intersection(12,13);
    var int23 = new Intersection(12,14);
    var int24 = new Intersection(12,22);
    var int25 = new Intersection(15,16);
    var int26 = new Intersection(15,13);
    var int27 = new Intersection(15,14);
    var int28 = new Intersection(15,22);
    var int29 = new Intersection(18,17);
    var int30 = new Intersection(18,19);
    var int31 = new Intersection(20,19);
    var int32 = new Intersection(6,21);
    var int33 = new Intersection(100,200);
    var int34 = new Intersection(200,300);
    var intersections = [int1,int2,int3,int4,int5,int6,int7,int8,int9,int10,int11,int12,int13,int14,int15,int16,int17,int18,int19,int20,int21,int22,int23,int24,int25,int26,int27,int28,int29,int30,int31,int32,int33,int34,tstair1,tstair2,tstair3,bstair1,bstair2,bstair3];
}

//Starts drawing path and draws all of the hallways
function sketch() {
	canvas.globalAplha = 1;
	canvas.beginPath();
	for(i=0; i < halls.length; i++) {
	   var a = halls[i];
	   if(a.direc == 0) {
	      var x1 = (a.x*10)+10;
	      var y1 = height-(a.y*10);
	      var x2 = (a.x*10)+10;
	      var y2 = height-((a.y-a.length)*10);
	      a.draw(x1,y1,x2,y2);
	   } else {
	      var x1 = (a.x*10)+10;
	      var y1 = height-(a.y*10);
	      var x2 = ((a.x+a.length)*10)+10;
	      var y2 = height-(a.y*10);
	      a.draw(x1,y1,x2,y2);
	   }
	}
	for(i=0; i<=4; i++) {
		canvas.lineWidth = 1;
		canvas.moveTo(canvas.canvas.width, canvas.canvas.height - 1);
		canvas.lineTo(canvas.canvas.width, canvas.canvas.height);
		canvas.stroke();
		canvas.lineWidth = originalWidth;
	}
	canvas.closePath();
}

//Adds each teacher into an object and into an array
for(c = 0; c < 1; c++) {
	sketch();
	//var roomClass = Parse.Object.extend("Teachers");
	//var roomQuery = new Parse.Query(roomClass);
	//roomQuery.limit(300);
	var teachers = [];
	var tNames = ["Mrs. Lebo", "Hansell", "Hall", "Straight", "Hopwood", "Zackey", "Chandler", "Sra. Snyder", "Hostetter", "Schwalm", "Hepler", "Gernert", "Dissinger", "Keefer", "Lukridge", "Zorilla", "Flex Lab", "Boger", "Barnhart", "Batistelli", "Bielecki", "Bott", "Brightbill", "Campbell", "Cronin", "Custer", "Doll", "Mrs. Dresch", "Eckert", "Engebretson", "Felli", "Fried", "Gates", "Gebhard", "Gingrich", "Goodreau", "Grumbine", "Haines", "Harris", "Haussener", "Heizman", "Hulme", "Hysick", "Isenberg", "Jeffrey", "Keath", "Keddie", "Keightly", "King", "Kohr", "Kulikowski", "Kyper", "Lambros", "Mr. Lebo", "Lehmier", "Lieboff", "Mr. Leonard", "Mrs. Leonard", "Light", "Lilley", "Lumsden", "Sides", "J. Smith", "Lutz", "Marzock", "Miller", "Mull", "Munnion", "O'Kain", "Oplinger", "Pierce", "Plichta", "Powers", "Reed", "Reisch", "Rhen", "Rhoades", "Mr. Risser", "Mrs. Risser", "Rita", "Schaffer", "Rodriguez", "Schelhorn", "Schultheis", "Scipioni", "T. Smith", "Mr. Snyder", "Mrs. Snyder", "Spohn", "Steckbeck", "Steedle", "Stettner", "Sullivan", "Mrs. Thomas", "Mr. Thomas", "Tobin", "C. Wagner", "J. Wagner", "Waranavage", "Weber", "Weitzel", "Welliver", "Wildasin", "Williams"];
	var tLocations = [302, 306, 308, 310, 312, 314, 318, 219, 217, 113, 120, 118, 116, 114, 110, 111, 103, 202, 206, 205, 502, 305, 153, 102, 317, 212, 303, 305, 313, 214, 401, 412, 413, 307, 606, 807, 403, 608, 806, 409, 322, 701, 304, 508, 207, 512, 602, 155, 215, 204, 106, 604, 107, 402, 309, 210, 417, 510, 410, 514, 532, 703, 406, 808, 208, 405, 506, 315, 200, 404, 104, 221, 105, 803, 211, 203, 311, 112, 1007, 408, 500, 143, 185, 201, 108, 703, 301, 415, 802, 303, 534, 804, 809, 207, 213, 805, 215, 209, 109, 316, 407, 610, 801, 320];
	for(i = 0; i < tNames.length; i++) {
		teachers.push(new Teacher(tNames[i], tLocations[i]));
	}
	/*roomQuery.find({
	    success: function(results) {
	            for (var i = 0; i < results.length; i++) { 
	                //teachers.push(results[i]);
	            }
	    },
	    error: function(error) {
	            alert("Error: " + error.code + " " + error.message);
	    }
	});*/
}

//Print each direction to the console
function giveDirections() {
	directions = [];
	var first = true;
	if(roomStart == roomEnd) {
		directions.push("Same classroom.");
		var label = document.getElementById("directionsLabel");
		label.innerHTML = directions[0];
		return;
	}
	for(b = 0; b < path.length; b++) {
		//console.log("b:" + b);
		var message = "";
		//For the first direction, from class to intersection
		if(b == 0) {
			var inter = 0;
			var a=0;
			if(path[a+1] == 100) {inter = intersections[intOf(12,3)];}
	        else if(path[a+1] == 200) {inter = intersections[intOf(15,13)];}
	        else if(path[a+1] == 300) {inter = intersections[intOf(15,14)];}
	        else if(path[a+1] == 150) {if(path[a+1] == 200) {inter = intersections[intOf(15,13)];} else if(path[a+1] == 300) {inter = intersections[intOf(15,14)];}}
	        else if(path[a+1] == 400) {inter = stairs[4];}
	        else if(path[a+1] == 500) {inter = stairs[5];}
	        else {intersections[intOf(path[0],path[1])];}
			var current = halls[path[0]-1];
			var otherHalls = [];
			for(a = 0; a < intersections.length; a++) {
	            if(intersections[a].id1 == current.id) {
	                otherHalls.push(intersections[a].hall2);
	            } else if(intersections[a].id2 == current.id) {
	                otherHalls.push(intersections[a].hall1);
	            }
	        }
	        var passedInts = [];
	        for(a = 0; a < path.length - 1; a++) {
	        	if(path[a+1] == 100) {a++;passedInts.push(intOf(12,3));passedInts.push(37);}
	        	else if(path[a+1] == 200) {a++;passedInts.push(intOf(15,13));passedInts.push(38);}
	        	else if(path[a+1] == 300) {a++;passedInts.push(intOf(15,14));passedInts.push(39);}
	        	else if(path[a+1] == 150) {}
	        	else if(path[a+1] == 500) {a++;passedInts.push(38);passedInts.push(intOf(15,13));}
	        	else if(path[a+1] == 400) {a++;passedInts.push(39);passedInts.push(intOf(15,14));}
	        	else {passedInts.push(intOf(path[a],path[a+1]));}
	        }	
	        for(a = 0; a < passedInts.length; a++) {
	        	console.log("passed " + passedInts[a]);
	        }
	        var rank = 1;
			if(current.direc == 0) {
				//console.log("class" + (current.y - parseFloat(current.coords[sClass].substring(1))) + " intersection" + intersections[passedInts[0]].y);
				if((current.y - parseFloat(current.coords[sroom].substring(1))) > intersections[passedInts[0]].y) {
					//console.log("hall" + current.id + " class" + current.coords[sroom]);
					if(current.coords[sroom].substring(0,1).localeCompare("l") == 0) {
						message += "Turn right";
					} else {
						message += "Turn left";
					}
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].y < (current.y - parseFloat(current.coords[sroom].substring(1))) && otherHalls[i].y > inter.y) {
        					rank += 1;
        				}
        			}
				} else {
					if(current.coords[sroom].substring(0,1).localeCompare("r") == 0) {
						message += "Turn right";
					} else {
						message += "Turn left";
					}
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].y > (current.y - parseFloat(current.coords[sroom].substring(1))) && otherHalls[i].y < inter.y) {
        					rank += 1;
        				}
        			}
				}
			}
			else {
				if(current.x + parseFloat(current.coords[sroom].substring(1)) > intersections[passedInts[0]].x) {
					if(current.coords[sroom].substring(0,1).localeCompare("l") == 0) {
						message += "Turn right";
					} else {
						message += "Turn left";
					}
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].x < (current.x + parseFloat(current.coords[sroom].substring(1))) && otherHalls[i].x > inter.x) {
        					rank += 1;
        				}
        			}
				} else {
					if(current.coords[sroom].substring(0,1).localeCompare("r") == 0) {
						message += "Turn right";
					} else {
						message += "Turn left";
					}
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].x < (current.x + parseFloat(current.coords[sroom].substring(1))) && otherHalls[i].x > inter.x) {
        					rank += 1;
        				}
        			}
				}
			}
			if(path[b+1] == 100 || path[b+1] == 200 || path[b+1] == 300){b++;message += ", walk straight, and go down the stairs.";}
			else if(path[b+1] == 150){b+=2;console.log(b);message += ", walk straight, and go down the stairs.";}
			else if(path[b+1] == 400 || path[b+1] == 500){b++;message += ", walk straight, and go up the stairs.";if(path.length > 5) {b++;}}
			else {
				message += ", walk straight, and turn ";
				if(current.direc == 0) {
					if(intersections[passedInts[0]].y > (current.y - parseFloat(current.coords[sroom].substring(1)))) {
						if(intersections[passedInts[1]].x > intersections[passedInts[0]].x) {
							message += "right";
						} else {
							message += "left";
						}
					} else {
						if(intersections[passedInts[1]].x > intersections[passedInts[0]].x) {
							message += "left";
						} else {
							message += "right";
						}
					}
				} else {
					if(intersections[passedInts[0]].x > (current.x + parseFloat(current.coords[sroom].substring(1)))) {
						if(intersections[passedInts[1]].y > intersections[passedInts[0]].y) {
							message += "left";
						} else {
							message += "right";
						}
					} else {
						if(intersections[passedInts[1]].y > intersections[passedInts[0]].y) {
							message += "right";
						} else {
							message += "left";
						}
					}
				}
				message += " at the ";
				if(rank == 1) {
					message += "first";
				} else if(rank == 2) {
					message += "second";
				} else if(rank == 3) {
					message += "third";
				} else if(rank == 4) {
					message += "fourth";
				} else if(rank == 5) {
					message += "fifth";
				}
				message += " intersection.";
			}
	        console.log(b + "" + message);
	        directions.push(message);
		}
		//For the middle directions, from intersection to intersection
		else if(b < path.length - 2) {
			var a = b;
			var inter = 0;
			if(path[a+1] == 100) {inter = stairs[0];}
			else if(path[a] == 150) {if(path[a+1] == 200) {inter = stairs[1];} else if(path[a+1] == 300) {inter = stairs[2];}}
	        else if(path[a+1] == 200) {inter = stairs[1];}
	        else if(path[a+1] == 300) {inter = stairs[2];}
	        else if(path[a+1] == 500) {inter = stairs[4];}
	        else if(path[a+1] == 400) {inter = stairs[5];}
	        else {inter = intersections[intOf(path[b],path[b+1])];}
	        //if(interesections[passedInts[b-1]].id)
	        //if(path[a] == 400 || path[a] == 500) {
	        	//var message = "Walk straight and go up the stairs.";
	        	//console.log(message);
	        //}
	        if([100,200,300,400,500].indexOf(path[a]) < 0) {
	        	var current = halls[path[b]-1];
	        	if(path.indexOf(150) > 0) {
	        		console.log("Before: " + b);
	        		b-=2;
	        		console.log("After: " + b);
	        		//current = halls[path[b]-1];
	        		//first = false;
	        	}
	        	//console.log("current" + path[b] + "passedInts" + passedInts[b+1]);
				var otherHalls = [];
				for(a = 0; a < intersections.length - 6; a++) {
		            if(intersections[a].id1 == current.id) {
		                otherHalls.push(intersections[a].hall2);
		            } else if(intersections[a].id2 == current.id) {
		                otherHalls.push(intersections[a].hall1);
		            }
		        }
		        var passedInts = [];
		        for(a = 0; a < path.length - 1; a++) {
		        	if(path[a+1] == 100) {a++;passedInts.push(intOf(12,3));passedInts.push(37);}
		        	else if(path[a+1] == 200) {a++;passedInts.push(intOf(15,13));passedInts.push(38);}
		        	else if(path[a+1] == 300) {a++;passedInts.push(intOf(15,14));passedInts.push(39);}
		        	else if(path[a+1] == 150) {}
		        	else if(path[a+1] == 500) {a++;passedInts.push(38);passedInts.push(intOf(15,13));}
		        	else if(path[a+1] == 400) {a++;passedInts.push(39);passedInts.push(intOf(15,14));}
		        	else {passedInts.push(intOf(path[a],path[a+1]));}
		        }	
		        var rank = 1;
				if(current.direc == 0) {
					//console.log("class" + (current.y - parseFloat(current.coords[sClass].substring(1))) + " intersection" + intersections[passedInts[0]].y);
					if(intersections[passedInts[b-1]].y > intersections[passedInts[b]].y) {
						//console.log("hall" + current.id + " class" + current.coords[sroom]);
						for(i = 0; i < otherHalls.length; i++) {
	        				if(otherHalls[i].y < intersections[passedInts[b-1]].y && otherHalls[i].y > inter.y) {
	        					rank += 1;
	        				}
	        			}
					} else {
						for(i = 0; i < otherHalls.length; i++) {
	        				if(otherHalls[i].y > intersections[passedInts[b-1]].y && otherHalls[i].y < inter.y) {
	        					rank += 1;
	        				}
	        			}
					}
				} else {
					if(intersections[passedInts[b-1]].x > intersections[passedInts[b]].x) {
						for(i = 0; i < otherHalls.length; i++) {
	        				if(otherHalls[i].x < intersections[passedInts[b-1]].x && otherHalls[i].x > inter.x) {
	        					rank += 1;
	        				}
	        			}
					} else {
						for(i = 0; i < otherHalls.length; i++) {
	        				if(otherHalls[i].x < intersections[passedInts[b-1]].x && otherHalls[i].x > inter.x) {
	        					rank += 1;
	        				}
	        			}
					}
				}
				message += "Walk straight and turn ";
				var ehall = path[path.length-1];
				var intbx = intersections[passedInts[b]].x;
				var intby = intersections[passedInts[b]].y;
				var intb1x = 0;
				var intb1y = 0;
				//console.log("array value " + intersections[passedInts[b+1]].x);
				if(b < passedInts.length - 1) {
					intb1x = intersections[passedInts[b+1]].x;
					intb1y = intersections[passedInts[b+1]].y;
				}
				else {
					if(halls[ehall-1].direc == 1) {
						intb1x = halls[ehall-1].x + parseFloat(halls[ehall-1].coords[eroom].substring(1));
						intb1y = halls[ehall-1].y;
					} else {
						intb1x = halls[ehall-1].x;
						intb1y = halls[ehall-1].y - parseFloat(halls[ehall-1].coords[eroom].substring(1));
					}
				}
				if(b == 1) {
					//console.log("bx is " + intbx + " and b1x is " + intb1x);
				}
				if(current.direc == 0) {
					if(intby > intersections[passedInts[b-1]].y) {
						if(intb1x > intbx) {
							message += "right";
						} else {
							message += "left";
						}
					} else {
						if(intb1x > intbx) {
							message += "left";
						} else {
							message += "right";
						}
					}
				} else {
					if(intbx > intersections[passedInts[b-1]].x) {
						if(intb1y > intby) {
							message += "left";
						} else {
							message += "right";
						}
					} else {
						if(intb1y > intby) {
							message += "right";
						} else {
							message += "left";
						}
					}
				}
				message += " at the ";
				if(rank == 1) {
					message += "first";
				} else if(rank == 2) {
					message += "second"; 
				} else if(rank == 3) {
					message += "third";
				} else if(rank == 4) {
					message += "fourth";
				} else if(rank == 5) {
					message += "fifth";
				}
				message += " intersection.";
				//console.log(b);
				if((passedInts[b] >= 34 && passedInts[b] <= 36 || path[b+1] == 12 && path[b+2] == 100 || path[b] == 12 && path[b+1] == 100 || path[b+1] == 200 || path[b+1] == 300) && !(path.length-2 == passedInts.length)) {
					message = "Walk straight and go down the stairs.";
					b++;
				}
				if(passedInts[b] >= 37 && !(path.indexOf(100) >= 0 || path.indexOf(200) >= 0 || path.indexOf(300) >= 0)) {
					message = "Walk straight and go up the stairs.";
					b++;
					if(path.length > 5) {
						b++;
					}
				}
				if(first) {
					//b++;
					first = false;
				}
				if(message == directions[directions.length-1]) {
					message += " (2)";
				}
				if(path.indexOf(150) > 0) {
	        		b+=2;
	        		//current = halls[path[b]-1];
	        		//first = false;
	        	}
		        console.log(b + "" + message);
		        directions.push(message);
	       }
		}
		//For the second to last direction, because of an issue with finding which way to turn
		else if(b == path.length - 2) {
			//var inter = intersections[intOf(path[b],path[b+1])];
			var current = halls[path[b]-1];
			var otherHalls = [];
			for(a = 0; a < intersections.length - 6; a++) {
	            if(intersections[a].id1 == current.id) {
	                otherHalls.push(intersections[a].hall2);
	            } else if(intersections[a].id2 == current.id) {
	                otherHalls.push(intersections[a].hall1);
	            }
	        }
	        var passedInts = [];
	        for(a = 0; a < path.length - 1; a++) {
	        	if(path[a+1] == 100) {a++;passedInts.push(intOf(12,3));passedInts.push(37);}
	        	else if(path[a+1] == 200) {a++;passedInts.push(intOf(15,13));passedInts.push(38);}
	        	else if(path[a+1] == 300) {a++;passedInts.push(intOf(15,14));passedInts.push(39);}
	        	else if(path[a+1] == 150) {}
	        	else if(path[a+1] == 500) {a++;passedInts.push(38);passedInts.push(intOf(15,13));}
	        	else if(path[a+1] == 400) {a++;passedInts.push(39);passedInts.push(intOf(15,14));}
	        	else {passedInts.push(intOf(path[a],path[a+1]));}
	        }	
		    rank = 0;
		    if(path.indexOf(150) > 0) {
        		b-=2;
        		//current = halls[path[b]-1];
        		//first = false;
        	}
			if(current.direc == 0) {
				var inter = halls[path[path.length-1]-1].x + parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1));
				//console.log("class" + (current.y - parseFloat(current.coords[sClass].substring(1))) + " intersection" + intersections[passedInts[0]].y);
				if(intersections[passedInts[b-1]].y > intersections[passedInts[b]].y) {
					//console.log("hall" + current.id + " class" + current.coords[sroom]);
					for(i = 0; i < otherHalls.length; i++) {
						//console.log("oh" + otherHalls[i].y + "  ipi" + intersections[passedInts[b-1]].y + "  inter" + inter);
        				if(otherHalls[i].y < intersections[passedInts[b-1]].y && otherHalls[i].y > inter) {
        					rank += 1;
        				}
        			}
				} else {
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].y > intersections[passedInts[b-1]].y && otherHalls[i].y < inter) {
        					rank += 1;
        				}
        			}
				}
			} else {
				var inter = halls[path[path.length-1]-1].y - parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1));
				if(intersections[passedInts[b-1]].x > intersections[passedInts[b]].x) {
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].x < intersections[passedInts[b-1]].x && otherHalls[i].x > inter) {
        					rank += 1;
        				}
        			}
				} else {
					for(i = 0; i < otherHalls.length; i++) {
        				if(otherHalls[i].x < intersections[passedInts[b-1]].x && otherHalls[i].x > inter) {
        					rank += 1;
        				}
        			}
				}
			}
			message += "Walk straight and turn ";
			if(current.direc == 0) {
				if(intersections[passedInts[b]].y > intersections[passedInts[b-1]].y) {
					if((halls[path[path.length-1]-1].x + parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1))) > intersections[passedInts[b]].x) {
						message += "right";
					} else {
						message += "left";
					}
				} else {
					if((halls[path[path.length-1]-1].x + parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1))) > intersections[passedInts[b]].x) {
						message += "left";
					} else {
						message += "right";
					}
				}
			} else {
				if(intersections[passedInts[b]].x > intersections[passedInts[b-1]].x) {
					if((halls[path[path.length-1]-1].y - parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1))) > intersections[passedInts[b]].y) {
						message += "left";
					} else {
						message += "right";
					}
				} else {
					if((halls[path[path.length-1]-1].y - parseFloat(halls[path[path.length-1]-1].coords[eroom].substring(1))) > intersections[passedInts[b]].y) {
						message += "right";
					} else {
						message += "left";
					}
				}
			}
			message += " at the ";
			if(rank == 1) {
				message += "first";
			} else if(rank == 2) {
				message += "second";
			} else if(rank == 3) {
				message += "third";
			} else if(rank == 4) {
				message += "fourth";
			} else if(rank == 5) {
				message += "fifth";
			} else {
				message += "first";
			}
			message += " intersection.";
			if(message == directions[directions.length-1]) {
				message += " (2)";
			}
			if(path.indexOf(150) > 0) {
        		b+=2;
        		//current = halls[path[b]-1];
        		//first = false;
        	}
	        console.log(b + "C" + message);
	        directions.push(message);
		}
		//For the last direction, from intersection to class
		else {
			var inter = intersections[passedInts[passedInts.length-1]];
			var current = halls[path[path.length-1]-1];
			if(current.direc == 0) {
				var coord = current.y - parseFloat(current.coords[eroom].substring(1));
				if(coord > inter.y) {
					if(current.coords[eroom].substring(0,1).localeCompare("l") == 0) {
						message += "The destination is on your left";
					} else {
						message += "The destination is on your right";
					}
				} else {
					if(current.coords[eroom].substring(0,1).localeCompare("l") == 0) {
						message += "The destination is on your right";
					} else {
						message += "The destination is on your left";
					}
				}
			} else {
				var coord = current.x + parseFloat(current.coords[eroom].substring(1));
				if(coord > inter.x) {
					if(current.coords[eroom].substring(0,1).localeCompare("l") == 0) {
						message += "The destination is on your left";
					} else {
						message += "The destination is on your right";
					}
				} else {
					if(current.coords[eroom].substring(0,1).localeCompare("l") == 0) {
						message += "The destination is on your right";
					} else {
						message += "The destination is on your left";
					}
				}
			}
			if(directions[directions.length-1] == "Walk straight and go up the stairs." || path[path.length-2] == 500 || path[path.length-2] == 400) {
				if(roomEnd == "1006") {
					message = "Turn left, walk straight, and t" + message.substring(1);
				} else {
					message = "Turn right, walk straight, and t" + message.substring(1);
				}
			}
			console.log(message);
			directions.push(message);
		}
	}
	var label = document.getElementById("directionsLabel");
	label.innerHTML = directions[0];
}

function goLeft() {
	if(directions.length > 0 && directionsIndex > 0) {
		directionsIndex--;
		var label = document.getElementById("directionsLabel");
		label.innerHTML = directions[directionsIndex];
	}
}

function goRight() {
	if(directions.length > 0 && directionsIndex < directions.length - 1) {
		directionsIndex++;
		var label = document.getElementById("directionsLabel");
		label.innerHTML = directions[directionsIndex];
	}
}

//Returns true if the two given halls intersect
function doesIntersect(one, two) {
	for(h = 0; h < intersections.length; h++) {
		if((intersections[h].id1 == one && intersections[h].id2 == two) || (intersections[h].id1 == two && intersections[h].id2 == one)) {
			return true;
		}
	}
	return false;
}

//Returns the intersection array index of the intersection of the two given hallways
function intOf(one, two) {
	for(h = 0; h < intersections.length; h++) {
		if((intersections[h].id1 == one && intersections[h].id2 == two) || (intersections[h].id1 == two && intersections[h].id2 == one)) {
			return h;
		}
	}
	if(two == 100) {return 34;}
	if(two == 200) {return 35;}
	if(two == 300) {return 36;}
	if(two == 400) {return 35;}
	if(two == 500) {return 36;}
	if(one == 100) {return 37;}
	if(one == 200) {return 38;}
	if(one == 300) {return 39;}
	if(one == 400) {return 38;}
	if(one == 500) {return 39;}
	return -1;
}

//Initializes everything once the start button is pressed
function start() {
	/*var names = "";
	var locations = "";
	for(i = 0; i < teachers.length; i++) {
		names += teachers[i].get("name") + ", ";
		locations += teachers[i].get("room") + ", ";
	}
	console.log(names);
	console.log(locations);*/
	//console.log("Path be " + path.length);
	var tempselect = document.getElementById("slistOfOptions");
	if(tempselect.options[tempselect.selectedIndex].value == "" || check1 == false) {
		return;
	}
	tempselect = document.getElementById("elistOfOptions");
	if(tempselect.options[tempselect.selectedIndex].value == "" || check2 == false) {
		return;
	}
	canvas.clearRect(0,0,width,height);
	canvasstart.width = canvasstart.width;
	sketch();
	roomStart = "";
	roomEnd = "";
	path = [];
	directions = [];
	directionsIndex = 0;
	specialCase = 0;
	pressStart = false;
	pressStart = true;
    searchStart();
    searchEnd();
    pressStart = false;
    //console.log(roomStart);
    //console.log(roomEnd);
    //Converts starting rooms to their respective hallways and coords
    var shall = 0;
    sroom = 0;
    for(i = 0; i < halls.length; i++) {
        for(j = 0; j < halls[i].allRooms.length; j++) {
            if(halls[i].allRooms[j] == roomStart) {
                shall = halls[i].id;
                sroom = j;
            }
        }
    }
    var ehall = 0;
    eroom = 0;
    for(i = 0; i < halls.length; i++) {
        for(j = 0; j < halls[i].allRooms.length; j++) {
            if(halls[i].allRooms[j] == roomEnd) {
                ehall = halls[i].id;
                eroom = j;
            }
        }
    }

    //Diverts B gym entrance
    if(["1005","701","703","705","707","602","604","606","506","504","502","500","102","1006","801","802","803","804","805","806","807","808","809"].indexOf(halls[shall-1].allRooms[sroom]) >= 0 && halls[ehall-1].allRooms[eroom] == "1004") {
        ehall = 15;
        eroom = 7;
    }

    //Diverts nurses office entrance
    var tempX = 0;
    var tempY = 0;
    if(halls[shall-1].direc == 1 && halls[ehall-1].allRooms[eroom] == "1010") {
        tempX = halls[shall-1].x + parseFloat(halls[shall-1].coords[sroom].substring(1));
        tempY = halls[shall-1].y;
    } else if(halls[shall-1].direc == 0 && halls[ehall-1].allRooms[eroom] == "1010") {
        tempX = halls[shall-1].x;
        tempY = halls[shall-1].y - parseFloat(halls[shall-1].coords[sroom].substring(1));
    }
    if(((tempX > 7.5 && tempY > 5.5) || (tempX > 11.5)) && halls[ehall-1].allRooms[eroom] == "1010") {
        ehall = 12;
        eroom = 4;
    }
    
    checkIntersect(shall,ehall,sroom,eroom);
}

//Paints everything to the screen
function checkIntersect(starting,ending,sClass,eClass) {
    var shall = starting;
    var ehall = ending;
    var chstart = starting;
    var chend = ending;
    var current = chstart;
    var count = 0;
    path.push(starting);
    //console.log("Path be " + path.length);
    //Finds the path
    while(current != chend) {
        current = search(current, chend, eClass);
        count++;
        for(i=0; i<path.length;i++) {
        	//console.log("Path " + (i+1) + "  " + path[i]);
        }
        chend = ending;
        //if(count == 5) {
          //current = chend;
        //}
    }
    for(k = 0; k < path.length; k++) {
        console.log("Path " + path[k]);
    }
    //For library entrance
    if(specialCase == 1) {
        eClass = 18;
        chend = 10;
        ehall = 10;
    }
    canvas.beginPath();
    canvas.strokeStyle = "#FF0000";
    //Draws line for two rooms in the same hall / library
    if(shall == ehall || specialCase == 1) {
        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        if(halls[shall-1].direc == 0) {
            x1 = (halls[shall-1].x * 10) + 10;
            y1 = height - ((halls[shall-1].y - parseFloat(halls[shall-1].coords[sClass].substring(1))) * 10);
            x2 = x1;
            y2 = height - ((halls[shall-1].y - parseFloat(halls[shall-1].coords[eClass].substring(1))) * 10);
        } else {
            x1 = ((halls[shall-1].x + parseFloat(halls[shall-1].coords[sClass].substring(1))) * 10) + 10;
            y1 = height - (halls[shall-1].y * 10);
            x2 = ((halls[shall-1].x + parseFloat(halls[shall-1].coords[eClass].substring(1))) * 10) + 10;
            y2 = y1;
        }
        //console.log("x" + x1);
        //console.log("x" + y1);
        //console.log("x" + x2);
        //console.log("x" + y2);
        canvas.globalAlpha = 1;
        canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
        canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
        canvas.stroke();
    }
    else {
        //console.log(path.length);
        //Cycles through each path element to draw path
        for(j = 0; j < path.length; j++) {
        	if(j == 1 && path[1] == 500) {
        		//console.log("entered this");
        	}
        	else if(j == 1 && path[1] == 400) {
        	}
        	else {
	            var x1 = 0;
	            var y1 = 0;
	            var x2 = 0;
	            var y2 = 0;
	            //For first line in path
	            if(j == 0) {
	            	//console.log("al-jazero");
	                var cHall = halls[starting-1];
	                if(cHall.direc == 0) {
	                    x1 = (cHall.x * 10) + 10;
	                    y1 = height - ((cHall.y - parseFloat(cHall.coords[sClass].substring(1))) * 10);
	                } else {
	                    x1 = ((cHall.x + parseFloat(cHall.coords[sClass].substring(1))) * 10) + 10;
	                    y1 = height - (cHall.y * 10);
	                }
	                var firstInt = 0;
	                //console.log("AAAAA" + i);
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == starting && intersections[i].id2 == path[1]) || (intersections[i].id1 == path[1] && intersections[i].id2 == starting)) {
	                        firstInt = intersections[i];
	                        //console.log("" + firstInt.id1 + " " + firstInt.id2);
	                    }
	                    if(path[1] == 500) {
	                    	firstInt = stairs[4];
	                    }
	                    if(path[1] == 400) {
	                    	firstInt = stairs[5];
	                    }
	                }
	                //if(firstInt == 0) {console.log("failure");}
	                x2 = (firstInt.x * 10) + 10;
	                y2 = height - (firstInt.y * 10);
	            //For last line in path
	            }
	            else if(j == path.length - 1) {
	            	//console.log("al-jaenda");
	                var lastInt = 0;
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == ending && intersections[i].id2 == path[path.length - 1]) || (intersections[i].id1 == path[path.length - 1] && intersections[i].id2 == ending)) {
	                        lastInt = intersections[i];
	                    }
	                }
	                x1 = (lastInt.x * 10) + 10;
	                y1 = height - (lastInt.y * 10);
	                var cHall = halls[ending-1];
	                if(cHall.direc == 0) {
	                    x2 = (cHall.x * 10) + 10;
	                    y2 = height - ((cHall.y - parseFloat(cHall.coords[eClass].substring(1))) * 10);
	                } else {
	                    x2 = ((cHall.x + parseFloat(cHall.coords[eClass].substring(1))) * 10) + 10;
	                    y2 = height - (cHall.y * 10);
	                }
	                if(cHall.id == 16 && halls[chend-1].allRooms[eClass] == "1003" && path[path.length - 2] == 12) {
	                    x2 = ((halls[11].x + 1.5) * 10) + 10;
	                }
	            //For going down the down only stairs
	            }
	            else if(path[j+1] == 100) {
	            	//console.log("al-ja100");
	                var firstInt = 0;
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == path[j-1] && intersections[i].id2 == path[j]) || (intersections[i].id1 == path[j] && intersections[i].id2 == path[j-1])) {
	                        firstInt = intersections[i];
	                    }
	                }
	                x1 = (firstInt.x * 10) + 10;
	                y1 = height - (firstInt.y * 10);
	                x2 = (halls[11].x * 10) + 10;
	                y2 = height - (halls[2].y * 10);
	                canvas.globalAlpha = 1;
	                canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
	                canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
	                canvas.stroke();
	                var ja = j + 2;
	                x1 = (halls[19].x * 10) + 10;
	                y1 = height - ((halls[19].y - halls[19].length) * 10);
	                if(ja == path.length - 1) {
	                    x2 = (parseFloat(halls[19].x + (halls[ending].coords[eClass].substring(1))) * 10) + 10;
	                    y2 = height - (parseFloat(halls[19].y - (halls[ending].coords[eClass].substring(1))) * 10);
	                } else {
	                    var lastInt = 0;
	                    for(i = 0; i < intersections.length; i++) {
	                        if((intersections[i].id1 == path[ja] && intersections[i].id2 == path[ja+1]) || (intersections[i].id1 == path[ja+1] && intersections[i].id2 == path[ja])) {
	                            lastInt = intersections[i];
	                        }
	                    }
	                    x2 = (lastInt.x * 10) + 10;
	                    y2 = height - (lastInt.y * 10);
	                }
	            //For going down either of the other two stairs
	            }
	            else if(path[j+1] == 200 || path[j+1] == 300) {
	            	//console.log("al-ja2030");
	                var pathValue = path[j+1];
	                var firstInt = 0;
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == path[j-1] && intersections[i].id2 == path[j]) || (intersections[i].id1 == path[j] && intersections[i].id2 == path[j-1])) {
	                        firstInt = intersections[i];
	                    }
	                }
	                x1 = (firstInt.x * 10) + 10;
	                y1 = height - (firstInt.y * 10);
	                x2 = (halls[14].x * 10) + 10;
	                if(path[j+1] == 200) {
	                    y2 = height - (halls[12].y * 10);
	                } else {
	                    y2 = height - (halls[13].y * 10);
	                }
	                canvas.globalAlpha = 1;
	                canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
	                canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
	                canvas.stroke();
	                var ja = j + 2;
	                if(pathValue == 200) {
	                    x1 = (halls[16].x * 10) + 10;
	                } else {
	                    x1 = ((halls[16].x + halls[16].length) * 10) + 10;
	                }
	                y1 = height - (halls[16].y * 10);
	                if(ja == path.length - 1) {
	                    x2 = ((halls[16].x + parseFloat(halls[16].coords[eClass].substring(1))) * 10) + 10;
	                    y2 = height - (halls[16].y * 10);
	                } else {
	                    var lastInt = 0;
	                    for(i = 0; i < intersections.length; i++) {
	                        if((intersections[i].id1 == path[ja] && intersections[i].id2 == path[ja+1]) || (intersections[i].id1 == path[ja+1] && intersections[i].id2 == path[ja])) {
	                            lastInt = intersections[i];
	                        }
	                    }
	                    x2 = (lastInt.x * 10) + 10;
	                    y2 = height - (lastInt.y * 10);
	                }
	            //If start room is in the same hall as the two non-down only stairs
	            }
	            else if(path[j+1] == 150) {
	            	//console.log("al-ja150");
	                x1 = (halls[14].x * 10) + 10;
	                y1 = height - ((halls[14].y - parseFloat(halls[14].coords[sClass].substring(1))) * 10);
	                x2 = x1;
	                y2 = halls[12].y;
	                canvas.globalAlpha = 1;
	                canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
	                canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
	                canvas.stroke();
	                var ja = j + 2;
	                if(pathValue == 200) {
	                    x1 = (halls[16].x * 10) + 10;
	                } else {
	                    x1 = ((halls[16].x + halls[16].length) * 10) + 10;
	                }
	                y1 = height - (halls[16].y * 10);
	                if(ja == path.length - 1) {
	                    x2 = ((halls[16].x + parseFloat(halls[16].coords[eClass].substring(1))) * 10) + 10;
	                    y2 = height - (halls[16].y * 10);
	                } else {
	                    var lastInt = 0;
	                    for(i = 0; i < intersections.length; i++) {
	                        if((intersections[i].id1 == path[ja] && intersections[i].id2 == path[ja+1]) || (intersections[i].id1 == path[ja+1] && intersections[i].id2 == path[ja])) {
	                            lastInt = intersections[i];
	                        }
	                    }
	                    x2 = (lastInt.x * 10) + 10;
	                    y2 = height - (lastInt.y * 10);
	                }
	            //For going up the two permissible up stairs
	            }
	            else if(path[j+1] == 400 || path[j+1] == 500) {
	            	//console.log("al-ja4050");
	                pathValue = path[j+1];
	                if(path.length == 1) {
	                    x1 = ((halls[16].x + parseFloat(halls[16].coords[sClass].substring(1))) * 10) + 10;
	                    y1 = height - (halls[16].y * 10);
	                } else {
	                    x1 = (halls[17].x * 10) + 10;
	                    y1 = height - (halls[16].y * 10);
	                }
	                if(pathValue == 400) {x2 = 245;}
	                else {x2 = 215;}
	                y2 = y1;
	                canvas.globalAlpha = 1;
	                canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
	                canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
	                canvas.stroke();
	                var ja = j + 2;
	                x1 = (halls[14].x * 10) + 10;
	                if(pathValue == 500) {
	                    y1 = height - (halls[12].y * 10);
	                } else {
	                    y1 = height - (halls[13].y * 10);
	                }
	                if(ja == path.length - 1) {
	                    x2 = (halls[14].x * 10) + 10;
	                    y2 = height - ((halls[14].y - parseFloat(halls[14].coords[eClass].substring(1))) * 10);
	                } else {
	                    var lastInt = 0;
	                    for(i = 0; i < intersections.length; i++) {
	                        if((intersections[i].id1 == path[ja] && intersections[i].id2 == path[ja+1]) || (intersections[i].id1 == path[ja+1] && intersections[i].id2 == path[ja])) {
	                            lastInt = intersections[i];
	                        }
	                    }
	                    x2 = (lastInt.x * 10) + 10;
	                    y2 = height - (lastInt.y * 10);
	                }
	            //For all other normal paths
	            }
	            else {
	                var firstInt = 0;
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == path[j-1] && intersections[i].id2 == path[j]) || (intersections[i].id1 == path[j] && intersections[i].id2 == path[j-1])) {
	                        firstInt = intersections[i];
	                    }
	                    if(j == 1 && path[1] == 500) {
	                    	firstInt = intOf(15,13);
	                    }
	                    if(j == 1 && path[1] == 400) {
	                    	firstInt = intOf(15,14);
	                    }
	                }
	                var lastInt = 0;
	                for(i = 0; i < intersections.length; i++) {
	                    if((intersections[i].id1 == path[j] && intersections[i].id2 == path[j+1]) || (intersections[i].id1 == path[j+1] && intersections[i].id2 == path[j])) {
	                        lastInt = intersections[i];
	                    }
	                }
	                x1 = (firstInt.x * 10) + 10;
	                y1 = height - (firstInt.y * 10);
	                x2 = (lastInt.x * 10) + 10;
	                y2 = height - (lastInt.y * 10);
	                //console.log("rAlp LarEn" + j);
	            }
	            
	            //Set color to read and paint
	            //console.log("drAw" + j + "  " + path.length);
	            canvas.strokeStyle = "#FF0000";
	            canvas.globalAlpha = 1;
	            canvas.moveTo(x1 * ratio + screenWidth/300,y1 * ratio - screenHeight/9);
	            canvas.lineTo(x2 * ratio + screenWidth/300,y2 * ratio - screenHeight/9);
	            canvas.stroke();
            }
        }
    }
    for(i=0; i<=4; i++) {
    	canvas.lineWidth = 1;
		canvas.moveTo(canvas.canvas.width, canvas.canvas.height - 1);
		canvas.lineTo(canvas.canvas.width, canvas.canvas.height);
		canvas.stroke();
		canvas.lineWidth = originalWidth;
	}
    canvas.closePath();
    //Draw beginning and ending circles
    canvas.beginPath();
    var centerX = 0, centerY = 0;
    if(halls[shall-1].direc == 0) {
    	centerX = halls[shall-1].x * 10 + 10;
    	centerY = height - ((halls[shall-1].y - parseFloat(halls[shall-1].coords[sClass].substring(1))) * 10);
    } else {
    	centerX = (halls[shall-1].x + parseFloat(halls[shall-1].coords[sClass].substring(1))) * 10 + 10;
    	centerY = height - (halls[shall-1].y * 10);
    }
    canvas.arc(centerX * ratio + screenWidth/300,centerY * ratio - screenHeight/9,3 * ratio,0,2*Math.PI);
    canvas.fillStyle = "green";
    canvas.fill();
    //canvas.lineWidth = 5;
    //canvas.strokestyle = "#003300";
    //canvas.stroke();
    canvas.closePath();
    canvas.beginPath();
    if(halls[ehall-1].direc == 0) {
    	centerX = halls[ehall-1].x * 10 + 10;
    	centerY = height - ((halls[ehall-1].y - parseFloat(halls[ehall-1].coords[eClass].substring(1))) * 10);
    } else {
    	centerX = (halls[ehall-1].x + parseFloat(halls[ehall-1].coords[eClass].substring(1))) * 10 + 10;
    	centerY = height - (halls[ehall-1].y * 10);
    }
    canvas.arc(centerX * ratio + screenWidth/300,centerY * ratio - screenHeight/9,3 * ratio,0,2*Math.PI);
    canvas.fillStyle = "red";
    canvas.fill();
    //canvas.lineWidth = 5;
    //canvas.strokestyle = "#003300";
    //canvas.stroke();
    canvas.closePath();
    giveDirections();
    for(tmp = 0; tmp < directions.length; tmp++) {
    	//console.log(directions[tmp]);
    }
}

function search(current, chend, eClass) {
    var options = [];
    var proceed = true;
    //If destination is downstairs but person is upstairs
    if(!(current >= 17 && current <= 20) && (chend >= 17 && chend <= 20)) {
        var bestInt = 0;
        var room = halls[chend-1].allRooms[eClass];
        if(["809","808","807","806"].indexOf(room) >= 0) {
            bestInt = 31;
            chend = 15;
        } else {
            bestInt = 30;
            chend = 12;
        }
        if(current == 15) {
        	chend = 15;
        	bestInt = 31;
        }
        if(current == chend) {
            proceed = false;
            if(chend == 15) {
                if(path.length < 2) {
                    path.push(150);
                    path.push(200);
                    path.push(17);
                    return 17;
                } else {
                    var twoBack = path[path.length-2];
                    //console.log("twoBack " + twoBack);
                    if(halls[twoBack].id == 16 || halls[twoBack].id == 13) {
                        path.push(200);
                    } else {
                        path.push(300);
                    }
                    path.push(17);
                    return 17;
                }
            } else if(chend == 12) {
                path.push(100);
                path.push(20);
                return 20;
            }
        }

    }
    //If destination is upstairs but person is downstairs
    else if((current >= 17 && current <= 20) && !(chend >= 17 && chend <= 20)) {
        var bestInt = 0;
        if(["500","502","504","506","508","510","512","514","102","104","106","103","105","107","109","111","113","108","110","112","114","116","118","120","1006","1008","1009","1010","1011"].indexOf(halls[chend-1].allRooms[eClass]) >= 0) {
            bestInt = 31;
        } else {
            bestInt = 30;
        }
        if(current == 17) {
            proceed = false;
            if(bestInt == 31) {path.push(400);}
            else if(bestInt == 30) {path.push(500);}
            path.push(15);
            return 15;
        } else {
            path.push(current-1);
            return current-1;
        }
    }
    //If person should go to alternate library entrance
    else if(current == 10 && halls[chend-1].allRooms[eClass] == "1002") {
        specialCase = 1;
        return chend;
    }
    //Proceed is to make sure some special cases don't run this afterwards instead of using a continue statement
    if(proceed == true) {
        if(current == 3 && chend == 10) {
            path.push(6);
            return 6;
        } else if(path[path.length-1] == 15 && path[path.length-2] == 500) {
            path.push(13);
            return 13;
        } else if(path[path.length-1] == 15 && path[path.length-2] == 400) {
            path.push(14);
            return 14;
        } else if(chend == 1 && current != 3) {
        	chend = 3;
        } else if(current == 11 && chend == 12) {
        	path.push(13);
        	return 13;	
        } else if(current == 3 && chend == 12) {
        	path.push(12);
        	return 12;
        } else if(chend == 12 && halls[current-1].x <= halls[11].x) {
        	//chend = 3;
        } else if(current == 15 && [1,2,3,4,5,6,7,8,9,11,21,24].indexOf(chend) >= 0) {
        	path.push(13);
        	return 13;
        }
        //Finds possible intersections
        for(i = 0; i < intersections.length; i++) {
            if(intersections[i].id1 == current) {
                options.push(intersections[i].hall2);
            } else if(intersections[i].id2 == current) {
                options.push(intersections[i].hall1);
            }
        }
        for(i = 0; i < options.length; i++) {
            //console.log("option" + options[i].id);
        }
        //Removes hallways that have already been passed through
        var arrayCount1 = 0;
        var arrayCount2 = 0;
        var foundSomething = false;
        //console.log("ac" + options.length + "  " + path.length);
        while(arrayCount1 < options.length) {
            while(arrayCount2 < path.length) {
            	if(arrayCount1 < options.length) {
	                //console.log("one" + options[arrayCount1].id + " two" + path[arrayCount2]);
	                if(options[arrayCount1].id == path[arrayCount2]) {
	                    options.splice(arrayCount1,1);
	                    //foundSomething = true;
	                    //console.log("Already passed through");
	                } /*else if(options[arrayCount1].direc == 0 && options[arrayCount1].y < halls[chend-1].y) {
	                	options.splice(arrayCount1,1);
	                	console.log("Already passed through");
	                    //foundSomething = true;
	                } else if(options[arrayCount1].direc == 1 && options[arrayCount1].x < halls[chend-1].x) {
	                	options.splice(arrayCount1,1);
	                	console.log("Already passed through");
	                    //foundSomething = true;
	                }*/
                }
                arrayCount2++;
            }
            arrayCount1++;
            arrayCount2 = 0;
        }
        var numIntersects = 0;
        //console.log("option length" + options.length);
        for(i = 0; i < options.length; i++) {
        	//console.log("intersecting" + options[i].id + " " + chend);
        	if(doesIntersect(options[i].id, chend)) {
        		numIntersects++;
        	}
        }
        if(numIntersects > 0) {
        	for(i = 0; i < options.length; i++) {
        		if(!doesIntersect(options[i].id, chend)) {
        			options.splice(i,1);
        			i=-1;
        			//console.log("Consider yoself spliced");
        		}
        	}
        }
        for(i = 0; i < options.length; i++) {
            //console.log("Final op" + options[i].id);
        }
        var min = 20;
        var hNum = 0;
        //console.log(current);
        for(z = 0; z < path.length; z++) {
            //console.log(path[z]);
        }
        //Finds hall closest to the destination's y coordinates
        if(halls[current-1].direc == 1) {
            for(i = 0; i < options.length; i++) {
                var now = options[i].x;
                var gap = 20;
                //console.log("chend " + chend);
                if(halls[chend-1].direc == 0) {
                    gap = Math.abs(now - halls[chend - 1].x);
                } else {
                    gap = Math.abs(now - (halls[chend - 1].x + parseFloat(halls[chend-1].coords[eClass].substring(1))));
                }
                if(gap < min /*&& halls[current-1].y != (options[i].y - options[i].length)*/) {
                    min = gap;
                    hNum = options[i].id;
                }
            }
        //Finds hall closest to the destination's x coordinates
        } else {
            for(i = 0; i < options.length; i++) {
                var now = options[i].y;
                var gap = 20;
                if(halls[chend-1].direc == 0) {
                    gap = Math.abs(now - (halls[chend - 1].y - parseFloat(halls[chend-1].coords[eClass].substring(1))));
                } else {
                    gap = Math.abs(now - halls[chend - 1].y);
                }
                if(gap < min) {
                    min = gap;
                    hNum = options[i].id;
                }
            }
        }
        //console.log("" + hNum + " " + min);
        path.push(hNum);
        return hNum;
    }
}