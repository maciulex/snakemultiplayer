var blank;
var size = [11,11]
var apple = [];
var interval = 300;
var intervalF;
var pause = true;
var fpsTime01;
var player = [
	{
		"direction": "right", 
		"points": [{"x": 1, "y": 1},{"x": 1, "y": 1}],
		"controls": [{"a": 87,"b": 65,"c": 83,"d": 68}],
		"startPoint": [{"x": 1, "y": 1, "dirS": "right"}],
		"color": "black",
		"score": 0
	},
	{
		"direction": "left",  
		"points": [{"x": 9, "y": 9},{"x": 9, "y": 9}],
		"controls": [{"a": 38,"b": 37,"c": 40,"d": 39}],
		"startPoint": [{"x": 9, "y": 9, "dirS": "left"}],
		"color": "blue",
		"score": 0
	}
];
// środek == 5,5
// odczytywanie jaki guzik został naciśnięty
function oneFPS() {
	//console.log("fps is moving");
	//oneFPSTime(1);
	graczeLCh();
	move();
	loseCh();
	draw();
	applea();
	//oneFPSTime(2);
	//console.log("fps stop moving");
	return;
}
document.addEventListener('keydown', function (event) {
	//console.log("add event is moving");
	var a = event.keyCode;
	if (a == 13 && pause == true) {
		intervalF = setInterval(oneFPS, interval);
		pause = false;
	}
	for (var z = 0; z <= player.length-1; z++) {
		if ((a == player[z]["controls"][0]["a"]) && player[z]["direction"] != "down") {
			player[z]["direction"] = "up";
		} else if (a == player[z]["controls"][0]["b"] && player[z]["direction"] != "right") {
			player[z]["direction"] = "left";
		} else if (a == player[z]["controls"][0]["c"] && player[z]["direction"] != "up") {
			player[z]["direction"] = "down";
		} else if (a == player[z]["controls"][0]["d"] && player[z]["direction"] != "left") {
			player[z]["direction"] = "right";	
		}
	};
    if (a == 27) {
        if (pause == false) {
            pause = true;
            clearInterval(intervalF);
            fogOfWar(1);
        } else {
            pause = false;
            fogOfWar(2);
            intervalF = setInterval(oneFPS, interval);
        }
    }
    if (a == 192) {
    	oneFPS();
    }
	return;
});
function move() {
	//console.log("move is moving");
	for (var i = 0; i <= player.length-1; i++) {
		if (player[i]["direction"] == "up") {
			var a = {"x": player[i]["points"][0]["x"], "y": player[i]["points"][0]["y"]-1};
			player[i]["points"].unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (player[i]["direction"] == "down") {
			var a = {"x": player[i]["points"][0]["x"], "y": player[i]["points"][0]["y"]+1};
			player[i]["points"].unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (player[i]["direction"] == "right") {
			var a = {"x": player[i]["points"][0]["x"]+1, "y": player[i]["points"][0]["y"]};
			player[i]["points"].unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		} else if (player[i]["direction"] == "left") {
			var a = {"x": player[i]["points"][0]["x"]-1, "y": player[i]["points"][0]["y"]};
			player[i]["points"].unshift(a);
			//console.log("x = "+point[0]["x"]+", y = "+point[0]["y"]);
		}
		if (player[i]["points"].length != 1) {
			player[i]["points"].splice(player[i]["points"].length-1);
		}
	}
	return;
}
function draw() {
	//console.log("draw is moving");
	var table = document.getElementById("snake");
	table.innerHTML = blank;
	table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "green";
	for (var z = 0; z <= player.length-1; z++) {
		var color = player[z]["color"];
		var condi = player[z]["points"].length-1;
		//console.log("draw is moving for uno");
		for (var i = 0; i < condi; i++) {
			//console.log("draw is moving for dos");
			//console.log("w środku "+ i);
			table.rows[player[z]["points"][i]["y"]].cells[player[z]["points"][i]["x"]].style.backgroundColor = color;
			table.rows[player[z]["points"][i]["y"]].cells[player[z]["points"][i]["x"]].style.borderColor = "red";
			//console.log("i'm here working");
		}
		//console.log("na zewnatrz "+ z);
	}
	return;
}
function loseCh() {
	//console.log("loseCh is moving");
	for (var z = 0; z <= player.length-1; z++) {
		//console.log(z);
		if (player[z]["points"][0]["y"] >= size[0] || player[z]["points"][0]["y"] < 0 || player[z]["points"][0]["x"] >= size[1] || player[z]["points"][0]["x"] < 0) {
				if (z == 1) {
        			player[0]["score"] += 1;
        		} else if (z == 0) {
        			player[1]["score"] += 1;
        		}
        		lose();
				return;
		}
		for (var i = 1; i <= player[z]["points"].length - 2; i++) {
			if (player[z]["points"][0]["y"] == player[z]["points"][i]["y"]  && player[z]["points"][0]["x"] == player[z]["points"][i]["x"]){
				lose();
				return;
			}
		}
		if (player[z]["points"][0]["x"] == apple[0]["x"] && player[z]["points"][0]["y"] == apple[0]["y"]) {
			apple.splice(0);
			var lastPoint = player[z]["points".length-1];
			player[z]["points"].push(lastPoint);
			applea();
			//console.log("apple disapear");	
		}
	}
	return;
}
function lose() {
	alert("przegrałeś >:");
	for (var z = 0; z < player.length; z++) {
		var a = {"x": player[z]["startPoint"][0]["x"], "y": player[z]["startPoint"][0]["y"]};
		//console.log(a);
		var dir = player[z]["startPoint"][0]["dirS"];
		player[z]["points"] = [a,a];
		//console.log(player[z]["points"]);
		player[z]["direction"] = dir;
	}
	clearInterval(intervalF);
	pause = true;
	draw();
	scoreU();
	return;
}

function applea() {
	//console.log("applea is moving");
	if (apple.length == 0) {
		var mathx = Math.round(Math.random()*10);
		var mathy = Math.round(Math.random()*10);
		for (var z = 0; z <= player.length-1; z++) {
			for (var i = 0; i <= player[z]["points"].length-1; i++) {
				if (document.getElementById("snake").rows[mathy].cells[mathx].style.backgroundColor == player[z]["color"]) {
					applea();
					//ponowna próba zrespienia jabłka
					//console.log("apple in sneak");
				}
			}
		}
		apple = [];
		var a = {"x": mathx, "y": mathy};
		apple.push(a);
		//console.log("apple not exist");	
		draw();
	}
	return;
}

function fogOfWar(a) {
	//console.log("fogOfWar is moving");
	var table = document.getElementById("snake");
	if (a == 1) {
		for (var z = 0; z <= player.length-1; z++) {
			table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "black";
			table.style.backgroundColor = "black";
			for (var i = 0; i <= player[z]["points"].length-1; i++) {
				table.rows[player[z]["points"][i]["y"]].cells[player[z]["points"][i]["x"]].style.borderColor = "black";
			}
			for (var i = 0; i <= player[z]["points"].length-1; i++) {
				table.rows[player[z]["points"][i]["y"]].cells[player[z]["points"][i]["x"]].style.backgroundColor = "black";
			}
		}
	} else {
		table.rows[apple[0]["y"]].cells[apple[0]["x"]].style.backgroundColor = "green";
		table.style.backgroundColor = "";
		for (var z = 0; z <= player.length-1; z++) {
			for (var i = 0; i <= player[z]["points"].length-1; i++) {
				table.rows[player[z]["points"][i]["y"]].cells[player[z]["points"][i]["x"]].style.borderColor = "red";
			}
		}
		draw();
	}
	return;
}
function generateTable() {
	//console.log("generate Table is moving");
	var cell = "";
	var row = "";
	for (var i = size[0]-1; i >= 0; i--) {
		cell += "<th></th>";
	}	
	for (var i = size[1]-1; i >= 0; i--) {
		row += "<tr>"+cell+"</tr>";
	}
	blank = row;
}
function graczeLCh() {
	var table = document.getElementById("snake");
    for (let i = 0; i <= player[0]["points"].length-2; i++) { 
        for (let j = 0; j <= player[1]["points"].length-2; j++) { 
        	//console.log("wtf");
            if (player[0]["points"][i]["x"] == player[1]["points"][j]["x"] && player[0]["points"][i]["y"] == player[1]["points"][j]["y"]) {
        		if (i == 0 && j == 0) {
        		} else if (j == 0) {
        			player[0]["score"] += 1;
        		} else {
        			player[1]["score"] += 1;
        		}
        		lose();
				//console.log("i: "+i+" j: "+j);
        		return;
            } 
        } 
    } 
	return;
}
function intervalF() {
	//console.log("intervalF is moving");
    var holder = document.forms["f1"]["b1"].value;
    if (holder != "") {
        interval = holder; 
    }
    document.getElementById("intervalHTML").innerHTML = interval;
    //console.log(interval);
	return;
}
function oneFPSTime(x) {
	switch (x) {
		case 1:
			fpsTime01 = Date.now();
		break;
		case 2:
			var result;
			result = Date.now()-fpsTime01;
			console.log(result);
		break;
	}
	return;
} 

function scoreU() {
	var score1 = player[0]["score"];
	var score2 = player[1]["score"];
	document.getElementById("score1").innerHTML = score1;
	document.getElementById("score2").innerHTML = score2;
	return;
}
generateTable();
applea();
scoreU();
intervalF();

