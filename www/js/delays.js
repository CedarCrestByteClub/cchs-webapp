function parseArray(firstArray) {
	var d = new Date();
	var arr = [];
	var tempArray = [];
	var date = [(d.getMonth()+1).toString(),d.getDate().toString(),d.getFullYear().toString()];
	//console.log(date);
	for(i = 0; i < firstArray.length; i++) {tempArray.push(firstArray[i]);}
	firstArray = [];
	console.log(tempArray.length);
	for(i = 0; i < tempArray.length; i++) {
		var type = tempArray[i].get("Type");
		if(type == 0 && compareDates(tempArray[i], date)) {
			firstArray.push(tempArray[i]);
		} else if(type == 1 && compareDates(tempArray[i], date)) {
			arr.push(tempArray[i]);
		}
	}
	AlertObjects = firstArray;
	console.log(arr.length);
	return arr;
}

function compareDates(one, two) {
	year1 = parseInt("20" + one.get("Year"));
	year2 = parseInt(two[2]);
	month1 = parseInt(one.get("Month"));
	month2 = parseInt(two[0]);
	day1 = parseInt(one.get("Day"));
	day2 = parseInt(two[1]);
	//console.log(month1 + "/" + day1 + "/" + year1 + ", " + month2 + "/" + day2 + "/" + year2);
	if(year1 < year2) {
		//console.log("false1");
		return false;
	} else if (year1 == year2) {
		if(month1 < month2) {
			//console.log("false2");
			return false;
		} else if(month1 == month2) {
			if(day1 < day2) {
				//console.log("false3");
				return false;
			} else {
				//console.log("true1");
				return true;
			}
		} else {
			//console.log("true2");
			return true;
		}
	} else {
		//console.log("true3");
		return true;
	}
}