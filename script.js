document.addEventListener('DOMContentLoaded', function() {
    // Get all checkboxes inside the div with id "settings"
    var checkboxes = document.querySelectorAll('#settings input[type="checkbox"]');
    
    // Function to update variables based on checkbox states
    function updateVariables() {
        checkboxes.forEach(function(checkbox) {
            // Use the checkbox id directly as the variable name
            window[checkbox.id] = checkbox.checked;
            console.log(checkbox.id +"=" +window[checkbox.id])
        });
    }
    
    // Initial call to update variables based on current checkbox states
    updateVariables();
    
    // Add event listeners to checkboxes to update variables on change
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateVariables();
        });
    });
});

const locations = ['Disneyland', 'DCA', 'Downtown', 'Hotel', 'Grand', 'Pixar'];
let currentIndex = 0;

function cycleInfo() {
    let nextIndex = currentIndex;
    do {
        const currentLocation = locations[nextIndex];
        if (isActive(currentLocation)) {
            populateWaitTimes(currentLocation);
            currentIndex = nextIndex;
            updateLocationLabel(currentLocation);
            break;
        }
        nextIndex = (nextIndex + 1) % locations.length;
    } while (nextIndex !== currentIndex);
    currentIndex = (currentIndex + 1) % locations.length;
}

// Function to check if a location is active
function isActive(location) {
    switch (location) {
        case 'Disneyland':
            return disneylandActive;
        case 'DCA':
            return dcaActive;
        case 'Downtown':
            return downtownActive;
        case 'Hotel':
            return dhActive;
        case 'Grand':
            return gchActive;
        case 'Pixar':
            return pphActive;
        default:
            return false; // Default to false for unknown locations
    }
}

// Function to update the heading based on the current location
function updateLocationLabel(location) {
    const locationLabel = document.getElementById("Location");
    switch (location) {
        case 'Disneyland':
            locationLabel.innerHTML = 'Disneyland';
            break;
        case 'DCA':
            locationLabel.innerHTML = 'California Adventure';
            break;
        case 'Downtown':
            locationLabel.innerHTML = 'Downtown Disney';
            break;
        case 'Hotel':
            locationLabel.innerHTML = 'Disneyland Hotel';
            break;
        case 'Grand':
            locationLabel.innerHTML = 'Grand Californian Hotel';
            break;
        case 'Pixar':
            locationLabel.innerHTML = 'Pixar Place Hotel';
            break;
        default:
            console.log('Unknown location');
            return;
    }
}



cycleInfo()
setInterval(cycleInfo, 1000*5);

function updateClock() {
    const now = new Date();
    
    // Update time
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    document.querySelector('time').textContent = `${hour12}:${minutes} ${ampm}`;

    // Update day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    document.querySelector('day').textContent = `${dayName}`;

    // Update date
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[now.getMonth()];
    const day = now.getDate();
    document.querySelector('date').textContent = `${monthName} ${day}`;
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to display clock immediately

const latitude = 33.84568;  // Latitude of Anaheim
const longitude = -117.90953;  // Longitude of Anaheim

async function getWeather() {
    try {
        // woo a free weather API
        const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=America/Los_Angeles&lang=en`;
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();
        console.log(currentData)
        const currentWeather = getWeatherDescription(currentData.current.weathercode);
        const currentTemp = Math.ceil(currentData.current.temperature_2m);
        console.log('Current Weather:', currentWeather);
        console.log('Current Temp:', currentTemp);

        document.getElementById("currentWeather").textContent = currentTemp+"°"

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// went down a rabbit hole of WMO codes, theyre neat
//TODO: add lil icons to show the weather state
//TODO: add a "later" forecast section
function getWeatherDescription(wmoCode) {
    switch (wmoCode) {
        case 1:
            return 'Clear sky';
        case 2:
            return 'Nearly clear sky';
        case 3:
            return 'Partly cloudy';
        case 4:
            return 'Cloudy sky';
        case 5:
            return 'Fog';
        case 10:
            return 'Rain showers';
        case 21:
            return 'Thunderstorm';
        default:
            return 'Unknown';
    }
}

getWeather();

// Function to check screen size and display the overlay if necessary
function checkScreenSize() {
    if (window.innerWidth < 1920 || window.innerHeight < 1080) {
        document.getElementById('screenWarning').style.display = 'flex';
    }
    else{
        document.getElementById('screenWarning').style.display = 'none';
    }
}

document.getElementById('errorOverlay').style.display = 'flex';

// Function to dismiss the overlay
document.getElementById('dismiss-btn').addEventListener('click', function() {
    document.getElementById('errorOverlay').style.display = 'none';
    var audio = document.getElementById('background-music');
    audio.loop = true;
    //audio.play();
});


// Check screen size on page load
window.onload = checkScreenSize;

// Optionally, check screen size on window resize
window.onresize = checkScreenSize;


//Stuff for footer buttons
document.getElementById("settingsButton").addEventListener('click', function(){

    if(document.getElementById('settings').style.display == 'block'){
        console.log("passed")
        document.getElementById('parkInfo').style.display = 'block'
        document.getElementById('settings').style.display = 'none'
    }else{
        console.log("elsed")
    document.getElementById('parkInfo').style.display = 'none'
    document.getElementById('settings').style.display = 'block'
    }
})

function populateWaitTimes(park) {
    let parkId;

    if (park === 'Disneyland') {
        parkId = 16;
    } else if (park === 'DCA') {
        parkId = 17;
    } else {
        console.log('Park ' + park + ' does not have wait times.');
        document.querySelector('.waitContainer').innerHTML = ''; // Clear previous content
        return; // Exit function if park is not supported 
    }

    fetch(`https://cors-anywhere.herokuapp.com/https://queue-times.com/parks/${parkId}/queue_times.json`)
        .then(response => response.json())
        .then(data => {
            const lands = data.lands;
            const waitContainer = document.querySelector('.waitContainer');
            waitContainer.innerHTML = '';

            // Flatten rides array and sort by wait_time, placing closed attractions last
            let rides = [];
            lands.forEach(land => {
                rides.push(...land.rides);
            });
            rides.sort((b, a) => {
                if (a.wait_time === 0 && b.wait_time === 0) return 0; // Keep order if both closed
                if (b.wait_time === 0) return 1; // Closed attractions move to end
                if (a.wait_time === 0) return -1; // Closed attractions move to end
                return a.wait_time - b.wait_time; // Sort by wait_time ascending
            });

            rides.forEach(ride => {
                const waitTime = ride.wait_time === 0 ? 'CLOSED' : `${ride.wait_time} Minutes`;
                const backgroundColor = ride.wait_time === 0 ? 'rgba(0, 0, 0, 0.4)' : getBackgroundColor(ride.wait_time);
                const rideElement = document.createElement('div');
                rideElement.classList.add('waitElement');

                rideElement.innerHTML = `
                    <div class="waitName">
                        <span>${ride.name}</span>
                    </div>
                    <div class="waitTime" style="background-color: ${backgroundColor};">
                        <span>${waitTime}</span>
                    </div>
                `;
                waitContainer.appendChild(rideElement);
            });
        })
        .catch(error => {
            console.error('Error fetching wait times:', error);
        });
}

//yay for chatgpt so i dont need to do proper maths
// Function to determine background color based on wait time
function getBackgroundColor(waitTime) {
    // Calculate color based on linear scale from 5 minutes to 75 minutes
    const minWait = 5; // Minimum wait time for green (0, 255, 0)
    const maxWait = 75; // Maximum wait time for red (255, 0, 0)
    const green = 0;
    const red = 255;

    // Interpolate color based on wait time
    const normalizedWait = (waitTime - minWait) / (maxWait - minWait);
    const r = Math.round(green + (red - green) * normalizedWait);
    const g = Math.round(red - r);
    const b = 0;
    const alpha = 0.4;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


document.addEventListener('DOMContentLoaded', function (){
    populateWaitTimes()
    setInterval(populateWaitTimes, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
)
