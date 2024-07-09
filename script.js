document.addEventListener('DOMContentLoaded', function() {
    // Get all checkboxes inside the div with id "settings"
    var checkboxes = document.querySelectorAll('#settings input[type="checkbox"]');
    
    // Function to update variables and save to localStorage
    function updateVariables() {
        checkboxes.forEach(function(checkbox) {
            // Use the checkbox id directly as the variable name
            window[checkbox.id] = checkbox.checked;
            // Save the checkbox state to localStorage
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // Function to load variables from localStorage and set checkbox states
    function loadVariables() {
        checkboxes.forEach(function(checkbox) {
            var savedState = localStorage.getItem(checkbox.id);
            if (savedState !== null) {
                checkbox.checked = (savedState === 'true');
                window[checkbox.id] = (savedState === 'true');
            }
        });
    }

    // Load variables from localStorage and set initial checkbox states
    loadVariables();
    
    // Add event listeners to checkboxes to update variables on change
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            updateVariables();
        });
    });
});

const locations = ['Disneyland', 'DCA', 'Downtown', 'Hotel', 'Grand', 'Pixar'];
let currentIndex = 0;
infoContainer = document.getElementById('infoContainer')

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
            infoContainer.style.backgroundImage = "url('assets/backgrounds/disneyland.png')"
            break;
        case 'DCA':
            locationLabel.innerHTML = 'California Adventure';
            infoContainer.style.backgroundImage = "url('assets/backgrounds/californiaAdventure.png')"
            break;
        case 'Downtown':
            locationLabel.innerHTML = 'Downtown Disney';
            infoContainer.style.backgroundImage = "url('assets/backgrounds/Downtown.png')"
            break;
        case 'Hotel':
            locationLabel.innerHTML = 'Disneyland Hotel';
            infoContainer.style.backgroundImage = "url('assets/backgrounds/disneyHotel.png')"
            break;
        case 'Grand':
            locationLabel.innerHTML = 'Grand Californian Hotel';
            infoContainer.style.backgroundImage = "url('assets/backgrounds/grandCali.png')"
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
setInterval(cycleInfo,1000*10)

console.log(anaheimTime.checked)

function updateClock() {
    const now = new Date();
    
    // Assuming anaheimTime is defined globally or can be accessed within this scope
    const anaheimTime = window.anaheimTime; 

    // Get time and date in Anaheim if anaheimTime is true, otherwise use local time and date
    const timeOptions = { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateOptions = { timeZone: 'America/Los_Angeles', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const timeString = anaheimTime ? now.toLocaleTimeString('en-US', timeOptions) : now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateString = anaheimTime ? now.toLocaleDateString('en-US', dateOptions) : now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const [time, ampm] = timeString.split(' ');
    const [hour12, minutes, seconds] = time.split(':');

    // Update time
    document.querySelector('time').textContent = `${hour12}:${minutes} ${ampm}`;

    // Update day and date
    const dateParts = dateString.split(', ');
    const dayName = dateParts[0];
    const monthDay = dateParts[1];

    document.querySelector('day').textContent = dayName;
    document.querySelector('date').textContent = monthDay;
}

// Set an interval to update the clock every second
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
        document.getElementById('parkInfo').style.display = 'block'
        document.getElementById('settings').style.display = 'none'
    }else{
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
        document.querySelector('.waitContainer').innerHTML = '<h1>No Wait Times</h1 style="padding-left:40px;">'; // Clear previous content
        return; // Exit function if park is not supported 
    }

    fetch(`https://cors-anywhere.herokuapp.com/https://queue-times.com/parks/${parkId}/queue_times.json`)
        .then(response => response.json())
        .then(data => {
            const lands = data.lands;
            const waitContainer = document.querySelector('.waitContainer');
            waitContainer.innerHTML = '<h1>Live Wait Times</h1 style="padding-left:40px;">';

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
        document.getElementById('waitContainer').scrollTop=0;
        console.log("populated tab")
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


document.addEventListener('DOMContentLoaded', function () {
    const scrollBox = document.getElementById('waitContainer');
    let isScrolling = true;

    // Function to start scrolling
    function startScrolling() {
        scrollInterval = setInterval(() => {
            if (isScrolling) {
                scrollBox.scrollTop += 1;
                if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight) {
                    scrollBox.scrollTop = 0; // Reset to top when bottom is reached
                }
            }
        }, 50); // Adjust the speed by changing the interval (in ms)
    }

    // Start the scrolling after a 2-second delay
    setTimeout(startScrolling, 2000);
});