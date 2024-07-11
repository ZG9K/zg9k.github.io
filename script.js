document.addEventListener('DOMContentLoaded', function() {
    // Get all checkboxes inside the div with id "settings"
    var checkboxes = document.querySelectorAll('#settings input[type="checkbox"]');
    
    // Function to update variables and save to localStorage
    function updateSettings() {
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
            updateSettings();
        });
    });
});

// Function to update the display based on the checkbox state
function updateWaitTimeDisplay() {
    if (document.getElementById("waitTimeEnabled").checked === true) {
        document.getElementById("main").style.display = "flex";
    } else {
        document.getElementById("main").style.display = "none";
    }
}

// Add event listener for the checkbox change event
document.getElementById("waitTimeEnabled").addEventListener('change', updateWaitTimeDisplay);

// Check the state of the checkbox when the page loads
window.addEventListener('load', updateWaitTimeDisplay);

const locations = ['Disneyland', 'DCA', 'Downtown', 'Hotel', 'Grand', 'Pixar'];
let currentIndex = 0;
infoContainer = document.getElementById('infoContainer')
var displayedLocation

function cycleInfo() {
    const waitContainer = document.querySelector('.waitContainer');
    waitContainer.innerHTML = '<h1>Loading Wait Times...</h1 style="padding-left:40px;>'
    let nextIndex = currentIndex;
    do {
        const currentLocation = locations[nextIndex];
        displayedLocation = currentLocation
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

// Array of Disneyland tips
const disneylandTips = [
    {
      title: "<titleBlock>Explore Main Street, U.S.A.</titleBlock>",
      body: "<p>Main Street, U.S.A., is the charming entrance to Disneyland Park, offering a nostalgic look at small-town America.<br> - Visit the Emporium for a wide selection of Disney merchandise and souvenirs.<br> - Enjoy a classic meal at the Plaza Inn, known for its famous fried chicken.<br> - Catch the \"Dapper Dans\" barbershop quartet for some lively music and fun.<br> - Main Street, U.S.A., was inspired by Walt Disney's hometown of Marceline, Missouri!</p>"
    },
    {
      title: "<titleBlock>Discover Adventureland</titleBlock>",
      body: "<p>Adventureland offers an exotic, jungle-like atmosphere filled with thrilling attractions and unique experiences.<br> -  Don't miss the Indiana Jones Adventure and the Jungle Cruise.<br> - Enjoy a tropical treat at the Tiki Juice Bar, home of the famous Dole Whip.<br> - Browse the Adventureland Bazaar for themed souvenirs and gifts.<br> - The Swiss Family Treehouse was the original attraction here, later transformed into Tarzan's Treehouse, which has now become the Swiss Family Treehouse once again!</p>"
    },
    {
      title: "<titleBlock>Uncover New Orleans Square</titleBlock>",
      body: "<p>New Orleans Square brings the vibrant culture of New Orleans to life with its architecture, food, and music.<br> -  Experience the spooky fun of the Haunted Mansion and the swashbuckling adventure of Pirates of the Caribbean.<br> - Savor the flavors of the French Quarter at Café Orleans and the Blue Bayou Restaurant.<br> - Enjoy live jazz performances at the Royal Street Veranda.<br> - New Orleans Square was the first new land added to Disneyland after its opening!</p>"
    },
    {
      title: "<titleBlock>Journey Through Fantasyland</titleBlock>",
      body: "<p>Fantasyland is where classic Disney stories come to life with whimsical rides and enchanting experiences.<br> -  Take a spin on the Mad Tea Party teacups and fly over London in Peter Pan's Flight.<br> - Grab a snack at Red Rose Taverne or a sweet treat at Maurice's Treats.<br> - Visit the Bibbidi Bobbidi Boutique for a magical makeover experience.<br> - The original Sleeping Beauty Castle had the fantasyland side facing Main St. U.S.A!</p>"
    },
    {
      title: "<titleBlock>Venture into Tomorrowland</titleBlock>",
      body: "<p>Tomorrowland offers a glimpse into the future with its futuristic attractions and innovative design.<br> -  Enjoy high-speed thrills on Space Mountain and explore the galaxy with Buzz Lightyear Astro Blasters.<br> - Refuel with a meal at Alien Pizza Planet or Galactic Grill.<br> - Check out Star Trader for all your Star Wars merchandise needs.<br> - Tomorrowland was one of the five original lands at Disneyland when it opened in 1955!</p>"
    }
  ];

const californiaAdventureTips = [
    {
      title: "<titleBlock>Experience Buena Vista Street</titleBlock>",
      body: "<p>Buena Vista Street is the welcoming entrance to California Adventure Park, echoing 1920s Los Angeles.<br> - Visit Elias & Co. for a wide range of Disney merchandise.<br> - Enjoy a nostalgic snack at Fiddler, Fifer & Practical Café.<br>Entertainment: Catch a performance by the Red Car Trolley News Boys.<br> - Buena Vista Street is named after the street where the Walt Disney Studios is located in Burbank.</p>"
    },
    {
      title: "<titleBlock>Explore Cars Land</titleBlock>",
      body: "<p>Cars Land brings the world of Radiator Springs to life with detailed theming and exciting attractions.<br> - Race through Radiator Springs on Radiator Springs Racers and take a spin on Mater's Junkyard Jamboree.<br> - Grab a meal at Flo's V8 Café or a snack at the Cozy Cone Motel.<br> - Browse Sarge's Surplus Hut for Cars-themed merchandise.<br> - Cars Land features over 300,000 square feet of rockwork, making it one of the largest rockwork projects in the country.</p>"
    },
    {
      title: "<titleBlock>Soar Over Grizzly Peak</titleBlock>",
      body: "<p>Grizzly Peak recreates the majestic landscapes of California's wilderness with its rugged terrain and adventurous attractions.<br> - Experience breathtaking views on Soarin' Around the World and brave the rapids on Grizzly River Run.<br> - Enjoy a meal at Smokejumpers Grill or a snack at Redwood Creek Challenge Trail.<br> - Visit Rushin' River Outfitters for outdoor-themed merchandise.<br> - The peak of Grizzly Peak is designed to resemble a grizzly bear roaring into the sky.</p>"
    },
    {
      title: "<titleBlock>Delight in Pixar Pier</titleBlock>",
      body: "<p>Pixar Pier celebrates the beloved characters and stories from Pixar Animation Studios with colorful attractions and experiences.<br> - Ride the Incredicoaster and play games along the Pixar Promenade.<br> - Satisfy your sweet tooth at Bing Bong's Sweet Stuff or grab a bite at Lamplight Lounge.<br> - Shop for Pixar-themed gifts at Knick's Knacks.<br> - Pixar Pier was reimagined from the original Paradise Pier and reopened in 2018.</p>"
    },
    {
      title: "<titleBlock>Immerse in Hollywood Land</titleBlock>",
      body: "<p>Hollywood Land transports you to the golden age of Hollywood with its glitz, glamour, and exciting attractions.<br> - Experience the Guardians of the Galaxy – Mission: BREAKOUT! and enjoy the Disney Animation building.<br> - Grab a meal at Award Wieners or a snack at Schmoozies!<br> - Browse Off the Page for unique Disney art and collectibles.<br> - Hollywood Land's design is inspired by the real-life streets of Hollywood and Los Angeles in the 1930s.</p>"
    }
  ];
  
  
// Function to update the tips for the parks
let tipIndex = 0;

function updateTip() {
    // Get the elements by ID
    const titleElement = document.querySelector('titleBlock');
    const tipInfoElement = document.getElementById('tipInfo');

    // Update the elements with new tip
    if(displayedLocation == ("DCA" || "Grand" || "Pixar")){
    titleElement.innerHTML = californiaAdventureTips[tipIndex].title;
    tipInfoElement.innerHTML = californiaAdventureTips[tipIndex].body;
    }else{
    titleElement.innerHTML = disneylandTips[tipIndex].title;
    tipInfoElement.innerHTML = disneylandTips[tipIndex].body;}

    // Move to the next tip, cycle back to the first one if at the end
    tipIndex = (tipIndex + 1) % disneylandTips.length;
}

// Initial call to set the first tip
updateTip();

// Set interval to update the tip every 20 seconds
setInterval(updateTip, 20000);

// Function to update the heading, image, and tips, based on the current location
function updateLocationLabel(location) {
    var theme = "defaultTheme"

    const imagesArray = {
        Disneyland: "disneyland.png",
        DCA: "californiaAdventure.png",
        Downtown: "Downtown.png",
        Hotel: "disneyHotel.png",
        Grand: "GrandCali.png",
        Pixar: "GrandCali.png" } 

    const locationLabel = document.getElementById("Location");
    switch (location) {
        case 'Disneyland':
            locationLabel.innerHTML = 'Disneyland Park';
            setBackgroundImage(theme, location)
            updateTip()
            break;
        case 'DCA':
            locationLabel.innerHTML = 'Disney California Adventure Park';
            setBackgroundImage(theme, location)
            updateTip()
            break;
        case 'Downtown':
            locationLabel.innerHTML = 'Downtown Disney District';
            setBackgroundImage(theme, location)
            updateTip()
            break;
        case 'Hotel':
            locationLabel.innerHTML = 'Disneyland Hotel';
            setBackgroundImage(theme, location)
            updateTip()
            break;
        case 'Grand':
            locationLabel.innerHTML = "Disney's Grand Californian Hotel & Spa";
            setBackgroundImage(theme, location)
            updateTip()
            break;
        case 'Pixar': 
            locationLabel.innerHTML = "Disney's Pixar Place Hotel";
            updateTip()
            break;
        default:
            console.log('Unknown location');
            return;
    }

    function setBackgroundImage(theme, location) {
        const imagePath = `assets/backgrounds//${imagesArray[location]}`;   
        infoContainer.style.backgroundImage = `url('${imagePath}')`;
    }
}

cycleInfo()
setInterval(cycleInfo,1000*90)

function updateClock() {
    const now = new Date();
    
    anaheimTime = window.anaheimTime; 

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

        document.getElementById("currentWeather").textContent = currentTemp+"°"

    } catch (error) {
        console.log('Error fetching weather data:', error);
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


//musiccccccccccccccccccccccccccccccccccccccccccccccccccccc
let currentAudio = null;

function getSelectedRadioValue() {
    const radios = document.getElementsByName('musicOption');
    let selectedValue = '';
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.id;
            break;
        }
    }
    return selectedValue;
}

function startMusic() {
    const selectedMusic = getSelectedRadioValue();
    console.log("Now Playing "+ selectedMusic)
    const radioArray = {
        splash: "url",
        dt2019: "https://disneychris.com/images/Audio/CH20/TRK66_Disneyland_Today_In-Room_Music_2019.mp3",
        dt2015: "https://disneychris.com/images/Audio/CH20/TRK65_Disneyland_Today_In-Room_Music_2015.mp3",
        dt2011: "https://disneychris.com/images/Audio/CH20/TRK57_Disneyland_Today_In-Room_Music_2011.mp3",
        fantasyTower: "https://disneychris.com/images/Audio/MULT/The_Fantasy_Tower.mp3",
        adventureTower: "https://disneychris.com/images/Audio/MULT/The_Frontier_Tower.mp3",
        frontierTower: "https://disneychris.com/images/Audio/MULT/The_Adventure_Tower.mp3",
        grandCalifornian: "https://soundsofdisneyland.com/AudioFiles/Grizzly%20Peak/02%20Grand%20Californian%20Hotel_%20Entrance%20Path_%20Area%20Loop.mp3",
        pixarPlace: "https://disneychris.com/images/Audio/MULT/Pixar_Fest_Area_Background_Music.mp3",
        mainSt: "https://soundsofdisneyland.com/AudioFiles/Main%20Street%20U.S.A.%20(2013)/02%20Area%20Loop.m4a",
        esplanade: "https://soundsofdisneyland.com/AudioFiles/Disneyland%20Esplanade/31%20Area%20Loop%20(2006).mp3",
        jungleCruise: "url",
        steakhouse55: "url",
        traderSams: "https://disneychris.com/images/Audio/MULT/Trader_Sams_Enchanted_Tiki_Bar_Part_1.mp3",
        mainStHoliday: "url",
        mainStHalloween: "url",
        jingleCruise: "url",
        traderSamsChristmas: "url"
    };

    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const audioUrl = radioArray[selectedMusic];
    if (audioUrl && audioUrl !== "url") {
        currentAudio = new Audio(audioUrl);
        currentAudio.loop = true;
        currentAudio.play();
    }
}
////////////////////////////////////

// Function to check screen size and display the overlay if necessary
function checkScreenSize() {
    if (window.innerWidth < 1920 || window.innerHeight < 1080) {
        document.getElementById('screenWarning').style.display = 'block`';
    }
    else{
        document.getElementById('screenWarning').style.display = 'none';
    }
}

document.getElementById('errorOverlay').style.display = 'flex';

// Function to dismiss the overlay
document.getElementById('dismiss-btn').addEventListener('click', function() {
    document.getElementById('errorOverlay').style.display = 'none';
        // Check if the document is already in fullscreen mode
        if (!document.fullscreenElement) {
            // Request fullscreen for the entire document
            document.documentElement.requestFullscreen().catch((err) => {
                alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            // Exit fullscreen mode
            document.exitFullscreen();
        }

    startMusic()

    const radios = document.getElementsByName('musicOption');
    for (const radio of radios) {
        radio.addEventListener('change', startMusic);
    }

    //stuff for scrolling
    const scrollBox = document.getElementById('waitContainer');
    // Function to start scrolling
    function startScrolling() {
        scrollInterval = setInterval(() => {
            if (window.isScrolling) {
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

// Check screen size on page load
window.onload = checkScreenSize;
window.onresize = checkScreenSize;

function toggleRight(panel) {
    var togglePanel = document.getElementById(panel);
    
    if (togglePanel.style.display == 'block') {
        document.getElementById('parkInfo').style.display = 'block';
        togglePanel.style.display = 'none';
    } else {
        document.getElementById('settings').style.display = 'none';
        document.getElementById('audio').style.display = 'none';
        document.getElementById('parkInfo').style.display = 'none';
        togglePanel.style.display = 'block';
    }
}

//Stuff for footer buttons
document.getElementById("settingsButton").addEventListener('click', function(){
    toggleRight("settings")
})
document.getElementById("audioButton").addEventListener('click', function(){
    toggleRight("audio")
})

function populateWaitTimes(park) {
    let parkId;
    const waitContainer = document.querySelector('.waitContainer');
    if (park === 'Disneyland') {
        parkId = "DisneylandResortMagicKingdom";
        waitContainer.style.display = "block"
    } else if (park === 'DCA') {
        parkId = "DisneylandResortCaliforniaAdventure";
        waitContainer.style.display = "block"
    } else {
        console.warn('Park ' + park + ' does not have wait times.');
        waitContainer.style.display = "none"; 
        return; // Exit function if park is not supported 
    }

    fetch(`https://cors-anywhere.herokuapp.com/https://api.themeparks.wiki/preview/parks/${parkId}/waittime`)
    .then(response => response.json())
    .then(data => {
        waitContainer.style.display = "block";
        waitContainer.innerHTML = '<h1>Live Wait Times</h1 style="padding-left:40px;">';

        let attractions = data;

        attractions.sort((a, b) => {
            // Sort by waitTime descending (highest to lowest)
            if (a.waitTime !== null && b.waitTime !== null) {
                return b.waitTime - a.waitTime;
            } else if (a.waitTime !== null) {
                return -1; // a has waitTime, b does not, so a comes before b
            } else if (b.waitTime !== null) {
                return 1; // b has waitTime, a does not, so b comes before a
            }
        
            // If waitTime is null for both, sort by status
            const statusOrder = {
                "Down": 1,
                "Operating": 2,
                "Refurbishment": 3,
                "Closed": 4,
                "null": 5  // null status comes last
            };
        
            return statusOrder[a.status] - statusOrder[b.status];
        });

        attractions.forEach(attraction => {
            const waitTime = attraction.waitTime === null ? (attraction.status === null ? "Unknown" : attraction.status) : `${attraction.waitTime} Minutes`;
            const backgroundColor = attraction.waitTime === null ? (attraction.status === "Operating" ? 'rgba(100, 255, 100, 0.3)' : (attraction.status === "Down" ? 'rgba(164,91,0,0.3)' : (attraction.status === "Refurbishment" ? 'rgba(255, 80, 80, 0.3)' : 'rgba(0, 0, 0, 0.4)'))) : getBackgroundColor(attraction.waitTime);
            const attractionElement = document.createElement('div');
            let lightningLaneTime = '';

            if (attraction.meta.returnTime && attraction.meta.returnTime.returnStart !== undefined) {
                if (attraction.meta.returnTime.returnStart === null) {
                    lightningLaneTime = 'Sold Out';
                } else {
                    const returnTime = new Date(attraction.meta.returnTime.returnStart);
                    const options = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' };
                    const formattedTime = returnTime.toLocaleString('en-US', options);

                    lightningLaneTime = `${formattedTime}`;
                }
            }

            if (waitTime.includes("Minutes") || displayClosed == true) {
                attractionElement.classList.add('waitElement');

                attractionElement.innerHTML = `
                    <div class="waitName">
                        <span>${attraction.name}</span>
                    </div>
                    ${lightningLaneTime && window.genieActive ? `<div class="lightningLane" style="display: flex; background-color: ${lightningLaneTime === 'Sold Out' ? 'rgba(0,0,0,0.4)' : 'rgba(0, 204, 255, 0.4)'};">
                        <span>${lightningLaneTime}</span>
                    </div>` : ''}
                    <div class="waitTime" style="background-color: ${backgroundColor};">
                        <span>${waitTime}</span>
                    </div>
                `;
                waitContainer.appendChild(attractionElement);
            }
        });
        document.getElementById('waitContainer').scrollTop=0;
        checkNone = document.getElementsByClassName('waitName')
        if(checkNone.length == 0){
            waitContainer.innerHTML = '<h1>Park is Closed</h1 style="padding-left:40px;">';
        }
    })
    .catch(error => {
        waitContainer.innerHTML = '<h1>Wait times could not be retreived.</h1 style="padding-left:40px;">';
    })
        document.getElementById('waitContainer').scrollTop=0;
}

async function fetchParkOpenTimes() {
    const disneylandAPI = 'https://cors-anywhere.herokuapp.com/https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/calendar';
    const californiaAdventureAPI = 'https://cors-anywhere.herokuapp.com/https://api.themeparks.wiki/preview/parks/DisneylandResortCaliforniaAdventure/calendar';

    const [disneylandResponse, californiaResponse] = await Promise.all([
      fetch(disneylandAPI),
      fetch(californiaAdventureAPI)
    ]);

    const disneylandData = await disneylandResponse.json();
    const californiaData = await californiaResponse.json();

    const today = new Date().toISOString().split('T')[0];

    const disneylandToday = disneylandData.find(day => day.date === today);
    const californiaToday = californiaData.find(day => day.date === today);

    if (disneylandToday) {
      document.getElementById('disneyOpenTimes').textContent = formatTime(disneylandToday.openingTime) + ' - ' + formatTime(disneylandToday.closingTime);
    }

    if (californiaToday) {
      document.getElementById('californiaOpenTimes').textContent = formatTime(californiaToday.openingTime) + ' - ' + formatTime(californiaToday.closingTime);
    }
  }

  function formatTime(dateTimeString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' };
    const time = new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    return time;
  }

  window.addEventListener('load', fetchParkOpenTimes);

// Event listener for keydown event
document.addEventListener('keydown', function(event) {
    if (event.key === 'R' || event.key === 'r') {
        // Assuming displayedLocation is defined elsewhere in your code
        populateWaitTimes(displayedLocation);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'C' || event.key === 'c') {   
        cycleInfo()
    }
});

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
    setInterval(populateWaitTimes, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
)



  