
Hecatonchier, a collection of largely independent libraries gathered under one project and one set of timing loops to minimize overhead
by Alex Cordova for Sugar Mountain LLC

the functional groups consist of:
Toast: retrieves transaction data from the Toast POS API, converts it from JSON objects into normalized SQL tables, and inserts it into the company database 
		Flowchart in root directory named toastPollFlowchart.vsdx



------------TECHNICAL--------------------

INSTALL:
REQUIRES: Node.js, NPM
IN COMMAND PROMPT: 
	Navigate to the Hecatonchier folder (where this README is located)
	execute command "npm install"
	run file "startHecatonchier.bat" to start Hecatonchier in service mode

COMMAND LINE OPTIONS:
Execute command "node <filename.js> [<argument> [<argument [ ...]]]"
main.js: run in terminal window
	"": default settings
	"tbl <integer>": specify backloading of <integer> days of Toast data
	"notbl": specify no backloading of toast data

svc.js: run as windows service
	"": If service is not installed, install service THEN if service is not started, start service
	"q": stops service
	"u": stops and uninstalls service
	"r": stops, uninstalls, installs, and starts service
		NOTE: To backload more than 7 days when starting as a service, change the adhocfencepost variable in config to a future time (UNIX epoch time, MS)



--------LICENSE------------------------------------------------------
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.