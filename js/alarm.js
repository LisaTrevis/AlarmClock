// Adds Event Listener on id="btn" element and stores it as a variable.
var btn = document.getElementById("btn").addEventListener("click", setAlarm);
// Stores id="ding" element as a variable.
var ding = document.getElementById("ding");
// Stores id="hoursDropdown" element as a variable.
var hoursDropdown = document.getElementById("hoursDropdown")
// Stores id="minutesDropdown" element as a variable.
var minutesDropdown = document.getElementById("minutesDropdown");

function setAlarm() {

	// Stores id="ampm" element value selected by user as a variable.
	var ampm = document.getElementById("ampm").value;
	// Takes value selected by user in hoursDropdown variable and turns it into an interger.
	var userHoursInput = parseInt(hoursDropdown.value);
	// Takes value selected by user in minutesDropdown variable and turns it into an interger.
	var userMinsInput = parseInt(minutesDropdown.value);

	// If userMins is less than 10, sets userMins variable equal to itself with a zero in front of it. Otherwise, sets userMins equal to only itself.
	var userMins = (userMinsInput < 10 ? "0" + userMinsInput : userMinsInput)

	// Creates the text content for element with id="message" as a string which includes an opening string PLUS the value of the hoursDropdown variable PLUS a colon PLUS the value of the minutesDropdown variable parsed into an interger with a zero added in front for values less than 10 PLUS a space PLUS the value of the ampm variable PLUS a closing period.
	document.getElementById("message").textContent = "Alarm is now set for " + hoursDropdown.value + ":" + userMins + " " + ampm + ".";

	// Having this function returned by the setAlarm function creates a closure. The inner function alarmCheck continually compares the time each second to the variables set by the outer function setAlarm. However, the variables in setAlarm are only updated when the user clicks the button, which invokes setAlarm. So the user can choose other values from the options in the drop down menus for hours and minutes in the alarm, but those values aren't updated until the button is clicked.
	return (function alarmCheck() {

		// Sets clockHours variable equal to the hour value in the window object as military time (i.e. a 24 hour clock).
		var clockHours = window.rawHours;
		// Sets clockMins variable equal to the minute value in the window object and turns it into an interger.
		var clockMins = parseInt(window.minutes);
		// Sets a variable userHours to zero in order to convert to military time and adjust value if necessary (at Noon and Midnight).
		var userHours = 0;

		// Checks to see if the user chose the PM option from the select menu with id="ampm" (stored as variable ampm). If so, adds 12 to the userHours variable to convert it to military time so it can be compared with var clockHours and saves it as variable a.
		if (ampm === "PM") {
			// Adds 12 to userHoursInput in order to convert to military time (24 hour clock).
			userHours = userHoursInput + 12;
			// Checks to see if userHours is now 24, and if so, changes it back to 12 (Noon).
			if (userHoursInput === 24) {
				userHours = 12;
			};
		} else {
			// Checks to see if userHoursInput is now 12, and if so, changes it to 0 (Midnight).
			if (userHoursInput === 12) {
				userHours = 0;
			};
		};

		// Check that values are as expected for variables.
		console.log(userHours, clockHours);
    	console.log(clockMins, userMins);

    	// Compares actual hours to hour selected by user AND actual minutes to minutes selected by user.
		if (clockHours === userHours && clockMins === userMins) {
			// If true, creates content for the id="message" element and plays a sound.
	    	document.getElementById("message").textContent = "Alarm has gone off!";
	    	ding.play();
	    	return;
	    };

	    // Checks time set by user for alarm against actual time every second.
	    setTimeout(alarmCheck, 1000);
	})();
};

// Loops through i = 1 through 12 and creates an option element with i as the text content for each iteration and appends it to the id="hoursDropdown" select element.
for (let i = 1; i <= 12; i++) {
	let hourOption = document.createElement("option");
	hourOption.textContent = i;
	hoursDropdown.appendChild(hourOption);
};

// Loops through i = 0 through 60 and creates an option element with minuteText (as either i with a zero in front of it for i < 10 or i itself for i >= 10) as the text content for each iteration and appends it to the id="minutesDropdown" select element. Also creates a value attribute equal to the value of i for each option element created for each iteration.
for (let i= 0; i <= 60; i++) {
	let minuteOption = document.createElement("option");
	// The "?" is asking if the content of the parens is true or false. If true, use the content on the left side of the ":", if false, use the content on the right side of the ":".
	let minuteText = (i < 10) ? "0"+i : i;
	minuteOption.textContent = minuteText;
	minuteOption.value = i;
	minutesDropdown.appendChild(minuteOption);
};