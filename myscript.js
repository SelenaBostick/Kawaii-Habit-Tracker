// Adding script from tutorial. Excuse lack of metadata

// GET THE DATE
var date = new Date();
console.log(date);

// EXTRACT DATE INFO
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentYear = date.getFullYear();
var currentDate = date.getDate();

console.log(currentMonth); // current month - 1
console.log(currentDay); // current day of the week
console.log(currentYear); // current year
console.log(currentDate); // current date/number

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// SET THE CORRECT MONTH
var title = document.getElementById("title");
title.innerHTML = "🌸 " + months[currentMonth] + " 🌸";

var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function () {
    let habits = prompt("Whats your habit", habitTitle.innerHTML);
    if (habits.length == 0) {
        habitTitle.innerHTML = "Click to set your habit";
    } else {
        habitTitle.innerHTML = habits;
    }
}

    // SET TOTAL DAYS

    var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var daysInThisMonth = daysInTheMonthList[currentMonth];

    var daysCompleted = 0;
    var totalDays = document.getElementById("totalDays");
    totalDays.innerHTML = "0/" + daysInThisMonth;

    // SET UP THE CALENDAR DAYS
    var dayCount = 0;
    var rowCount = 0;
    var days = document.getElementsByClassName("days");
    var nextMonthDays = 0;
    
    
    for (var i = 0; i < days.length; i++) {

        var day = days[rowCount].getElementsByClassName("day");

        for (var j = 0; j < day.length; j++) {

            if (dayCount == currentDate - 1) {
                // day[j].classList.add('whiteText');
                day[j].setAttribute("style","border: 2px solid black;");
            }

            if (dayCount < daysInThisMonth) {
                day[j].innerHTML = dayCount + 1;
                day[j].setAttribute("id", "day" + (dayCount +1));
                dayCount++;
            } else {
                day[j].innerHTML = nextMonthDays + 1;
                day[j].classList.add('lightText');
                day[j].setAttribute("style", "background-color: white;");
                nextMonthDays++;
            }
        }
        rowCount++;
}

// Initialize Completed Array

var completed = new Array(31);

for (var i = 0; i < dayCount; i++) {

    var tempString =
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);

    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);

    if (tempDay == null || tempDay == "false") {
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++;
    }

    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

// CHECK STORAGE AND UPDATE COMPLETED ARRAY

for (var i = 0; i < currentDate; i++) {

    var tempString =
    "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ": " + chosenDay);

    var chosenDayDiv = document.getElementById("day" + (i + 1));

    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "pink";
    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "white";
    }
}

var dayDivs  = document.querySelectorAll(".day");

for (var i = 0; i < currentDate; i++) {
    dayDivs[i].onclick = function (e) {
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        
        var storageString = 
        "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
    
        if (localStorage.getItem(storageString) === "false") {
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, "true");
            daysCompleted++;

        } else if (localStorage.getItem(storageString) === "true") {
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, "false");
            daysCompleted--;
        }

        totalDays.innerHTML = daysCompleted + "/" + dayCount;

        if (daysCompleted === currentDate) {
            alert("great progress!");
        }
    }
}


// RESET BUTTON

var resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
        var tempStrings = 
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;

        console.log(tempStrings);
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor = "white";
    }

    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}







// One change I'd make is moving the stored data from local storage
//  to a file. To extend the functionality I would add a notes section. When the
//  date is clicked, it brings up a notes pop-up. Clicking this would allow 
//  users to add or modify entries. I would also make habits into a list, viewable by
//  clicking the date as well, and the day is only marked as complete 
//  when all habits are completed for the day. I would also add functionality that
//  allows the user to only have certain habits on certain days. For example:
//             if (currentDay = 2 ) { habits.push("gym"); } 
//  Meaning if its a tuesday go to gym.
//  This would mean I'd need two other pages. One for viewing/modifying the schedule and
//  one for viewing the actual day (preferably by pop up).
//  Aesthetically I'd like to include a profile that contains the user's 
//  name, goals, preferences (font/color/emojis), and overall score, along with 
//  motivational words for extra encouragement <3

// To game-ify the app, I'd make a tree or cat or something and as the user 
// completes tasks their garden grows or cat is fed.
