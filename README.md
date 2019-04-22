# node-anviz
NPM package to communicate with Anviz devices.

## :warning: Work in progress :warning:

This is a work in progress, but it's already functional.
I managed to find the random document online and I'm currently implementing the TC_B Communications Protocol (2.1) (See dev/tcb_communications_protocol2.1.pdf).

### Usage

Install the module
```sh
npm install node-anviz
```

Call a supported method:
```js
const anviz = require("node-anviz");
let request = new anviz.Request("<device ip>");
request.execute("getInformation1", 1).on("error", function(err) {
	console.info("ERROR", err);
}).on("complete", function(res, raw){
    console.info(res, raw);
    request.close();
});
```

### Documentation
This is a work in progress, documentation is on it's way.
At this time you may check the examples folder.

### Methods status:
##### PLEASE NOTE: There method descriptions were taken out DIRECTLY from the protocol document (check the pdf on the dev/ folder); Do not make me questions about the descriptions, some of them are incomprehensible.
#
ID | Method Description | Command | Status | Name | Tested On Device
------------ | ------------- | ------------- | ------------- | ------------- | -------------
1 | Get the information of T&A device 1 | 0x30 | :white_check_mark: Implemented | getInformation1 | :white_check_mark:
2 | Set the configure information of T&A 1 | 0x31 | :white_check_mark: | setInformation1 | :red_circle:
3 | Get the information of T&A device 2 | 0x32 | :red_circle: | 
4 | Set the configure information of T&A 2 | 0x33 | :red_circle: | 
5 |  Get the date and time of T&A | 0x38 | :red_circle: | 
6 | Set the date and time of T&A | 0x39 | :red_circle: | 
7 | Get TCP/IP parameters | 0x3A | :red_circle: | 
8 | Set TCP/IP parameters | 0x3B | :red_circle: | 
9 | Get record information | 0x3C | :red_circle: | 
10 | Download T&A records | 0x40 | :white_check_mark: | downloadAttendanceRecords | :white_check_mark:
11 | Upload T&A records | 0x41 | :red_circle: | 
12 | Download staff info | 0x42 | :red_circle: | 
13 | upload staff info | 0x43 | :red_circle: | 
14 | Download FP Template | 0x44 | :red_circle: | 
15 | Upload FP Template | 0x45 | :red_circle: | 
16 | Get device S/N | 0x46 | :red_circle: | 
17 | Modify device S/N | 0x47 | :red_circle: | 
18 | Get device type code | 0x48 | :red_circle: | 
19 | Modify device type code | 0x49 | :red_circle: | 
20 | Get the factory info code | 0x4A | :red_circle: | 
21 | Modify the factory info code | 0x4B | :red_circle: | 
22 | Delete the designated user data | 0x4C | :red_circle: | 
23 | Initialize the user area | 0x4D | :red_circle: | 
24 | Clear up Records /Clear new records sign | 0x4E | :red_circle: | 
25 | Initialize System | 0x4F | :red_circle: | 
26 | Get the time zone info | 0x50 | :red_circle: | 
27 | Set time zone info | 0x51 | :red_circle: | 
28 | Get the group info | 0x52 | :red_circle: | 
29 | Set the group info | 0x53 | :red_circle: | 
30 | Get the scheduled bell info | 0x54 | :red_circle: | 
31 | Set ring info | 0x55 | :red_circle: | 
33 | Add short message | 0x57 | :red_circle: | 
34 | Read all info head of all short message | 0x58 | :red_circle: | 
35 | Delete specified index short message | 0x59 | :red_circle: | 
36 | Get T&A state message | 0x5A | :red_circle: | 
37 | Set T&A State parameter table | 0x5B | :red_circle: | 
38 | Enroll user FP online | 0x5C | :red_circle: | 
39 | Get device capacity parameter | 0x5D | :red_circle: | 
40 | Output signal to open lock without verifying user | 0x5E | :red_circle: | 
41 | Sent T&A record in real time | 0x5F | :red_circle: | 
42 | Get customized T&A state table | 0x70 | :red_circle: | 
43 | Set attendance state table | 0x71 | :red_circle: | 
44 | Download employees data (extended) | 0x72 | :red_circle: | 
45 | Upload staff information(extended) | 0x73 | :red_circle: | 
46 | Get communication device ID | 0x74 | :red_circle: | 
47 | Modify communication device ID | 0x75 | :red_circle: | 
48 | Clear administrator flag | 0x3D | :red_circle: | 
49 | Read employees enrollment timestamp | 0x3E | :red_circle: | 
50 | Set time stamp | 0x3F | :red_circle: | 
51 | Read random number | 0x76 | :red_circle: | 
52 | Encrypt device type and language with random number | 0x77 | :red_circle: | 
53 | Get specified index message (only for OA3000) | 0x26 | :red_circle: | 
54 | Add new message (only for OA3000) | 0x27 | :red_circle: | 
55 | Read message head of assigned section message (only for OA3000) | 0x28 | :red_circle: | 
56 | Delete appointed index message (only for OA3000) | 0x29 | :red_circle: | 
57 | Get T&A state auto switch setting (only for OA3000/OA1000) | 0x20 | :red_circle: | 
58 | Set T&A state auto switch setting (only for OA3000/OA1000) | 0x21 | :red_circle: | 
59 | Download staff information (extended - 761 platform use only) | 0x22 | :red_circle: | 
60 | Upload staff information (extend - 761plate use only) | 0x23 | :red_circle: | 
61 | Get device serial number | 0x24 | :red_circle: | 
62 | Modify device serial number | 0x25 | :red_circle: | 
63 | Get special state (VF30/VP30/T60+use only) | 0x2F | :red_circle: | 
64 | Get photo amount (OA1000/OA3000/761platform use only) | 0x2A | :red_circle: | 
65 | Get photo head information (OA1000/OA3000/761 platform use only) | 0x2B | :red_circle: | 
66 | Read specified photo file (OA1000/OA3000/761platform use only) | 0x2C | :red_circle: | 
67 | Delete specified photo (OA1000/OA3000/761plat form use only) | 0x2D | :red_circle: | 
68 | Update firmware, photo, voice (761platform use only) | 0x10 | :red_circle: | 
69 | directory file operation (761 platforms) | 0x12 | :red_circle: | 
70 | Download log record (761 platform use only) | 0x13 | :red_circle: | 
71 | Read admin card number/admin password (only for T5) | 0x1C | :red_circle: | 
72 | Set admin card number/admin password (only for T5) | 0x1D | :red_circle: | 
73 | Read daylight saving parameter | 0x1A | :red_circle: | 
74 | Set daylight saving time parameter | 0x1B | :red_circle: | 
75 | Read optional language combination | 0x18 | :red_circle: | 
76 | Set optional language combination | 0x19 | :red_circle: | 
77 | Receive feature value /card ID to execute following operation | 0x78 | :red_circle: | 
78 | Get GPRS parameter | 0x16 | :red_circle: | 
79 | Set GPRS parameter | 0x17 | :red_circle: | 
80 | Get device extended information code | 0x7A | :red_circle: | 
81 | Modify device extend message code | 0x7B | :red_circle: | 
82 | inquire information of card number (T5S use only) | 0x7E | :red_circle: | 
83 | Sending Email (only for C5) | 0x7F | :red_circle: | 

### License

MIT


### Want to contribute? Great!
I'm accepting PR's if anyone wants to jump in.
