var size = [11,11]
function generateTable() {
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
generateTable();
