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
1 | Get Device Configuration 1	| 0x30 | :white_check_mark: | getInformation1 | :white_check_mark:
2 | Set Device Configuration 1	| 0x31 | :white_check_mark: | setInformation1 | :red_circle:
3 | Get Device Configuration 2	| 0x32 | :white_check_mark: | getInformation2 | :white_check_mark:
4 | Set Device Configuration 2	| 0x33 | :red_circle: | 
5 | Get Device Date/Time	| 0x38 | :white_check_mark: | getDateTime | :white_check_mark:
6 | Set Device Date/Time	| 0x39 | :white_check_mark: | setDateTime | :white_check_mark:
7 | Get Network Configuration	| 0x3A | :white_check_mark: | getNetworkConfiguration | :white_check_mark:
8 | Set Network Configuration	| 0x3B | :red_circle: | 
9 | Get Records Info	| 0x3C | :red_circle: | 
10 | Download T&A Records	| 0x40 | :white_check_mark: | downloadAttendanceRecords | :white_check_mark:
11 | Upload T&A Record	| 0x41 | :red_circle: | 
12 | Download User's Info	| 0x42 | :red_circle: | 
13 | Upload User’s Info	| 0x43 | :red_circle: | 
14 | Download FP Template	| 0x44 | :red_circle: | 
15 | Upload FP Template	| 0x45 | :red_circle: | 
16 | Get Device ID	| 0x46 | :red_circle: | 
17 | Set Device ID	| 0x47 | :red_circle: | 
18 | Get Device Model code	| 0x48 | :red_circle: | 
19 | Set Device Model Code	| 0x49 | :red_circle: | 
20 | Get Manufacture Code	| 0x4A | :red_circle: | 
21 | Set Manufacture Code	| 0x4B | :red_circle: | 
22 | Delete Designated User Data	| 0x4C | :red_circle: | 
23 | Initialize User Profile	| 0x4D | :red_circle: | 
24 | Erase all Records/ New Records Flag	| 0x4E | :red_circle: | 
25 | Initialize System	| 0x4F | :red_circle: | 
26 | Get Timezone	| 0x50 | :red_circle: | 
27 | Set Timezone	| 0x51 | :red_circle: | 
28 | Get Group Info	| 0x52 | :red_circle: | 
29 | Set Group Information	| 0x53 | :red_circle: | 
30 | Get Alarm Setting	| 0x54 | :red_circle: | 
31 | Set Alarm	| 0x55 | :red_circle: | 
32 | Get Indexed Messages	| 0x56 | :red_circle: | 
33 | Add Index Message	| 0x57 | :red_circle: | 
34 | Get Headers of All Index MSG	| 0x58 | :red_circle: | 
35 | Delete Index Message	| 0x59 | :red_circle: | 
36 | Get T&A Status Parameters List	| 0x5A | :red_circle: | 
37 | Set T&A Status Parameters List	| 0x5B | :red_circle: | 
38 | Enroll Fingerprint Online	| 0x5C | :red_circle: | 
39 | Get Device Capacity Parameter	| 0x5D | :red_circle: | 
40 | Unlock Door Without Authentication	| 0x5E | :red_circle: | 
41 | Output T&A Records in Real Time	| 0x5F | :red_circle: | 
42 | Get Customized T&A Statuses	| 0x70 | :red_circle: | 
43 | Set Customized T&A Statuses	| 0x71 | :red_circle: | 
44 | Download User Data Extended	| 0x72 | :red_circle: | 
45 | Upload User Data Extended	| 0x73 | :red_circle: | 
46 | Get Communication Device ID	| 0x74 | :red_circle: | 
47 | Modify Communication Device ID	| 0x75 | :red_circle: | 
48 | Clear Admin Flag	| 0x3D | :red_circle: | 
49 | Get Time Stamp	| 0x3E | :red_circle: | 
50 | Set Time Stamp	| 0x3F | :red_circle: | 
51 | Get Random Number	| 0x76 | :red_circle: | 
52 | Encrypt Device Model and Language Options with a Random Number	| 0x77 | :red_circle: | 
53 | Get Specified Index Message	| 0x26 | :red_circle: | 
54 | Add a Indexed Message	| 0x27 | :red_circle: | 
55 | Get Headers of a Ranged Message	| 0x28 | :red_circle: | 
56 | Delete a indexed Message	| 0x29 | :red_circle: | 
57 | Get T&A Status Auto Switching Setting	| 0x20 | :red_circle: | 
58 | Set T&A Status Auto Switching Setting	| 0x21 | :red_circle: | 
59 | Get the Number of Daily Remaining Attempts of a Specified User	| 0x10 | :red_circle: | 
60 | Set Daily Attempts Number of a Specified User	| 0x10 | :red_circle: | 
61 | Download User Data Extended	| 0x22 | :red_circle: | 
62 | Upload User Data Extended	| 0x23 | :red_circle: | 
63 | Get Device Serial Number	| 0x24 | :red_circle: | 
64 | Modify Device Serial Number	| 0x25 | :red_circle: | 
65 | Get Special State	| 0x2F | :red_circle: | 
66 | Get Number of All Images	| 0x2A | :red_circle: | 
67 | Get Image Headers	| 0x2B | :red_circle: | 
68 | Get a Specified Image File	| 0x2C | :red_circle: | 
69 | Delete a Specified Image	| 0x2D | :red_circle: | 
70 | Update Firmware/Image/Voice	| 0x10 | :red_circle: | 
71 | Directory Operation	| 0x12 | :red_circle: | 
72 | Download Log Files	| 0x13 | :red_circle: | 
73 | Get Admin Card ID/ Password	| 0x1C | :red_circle: | 
74 | Set Admin Card ID/ Password	| 0x1D | :red_circle: | 
75 | Get Daylight Saving Parameters	| 0x1A | :red_circle: | 
76 | Set Daylight Saving Parameters	| 0x1B | :red_circle: | 
77 | Get Language Options	| 0x18 | :red_circle: | 
78 | Set Language Options	| 0x19 | :red_circle: | 
79 | Send Feature Value/ Card ID to T&A Device	| 0x78 | :red_circle: | 
80 | Get GPRS Parameters	| 0x16 | :red_circle: | 
81 | Set GPRS Parameters	| 0x17 | :red_circle: | 
82 | Get Device Extended Info	| 0x7A | :red_circle: | 
83 | Modify Device Extended Info	| 0x7B | :red_circle: | 
84 | Get Card Number	| 0x7E | :red_circle: | 
85 | Get Reboot Time	| 0x14 | :red_circle: | 
86 | Set Reboot Time	| 0x15 | :red_circle: | 
87 | Extended Commands	| 0x2E | :red_circle: | 
88 | UDP Search Device	| 0x02 | :red_circle: | 
89 | UDP Set Device Parameter	| 0x03 | :red_circle: | 
90 | Heartbeat Package	| 0x7F | :red_circle: | 
91 | Data Modification Alert	| 0x7D | :red_circle: | 
92 | Download Personnel Change Records	| 0x64 | :red_circle: | 
93 | Download User’s Information Extended	| 0x65 | :red_circle: | 
94 | Clear Change of Personnel Records/ Flags	| 0x1E | :red_circle: | 
95 | Get Device Configuration 3	| 0x34 | :red_circle: | 
96 | set Device Configuration 3	| 0x35 | :red_circle: | 
97 | Connection Authentication	| 0x04 | :red_circle: | 
98 | Get Device Configuration4	| 0x36 | :red_circle: | 
99 | Add Department	| 0x61 | :red_circle: | 
100 | Delete Department	| 0x62 | :red_circle: | 
101 | Download a Specified User’s Templates/Images	| 0x66 | :red_circle: | 
102 | Batch Download Users’ Images	| 0x67 | :red_circle: | 
103 | Get Result of Last Authentication Pass/Fail	| 0x79 | :red_circle: | 
104 | Get Timezone Mode Status	| 0x68 | :red_circle: | 
105 | Set Timezone Mode Status	| 0x69 | :red_circle: | 
106 | Upload User’s images	| 0x6D | :red_circle: | 
107 | Add BT Device/User	| 0x6A | :red_circle: | 
108 | Delete Specific Address of Bluetooth Device	| 0x6B | :red_circle: | 
109 | Get Information of All Bluetooth Devices	| 0x6C | :red_circle: | 
110 | Get IEEE802.11 Network Setting	| 0x6E | :red_circle: | 
111 | Set IEEE 802.11 Network setting	| 0x6F | :red_circle: | 
112 | Get Authorization Code	| 0x05 | :red_circle: | 
113 | Authorize	| 0x06 | :red_circle: | 
114 | UDP Start Video	| 0x07 | :red_circle: | 
115 | UDP Stop Video	| 0x08 | :red_circle: | 
116 | UDP Command	| 0x09 | :red_circle: | 
117 | Get Server URL	| 0x0A | :red_circle: | 
118 | Set Server URL	| 0x0B | :red_circle: | 
119 | Test User	| 0x0C | :red_circle: | 

### License

MIT


### Want to contribute? Great!
I'm accepting PR's if anyone wants to jump in.
