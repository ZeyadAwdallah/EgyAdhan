# EgyAdhan
## City Prayer Times App

This application displays prayer times for various cities. Users can select a city from a dropdown menu, and the app will fetch and display the prayer times for that city.

## Features

- Dynamic dropdown menu populated with city names.
- Displays prayer times for selected city.
- Formats time from 24-hour to 12-hour format.
- Handles API data fetching and error handling.

## Code Overview

### Variables

- **`select`**: Dropdown menu for selecting a city.
- **`title`**: Element displaying the selected city name.
- **`cards`**: Container for displaying prayer times.
- **`header`**: Header element that becomes visible upon selecting a city.

- **`cityData`**: Object containing city codes, names, and API city codes.

### Dropdown Menu Population

The dropdown menu is populated dynamically using the `cityData` object. Each city is added as an option element with its respective code and name.

```javascript
for (const cityCode in cityData) {
    const option = document.createElement("option");
    option.value = cityCode;
    option.text = cityData[cityCode].name;
    select.add(option);
}
```

### Event Listener for Dropdown Change

When a city is selected from the dropdown menu, the `cards` container is displayed, and the `header` becomes visible. The selected city's data is then used to update prayer times.

```javascript
select.addEventListener("change", function () {
    cards.style.display = "flex";
    header.style.visibility = "visible";
    city = this.value;
    updatePrayerTimes(city);
});
```

### Updating Prayer Times

The `updatePrayerTimes` function is called to fetch and display prayer times for the selected city. It uses the city code to retrieve data from the API.

```javascript
function updatePrayerTimes(cityCode) {
    const selectedCity = cityData[cityCode];
    if (selectedCity.apiCity == null) {
        return;
    }
    title.innerHTML = selectedCity.name;
    let params = {
        country: "EG",
        city: selectedCity.apiCity,
    };
    fetchPrayerTimes(params);
}
```

### Fetching Prayer Times

The `fetchPrayerTimes` function sends a request to the API with the provided parameters. It handles the response, checks for errors, and updates the UI with the prayer times.

```javascript
function fetchPrayerTimes(params) {
    fetch("http://api.aladhan.com/v1/timingsByCity?" + new URLSearchParams(params))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fillPrayerTimes(data.data);
        })
        .catch(error => {
            console.error("Error fetching prayer times:", error);
        });
}

```

### Formatting Time

The `formatTime` function converts time from 24-hour format to 12-hour format with AM/PM notation.

```javascript
function formatTime(time24) {
    const [hours, minutes] = time24.split(":");
    let hours12 = parseInt(hours);
    const ampm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12 || 12;
    return `${hours12}:${minutes} ${ampm}`;
}


```

### Filling Prayer Times

The `fillPrayerTimes` function updates the page with prayer times and the date for the selected city. It formats each prayer time using the `formatTime` function.

```javascript
function fillPrayerTimes(salah) {
    let timings = salah.timings;
    const date = salah.date.readable;
    const weekDay = salah.date.hijri.weekday.ar;

    document.getElementById("Fajr").innerHTML = formatTime(timings.Fajr);
    document.getElementById("Sunris![egyadhan](https://github.com/user-attachments/assets/781794e7-b9c4-4a67-8f3a-c980814ce3fd)
e").innerHTML = formatTime(timings.Sunrise);
    document.getElementById("Dhuhr").innerHTML = formatTime(timings.Dhuhr);
    document.getElementById("Asr").innerHTML = formatTime(timings.Asr);
    document.getElementById("Sunset").innerHTML = formatTime(timings.Sunset);
    document.getElementById("Isha").innerHTML = formatTime(timings.Isha);
    document.getElementById("Date").innerHTML = date + " " + weekDay;
}

```

<div align="center">
  <img src="/EgyAdhan.PNG" alt="EgyAdhan" width="750"/>
</div>
