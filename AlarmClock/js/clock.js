// This ensures a zero is placed in front of any number that is less than 10 for the argument inserted into the function. 
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

// The parens in front of and at the end of this function invoke/call the function automatically without having to invoke/call it below or create an event listener, and is called an "IIFE" (Immediately Invoked Function Expression). This also creates security so that duplicate variable files aren't overwritten and variables within a function cannot be accessed by outside functions/files. This is called namespacing.


(function startTime() {

	var currentTime = new Date();
	var hour = currentTime.getHours();
	var minute = currentTime.getMinutes();
	var second = currentTime.getSeconds();

	// This piece of code makes this variable available globally by creating a property on the global object (window) and then setting the value of that new property to the value returned by the getHours() function. As clock.js is the first of the custom scripts on the index.html file, this value can now be used by subsuqent files (i.e. alarm.js).

	window.rawHours = hour;
    
    // Specifically, the raw hours value is needed because computers use military time (as does the getHours() method), and I'm using a 12-hour clock for user input values. The alarm values are ALSO going to be in 12 hour format. Both the adjusted and unadjusted hours are needed, and will be used depending on the situation.

	
	// Using an if/else statement to convert getDate() method results (which returns values in military time) to 12 hour time.
	if (hour > 12) {
		hour = hour - 12;
	} else if (hour === 0) {
		hour = 12;
	};

	// Use checkTime function to add a zero to minute values < 10.
	minute = checkTime(minute);
	// Use checkTime function to add a zero to second values < 10.
	second = checkTime(second);

	// Again, this piece of code makes this variable available globally by creating a property on the global object (window) and then setting the value of that new property to the value returned by the getMinutes() function. As clock.js is the first of the custom scripts on the index.html file, this value can now be used by subsuqent files (i.e. alarm.js).
	window.minutes = minute;

	// Sets the value of the innerHTML for the id="time" element using the hour, minute & second variable values plus a few colons as strings.
	document.getElementById("time").textContent = hour + ":" + minute + ":" + second;
	
	// Makes the function update every second in real time
	setTimeout(startTime, 1000);

})();