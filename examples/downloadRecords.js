const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.0.0.6"), // replace with your device ip
	writeToFile = "records.json"; // will write a JSON array of records to the specified file

function loadRecords(records, op) {
	console.info("Loaded", records.length, "loading more...");
	request.execute("downloadAttendanceRecords", 1, [op, 25]).on("error", function(err) {
		console.info("ERROR", err);
	}).on("complete", function(res, raw){
		if(res.length == 0) {
			fs.writeFileSync(writeToFile, JSON.stringify(records));
			console.info("FINISHED!");
			request.close();
		}
		else {
			loadRecords(res.concat(records), 0);
		}
	});
}

let download = 1; // 1 for all records, 2 for new records.
loadRecords([], download);