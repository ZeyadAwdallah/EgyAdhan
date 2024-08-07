// Get references to DOM elements
const select = document.getElementById("cities");
const title = document.getElementById("title");
const cards = document.getElementById("cards");
const header = document.getElementById("header");

// City data with names and API city codes
const cityData = {
    "nothing": { name: "أختار مدينة", apiCity: null },
    "EG-C": { name: "القاهرة", apiCity: "Cairo" },
    "EG-MT": { name: "مطروح", apiCity: "Matruh" },
    "EG-ALX": { name: "الإسكندرية", apiCity: "Alexandria" },
    "EG-GZ": { name: "الجيزة", apiCity: "Giza" },
};

// Populate the dropdown menu dynamically
for (const cityCode in cityData) {
    // Create a new option element
    const option = document.createElement("option");
    option.value = cityCode; // Set the value to the city code
    option.text = cityData[cityCode].name; // Set the text to the city name
    select.add(option); // Add the option to the select element
}

let city = "nothing"; // Default to 'nothing'

// Event listener for dropdown menu change
select.addEventListener("change", function () {
    // Show the cards and header
    cards.style.display = "flex";
    header.style.visibility = "visible";
    city = this.value; // Update the city value

    // Update prayer times based on the selected city
    updatePrayerTimes(city);
});

// Function to update prayer times based on the city code
function updatePrayerTimes(cityCode) {
    const selectedCity = cityData[cityCode];
    if (selectedCity.apiCity == null) {
        return; // Exit if no API city code is available
    }
    title.innerHTML = selectedCity.name; // Update the title with the selected city name
    let params = {
        country: "EG",
        city: selectedCity.apiCity,
    };
    // Fetch prayer times from the API
    fetchPrayerTimes(params);
}

// Function to fetch prayer times from the API
function fetchPrayerTimes(params) {
    fetch("http://api.aladhan.com/v1/timingsByCity?" + new URLSearchParams(params))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Fill prayer times on success
            fillPrayerTimes(data.data);
        })
        .catch(error => {
            console.error("Error fetching prayer times:", error);
        });
}

// Function to format time from 24-hour to 12-hour format
function formatTime(time24) {
    const [hours, minutes] = time24.split(":");
    let hours12 = parseInt(hours);
    const ampm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${ampm}`;
}


// Function to fill the prayer times on the page
function fillPrayerTimes(salah) {
    let timings = salah.timings;
    const date = salah.date.readable;
    const weekDay = salah.date.hijri.weekday.ar;

    // Update each prayer time element
    document.getElementById("Fajr").innerHTML = formatTime(timings.Fajr);
    document.getElementById("Sunrise").innerHTML = formatTime(timings.Sunrise);
    document.getElementById("Dhuhr").innerHTML = formatTime(timings.Dhuhr);
    document.getElementById("Asr").innerHTML = formatTime(timings.Asr);
    document.getElementById("Sunset").innerHTML = formatTime(timings.Sunset);
    document.getElementById("Isha").innerHTML = formatTime(timings.Isha);
    document.getElementById("Date").innerHTML = date + " " + weekDay;
}

