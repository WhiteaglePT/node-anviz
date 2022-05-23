const Request = require("../lib/request.js"),
	  fs = require("fs");

async function asyncDownloadRecords() {

	let request = new Request("10.10.10.8"), // replace with your device ip
		records = [],
		page = null,

		writeToFile = "records.json", // will write a JSON array of records to the specified file
		download = 1; // 1 for all records, 2 for new records.

	// We are only pulling record info to display the total number of records.
	let recordInfo = await request.execute("getRecordInformation", 1);

	do {
		page = await request.execute("downloadAttendanceRecords", 1, [download, 25]);
		download = 0; // This changes the status to "downloading" and fetches the next records.
		records = records.concat(page);

		// Lets add a loader, just for fun:
		let percent = ((records.length / recordInfo.allRecordAmount) * 100).toFixed(2);

		// A bar would be funnier, but may degrate performance and I don't have time to measure that
		// Therefore it's disabled, to see it just uncomment bellow and add '[${bar}]' somewhere in the write:
		//let bar = "";
		//for(let i = 1; i <= 100; i ++)
		//	bar += (i >= percent) ? " " : "=";
		process.stdout.write(`Downloading: ${records.length} / ${recordInfo.allRecordAmount} 	 (${percent}%)\r`);

	} while(page && page.length > 0);

	process.stdout.write('\n');

	request.close();

	console.info("Finished downloading, saving to file...");

	fs.writeFileSync(writeToFile, JSON.stringify(records));

	console.info("Done!");
}

asyncDownloadRecords();