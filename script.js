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

function cycleWaitInfo() {
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

const generalTips = [
    {
      "title": "<titleBlock>Early Morning Rides</titleBlock>",
      "body": "<p>Start your day by heading to the most popular attractions.<br> - Lines are shorter in the morning.<br> - You'll have more time for other activities later.<br> - Use the Disneyland app to check wait times.</p>"
    },
    {
      "title": "<titleBlock>Hidden Mickeys</titleBlock>",
      "body": "<p>Keep an eye out for Hidden Mickeys throughout the park.<br> - They are hidden in attractions, shops, and restaurants.<br> - There are over 1,000 Hidden Mickeys to find.<br> - Challenge your family and friends to find the most!</p>"
    },
    {
      "title": "<titleBlock>Maximize Genie+ Usage</titleBlock>",
      "body": "<p>Strategize your Genie+ selections for the best experience.<br> - Reserve Lightning Lane passes for high-demand attractions.<br> - Use the app to plan out your day and avoid long waits.<br> - Don't forget to check return times frequently.</p>"
    },
    {
      "title": "<titleBlock>Explore Downtown Disney</titleBlock>",
      "body": "<p>Take a break from the parks and explore Downtown Disney.<br> - Enjoy unique shops and dining options.<br> - Experience live entertainment and special events.<br> - No park ticket is required to visit.</p>"
    },
    {
      "title": "<titleBlock>Character Meet-and-Greets</titleBlock>",
      "body": "<p>Plan your day to meet your favorite Disney characters.<br> - Use the app to find character locations and times.<br> - Arrive early to avoid long lines.<br> - Have your camera and autograph book ready!</p>"
    },
    {
      "title": "<titleBlock>Disneyland App Benefits</titleBlock>",
      "body": "<p>Download and use the Disneyland app for a smoother visit.<br> - Check wait times for attractions and dining.<br> - Make dining reservations and mobile orders.<br> - Access park maps and showtimes easily.</p>"
    },
    {
      "title": "<titleBlock>Take Advantage of Single Rider Lines</titleBlock>",
      "body": "<p>Use Single Rider lines to save time on popular rides.<br> - Available on select attractions like Space Mountain and Indiana Jones.<br> - Great for older kids and adults comfortable riding alone.<br> - You can experience more attractions in a shorter time.</p>"
    },
    {
      "title": "<titleBlock>Best Viewing Spots for Parades</titleBlock>",
      "body": "<p>Find the best spots to watch parades and shows.<br> - Arrive early to secure a good viewing spot.<br> - Consider viewing locations near the start or end of the parade route.<br> - Use the app to check showtimes and plan accordingly.</p>"
    },
    {
      "title": "<titleBlock>Stay Hydrated and Cool</titleBlock>",
      "body": "<p>Keep yourself refreshed throughout your visit.<br> - Water fountains and bottle refill stations are located around the park.<br> - Take breaks in shaded areas or air-conditioned attractions.<br> - Wear a hat and sunscreen to protect against the sun.</p>"
    },
    {
      "title": "<titleBlock>Efficient Dining Options</titleBlock>",
      "body": "<p>Plan your meals to avoid long waits and crowded dining areas.<br> - Use mobile ordering through the Disneyland app for quick service.<br> - Eat during off-peak hours for shorter lines.<br> - Explore various dining options, including quick snacks and sit-down restaurants.</p>"
    }
  ]
  
const disneylandTips = [
    {
      "title": "<titleBlock>Rope Drop Fantasyland</titleBlock>",
      "body": "<p>Start your day in Fantasyland to enjoy popular rides with shorter waits.<br> - Head straight to Peter Pan's Flight and Dumbo the Flying Elephant.<br> - Experience classic attractions like It's a Small World early in the day.<br> - Save other areas for later when lines get longer.</p>"
    },
    {
      "title": "<titleBlock>Disneyland Railroad</titleBlock>",
      "body": "<p>Use the Disneyland Railroad to navigate the park efficiently.<br> - Board at any of the four stations: Main Street, New Orleans Square, Mickey's Toontown, and Tomorrowland.<br> - Enjoy a scenic tour around Disneyland while giving your feet a rest.<br> - Great for getting to different areas of the park quickly.</p>"
    },
    {
      "title": "<titleBlock>Hidden Mickey Hunt</titleBlock>",
      "body": "<p>Engage in a fun Hidden Mickey hunt throughout Disneyland.<br> - Look for Mickey shapes hidden in attractions, queues, and decor.<br> - Keep an eye out in places like Pirates of the Caribbean and Haunted Mansion.<br> - Challenge your group to see who can find the most!</p>"
    },
    {
      "title": "<titleBlock>Parade Viewing Tips</titleBlock>",
      "body": "<p>Get the best spots for Disneyland parades.<br> - Arrive 30-45 minutes early to secure a good viewing location.<br> - Consider spots near It's a Small World or Main Street for a great view.<br> - Use the Disneyland app to check parade times and routes.</p>"
    },
    {
      "title": "<titleBlock>Mobile Ordering</titleBlock>",
      "body": "<p>Save time by using mobile ordering for meals and snacks.<br> - Available at many quick service restaurants and snack stands.<br> - Place your order in advance and pick it up at a designated time.<br> - Avoid long lines and enjoy more park time.</p>"
    },
    {
      "title": "<titleBlock>Nighttime Spectaculars</titleBlock>",
      "body": "<p>Plan ahead for Disneyland's nighttime spectaculars.<br> - Secure a spot early for shows like Fantasmic! and fireworks.<br> - Consider booking a dining package for reserved viewing areas.<br> - Check the app for showtimes and viewing locations.</p>"
    },
    {
      "title": "<titleBlock>Single Rider Lines</titleBlock>",
      "body": "<p>Utilize Single Rider lines to reduce wait times.<br> - Available for select attractions like Indiana Jones Adventure and Matterhorn Bobsleds.<br> - Perfect for older kids and adults willing to ride alone.<br> - Experience more rides with less waiting.</p>"
    },
    {
      "title": "<titleBlock>Character Dining</titleBlock>",
      "body": "<p>Enjoy a magical meal with Disney characters.<br> - Book reservations for character dining experiences at Plaza Inn or Goofy's Kitchen.<br> - Meet and greet characters while enjoying delicious food.<br> - Make reservations early to secure your spot.</p>"
    },
    {
      "title": "<titleBlock>Photopass and Memory Maker</titleBlock>",
      "body": "<p>Capture magical moments with Photopass and Memory Maker.<br> - Use Photopass photographers located throughout the park.<br> - Purchase Memory Maker to download all your photos.<br> - Great for capturing memories without having to carry a camera.</p>"
    },
    {
      "title": "<titleBlock>Maximize Genie+</titleBlock>",
      "body": "<p>Strategize your Genie+ selections for a seamless experience.<br> - Reserve Lightning Lane passes for high-demand attractions first.<br> - Use the app to monitor return times and availability.<br> - Plan your day around your Genie+ reservations to avoid long waits.</p>"
    }
  ]

const californiaAdventureTips = [
    {
      "title": "<titleBlock>Rope Drop Radiator Springs Racers</titleBlock>",
      "body": "<p>Start your day with Radiator Springs Racers for shorter wait times.<br> - Head straight to Cars Land at park opening.<br> - Enjoy the immersive Cars-themed scenery.<br> - Save Genie+ for later in the day.</p>"
    },
    {
      "title": "<titleBlock>World of Color Viewing Spots</titleBlock>",
      "body": "<p>Secure the best spots for World of Color.<br> - Arrive early for prime viewing areas.<br> - Consider getting a dining package for reserved seating.<br> - Use the Disneyland app for showtimes and details.</p>"
    },
    {
      "title": "<titleBlock>Utilize Single Rider Lines</titleBlock>",
      "body": "<p>Save time by using Single Rider lines.<br> - Available for Radiator Springs Racers, Incredicoaster, and Grizzly River Run.<br> - Ideal for older kids and adults comfortable riding alone.<br> - Experience more attractions with less waiting.</p>"
    },
    {
      "title": "<titleBlock>Explore Pixar Pier</titleBlock>",
      "body": "<p>Spend time exploring the vibrant Pixar Pier.<br> - Ride the Incredicoaster and Toy Story Midway Mania.<br> - Enjoy Pixar-themed treats and snacks.<br> - Take photos with your favorite Pixar characters.</p>"
    },
    {
      "title": "<titleBlock>Avengers Campus Strategy</titleBlock>",
      "body": "<p>Make the most of your time at Avengers Campus.<br> - Meet your favorite Marvel superheroes.<br> - Try the unique food offerings at Pym Test Kitchen.<br> - Check the app for showtimes and character appearances.</p>"
    },
    {
      "title": "<titleBlock> and Genie+ Tips</titleBlock>",
      "body": "<p>Optimize your Genie+ usage.<br> - Book high-demand attractions first.<br> - Refresh the app frequently for new return times.<br> - Plan your day around reserved times.</p>"
    },
    {
      "title": "<titleBlock>Hidden Gems in Hollywood Land</titleBlock>",
      "body": "<p>Discover hidden gems and entertainment in Hollywood Land.<br> - Visit the Animation Academy to draw your favorite characters.<br> - Enjoy live shows like Mickey's PhilharMagic.<br> - Check out the Disney Junior Dance Party for younger kids.</p>"
    },
    {
      "title": "<titleBlock>Take a Break at Grizzly Peak</titleBlock>",
      "body": "<p>Relax and unwind at Grizzly Peak.<br> - Enjoy the scenic Redwood Creek Challenge Trail.<br> - Take a peaceful ride on the Grizzly River Run.<br> - Find shaded areas for a cool break.</p>"
    },
    {
      "title": "<titleBlock>Dining Options at Pacific Wharf</titleBlock>",
      "body": "<p>Explore diverse dining options at Pacific Wharf.<br> - Enjoy Mexican cuisine at Cocina Cucamonga.<br> - Try the famous clam chowder in a bread bowl at Pacific Wharf Café.<br> - Sample Ghirardelli chocolate treats for dessert.</p>"
    },
    {
      "title": "<titleBlock>Shopping at Buena Vista Street</titleBlock>",
      "body": "<p>Shop for unique souvenirs on Buena Vista Street.<br> - Visit Elias & Co. for Disney merchandise.<br> - Find unique items at Trolley Treats.<br> - Enjoy the nostalgic atmosphere of 1920s Los Angeles.</p>"
    }
  ]

const disneylandHotelTips = [
    {
      "title": "<titleBlock>Relax at the Monorail Pool</titleBlock>",
      "body": "<p>Enjoy a relaxing day at the Disneyland Hotel's Monorail Pool.<br> - Cool off with a swim or lounge in a private cabana.<br> - Kids will love the two Monorail-themed water slides.<br> - Poolside service is available for drinks and snacks.</p>"
    },
    {
      "title": "<titleBlock>Trader Sam's Enchanted Tiki Bar</titleBlock>",
      "body": "<p>Experience the fun and quirky atmosphere at Trader Sam's.<br> - Try unique, themed cocktails and appetizers.<br> - Enjoy the interactive elements and surprises.<br> - Perfect for a relaxing evening after a day in the parks.</p>"
    },
    {
      "title": "<titleBlock>Character Breakfast at Goofy's Kitchen</titleBlock>",
      "body": "<p>Start your day with a character breakfast at Goofy's Kitchen.<br> - Meet Goofy and other Disney characters while you dine.<br> - Enjoy a delicious buffet with a variety of options.<br> - Make reservations in advance to secure your spot.</p>"
    },
    {
      "title": "<titleBlock>Stroll Through the Hotel Grounds</titleBlock>",
      "body": "<p>Take a leisurely stroll through the beautiful hotel grounds.<br> - Discover the nostalgic touches and Disney-themed decor.<br> - Explore the lush gardens and water features.<br> - Enjoy the serene atmosphere away from the park crowds.</p>"
    },
    {
      "title": "<titleBlock>Special Events and Activities</titleBlock>",
      "body": "<p>Participate in special events and activities at the hotel.<br> - Check the schedule for daily activities and entertainment.<br> - Enjoy movie nights, pool games, and fitness classes.<br> - Perfect for keeping the family entertained during your stay.</p>"
    }
  ]

const grandCalifornianHotelTips = [
    {
      "title": "<titleBlock>Exclusive Entrance to Disney California Adventure</titleBlock>",
      "body": "<p>Take advantage of the exclusive entrance to Disney California Adventure Park.<br> - Save time by entering directly from the hotel.<br> - Perfect for early access to popular attractions.<br> - Convenient for midday breaks and quick returns to the park.</p>"
    },
    {
      "title": "<titleBlock>Relax at the Redwood Pool</titleBlock>",
      "body": "<p>Unwind at the serene Redwood Pool area.<br> - Enjoy a swim in the themed pool or relax in a private cabana.<br> - Kids will love the Redwood Creek water slide.<br> - Poolside service is available for drinks and snacks.</p>"
    },
    {
      "title": "<titleBlock>Indulge at Napa Rose</titleBlock>",
      "body": "<p>Dine at the award-winning Napa Rose restaurant.<br> - Savor gourmet dishes and fine wines.<br> - Make reservations for the Chef's Counter for a unique dining experience.<br> - Perfect for a special occasion or romantic evening.</p>"
    },
    {
      "title": "<titleBlock>Storytelling at the Hearthstone Lounge</titleBlock>",
      "body": "<p>Enjoy a cozy evening with storytelling at the Hearthstone Lounge.<br> - Relax by the fireplace with a drink and listen to Disney stories.<br> - Perfect for families and guests of all ages.<br> - Check the schedule for storytelling times and themes.</p>"
    },
    {
      "title": "<titleBlock>Explore the Hotel's Craftsman Architecture</titleBlock>",
      "body": "<p>Appreciate the stunning Craftsman-style architecture and decor.<br> - Take a guided tour of the hotel's design and history.<br> - Discover hidden details and artistic touches.<br> - Perfect for architecture and design enthusiasts.</p>"
    }
  ]

const pixarPlaceHotelTips = [
    {
      "title": "<titleBlock>Pixar-Themed Rooms</titleBlock>",
      "body": "<p>Enjoy the whimsical Pixar-themed rooms at the Pixar Pier Hotel.<br> - Each room features decor inspired by beloved Pixar films.<br> - Look for hidden details and Easter eggs in the room design.<br> - Perfect for fans of Pixar's iconic characters and stories.</p>"
    },
    {
      "title": "<titleBlock>Rooftop Pool with a View</titleBlock>",
      "body": "<p>Relax at the rooftop pool with stunning views of the park.<br> - Take a refreshing swim or lounge in a poolside cabana.<br> - Enjoy panoramic views of Disney California Adventure.<br> - Poolside service is available for drinks and snacks.</p>"
    },
    {
      "title": "<titleBlock>Character Encounters</titleBlock>",
      "body": "<p>Meet your favorite Pixar characters at the hotel.<br> - Look for scheduled character meet-and-greet times.<br> - Perfect for photo opportunities and autographs.<br> - Check the hotel’s activity schedule for more details.</p>"
    },
    {
      "title": "<titleBlock>Dining at the Pixar Pier Hotel</titleBlock>",
      "body": "<p>Enjoy delicious dining options right at the hotel.<br> - Visit the hotel restaurant for Pixar-themed meals and treats.<br> - Try unique dishes inspired by your favorite Pixar films.<br> - Perfect for a convenient and themed dining experience.</p>"
    },
    {
      "title": "<titleBlock>Exclusive Hotel Activities</titleBlock>",
      "body": "<p>Participate in exclusive activities and events at the hotel.<br> - Check the schedule for movie nights and craft sessions.<br> - Enjoy themed scavenger hunts and games.<br> - Great for keeping the whole family entertained during your stay.</p>"
    }
  ]

const downtownDisneyTips = [
    {
      "title": "<titleBlock>Early Morning Shopping</titleBlock>",
      "body": "<p>Start your day early with shopping at Downtown Disney.<br> - Shops often open before the parks.<br> - Enjoy a quieter shopping experience.<br> - Check out unique Disney merchandise and souvenirs.</p>"
    },
    {
      "title": "<titleBlock>Hidden Dining Gems</titleBlock>",
      "body": "<p>Discover hidden dining gems in Downtown Disney.<br> - Explore restaurants and cafes off the main promenade.<br> - Find delicious treats and unique cuisine options.<br> - Perfect for a relaxing meal away from the crowds.</p>"
    },
    {
      "title": "<titleBlock>Live Entertainment Schedule</titleBlock>",
      "body": "<p>Check out the live entertainment schedule at Downtown Disney.<br> - Enjoy performances by local musicians and artists.<br> - Check the app for showtimes and locations.<br> - Perfect for adding a musical touch to your shopping and dining experience.</p>"
    },
    {
      "title": "<titleBlock>Visit the LEGO Store</titleBlock>",
      "body": "<p>Explore the LEGO Store for interactive fun.<br> - Build your own LEGO creations at the Build-A-Mini station.<br> - Marvel at the LEGO sculptures throughout the store.<br> - Perfect for LEGO enthusiasts of all ages.</p>"
    },
    {
      "title": "<titleBlock>Nighttime Ambiance</titleBlock>",
      "body": "<p>Experience the vibrant nighttime ambiance of Downtown Disney.<br> - Enjoy the festive atmosphere with lights and music.<br> - Take a leisurely stroll after dark.<br> - Perfect for a relaxing evening after a day at the parks.</p>"
    }
  ]
  
  
  
// Function to update the tips for the parks
let tipIndex = 0;

function updateTip() {
    const titleElement = document.querySelector('titleBlock'); // Adjust if 'titleBlock' is a class
    const tipInfoElement = document.getElementById('tipInfo'); // Assuming 'tipInfo' is the ID of the element to display tips
    let opacity = 1;

    tipArrayLength = 10

    const fadeInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            titleElement.style.opacity = tipInfoElement.style.opacity = opacity;
        } else {
            clearInterval(fadeInterval);
            switch (displayedLocation) {
                case 'Disneyland':
                    titleElement.innerHTML = disneylandTips[tipIndex].title;
                    tipInfoElement.innerHTML = disneylandTips[tipIndex].body;
                    break;
                case 'DCA':
                    titleElement.innerHTML = californiaAdventureTips[tipIndex].title;
                    tipInfoElement.innerHTML = californiaAdventureTips[tipIndex].body;
                    break;
                case 'Downtown':
                    titleElement.innerHTML = downtownDisneyTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].title;
                    tipInfoElement.innerHTML = downtownDisneyTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].body;
                    break;
                case 'Hotel':
                    titleElement.innerHTML = disneylandHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].title;
                    tipInfoElement.innerHTML = disneylandHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].body;
                    break;
                case 'Grand':
                    titleElement.innerHTML = grandCalifornianHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].title;
                    tipInfoElement.innerHTML = grandCalifornianHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].body;
                    break;
                case 'Pixar':
                    titleElement.innerHTML = pixarPlaceHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].title;
                    tipInfoElement.innerHTML = pixarPlaceHotelTips[(tipIndex >= 5) ? tipIndex - 5 : tipIndex].body;
                    break;
                default:
            }

            tipIndex = (tipIndex + 1) % tipArrayLength;

            const fadeInInterval = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.1;
                    titleElement.style.opacity = tipInfoElement.style.opacity = opacity;
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 50);
        }
    }, 50);
}


updateTip()

// Set interval to update the tip every 20 seconds
setInterval(updateTip, 20000);

// Function to update the heading, image, and tips, based on the current location
function updateLocationLabel(location) {
    var theme = "defaultTheme"
    updateTip()

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
            break;
        case 'DCA':
            locationLabel.innerHTML = 'Disney California Adventure Park';
            setBackgroundImage(theme, location)
            break;
        case 'Downtown':
            locationLabel.innerHTML = 'Downtown Disney District';
            setBackgroundImage(theme, location)
            break;
        case 'Hotel':
            locationLabel.innerHTML = 'Disneyland Hotel';
            setBackgroundImage(theme, location)
            break;
        case 'Grand':
            locationLabel.innerHTML = "Disney's Grand Californian Hotel & Spa";
            setBackgroundImage(theme, location)
            break;
        case 'Pixar': 
            locationLabel.innerHTML = "Disney's Pixar Place Hotel";
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

cycleWaitInfo()
setInterval(cycleWaitInfo,1000*90)

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
        grandCalifornian: "http://soundsofdisneyland.com/AudioFiles/Grizzly Peak/02 Grand Californian Hotel_ Entrance Path_ Area Loop.mp3",
        pixarPlace: "https://disneychris.com/images/Audio/MULT/Pixar_Fest_Area_Background_Music.mp3",
        mainSt: "https://disneychris.com/images/Audio/MULT/2012_Main_Street_USA_Area_Background_Music.mp3",
        esplanade: "https://disneychris.com/images/Audio/CH1/TRK94_Disneyland_Esplanade_Area_Background_Music.mp3",
        jungleCruise: "https://disneychris.com/images/Audio/CH6/TRK61_Jungle_Cruise_Boathouse_Global_Broadcasting_Service.mp3",
        steakhouse55: "https://disneychris.com/images/Audio/CH20/TRK83_Steakhouse_55_Atmosphere_Music.mp3",
        traderSams: "https://disneychris.com/images/Audio/MULT/Trader_Sams_Enchanted_Tiki_Bar_Part_1.mp3",
        mainStHoliday: "https://disneychris.com/images/Audio/CH23/TRK32_Main_Street_Holiday_Area_Music_Disneyland_1972.mp3",
        mainStHalloween: "https://disneychris.com/images/Audio/MULT/Le_Bat_en_Rouge.mp3",
        jingleCruise: "https://disneychris.com/images/Audio/CH23/TRK57_The_Jingle_Cruise_Queue_Area_Background_Music.mp3",
        traderSamsChristmas: "https://disneychris.com/images/Audio/CH23/TRK56_Trader_Sams_Enchanted_Tiki_Bar_-_Holiday.mp3"
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

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.getElementById('settings').style.display = 'none';
        document.getElementById('audio').style.display = 'none';
        document.getElementById('parkInfo').style.display = 'block' 
    }
});

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
        // Example specific functionality for Disneyland if needed
        // You can add specific logic here for Disneyland
    } else if (park === 'DCA') {
        parkId = "DisneylandResortCaliforniaAdventure";
        // Example specific functionality for DCA if needed
        // You can add specific logic here for California Adventure
    } else {
        console.log('Park ' + park + ' does not have wait times. Searching hotels...');

        // Fetch and process data for Hotel or Grand if applicable
        const url = 'https://api.themeparks.wiki/v1/entity/bfc89fd6-314d-44b4-b89e-df1a89cf991e/live';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                waitContainer.innerHTML = '<h1>Hotel Resturant Status</h1 style="padding-left:40px;">';
                let locations = [];

                if (park === "Hotel") {
                    locations = ["Goofy's Kitchen", "Trader Sam's Enchanted Tiki Bar"];
                } else if (park === "Grand") {
                    locations = ["Napa Rose", "Storytellers Cafe", "GCH Craftsman Bar"];
                } else {
                    console.error("No valid locations found.");
                    return;
                }

                locations.forEach(location => {
                    const item = data.liveData.find(item => item.name === location);

                    if (item) {
                        const status = item.status;
                        const backgroundColor = status === "OPERATING" ? 'rgba(100, 255, 100, 0.3)' :
                                              status === "Down" ? 'rgba(164, 91, 0, 0.3)' :
                                              status === "Refurbishment" ? 'rgba(255, 80, 80, 0.3)' :
                                              'rgba(0, 0, 0, 0.4)';
                        const waitTime = status;
                        const attractionElement = document.createElement('div');
                        attractionElement.classList.add('waitElement');
                        // Append HTML to waitContainer
                        attractionElement.innerHTML = `
                        <div class="waitName">
                            <span>${item.name}</span>
                        </div>
                        <div class="waitTime" style="background-color: ${backgroundColor};">
                            <span>${waitTime}</span>
                        </div>
                    `;
                    waitContainer.appendChild(attractionElement);
                    } else {
                        console.error(`Location '${location}' not found.`);
                    }
                    
                    checkNone = document.getElementsByClassName('waitName')

                    if(checkNone.length == 0){
                        waitContainer.innerHTML = '<h1>Park is Closed</h1 style="padding-left:40px;">';
                        if(displayWaitParkClosed==false){waitContainer.style.display = "none";}else{waitContainer.style.display = "block";}
                    }else{waitContainer.style.display = "block";}
                });
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });

        waitContainer.style.display = "none"; // Hide container if park is not supported
        return; // Exit function if park is not Disneyland or DCA
    }

    fetch(`https://cors-anywhere.herokuapp.com/https://api.themeparks.wiki/preview/parks/${parkId}/waittime`)
    .then(response => response.json())
    .then(data => {
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
            if(displayWaitParkClosed==false){waitContainer.style.display = "none";}else{waitContainer.style.display = "block";}
        }else{waitContainer.style.display = "block";}
    })
    .catch(error => {
        waitContainer.style.display = "block";
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
        cycleWaitInfo()
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'T' || event.key === 't') {   
        updateTip()
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
    document.getElementById("genieActive").addEventListener("change", function() {
            populateWaitTimes(displayedLocation)});
    document.getElementById("displayClosed").addEventListener("change", function() {
        populateWaitTimes(displayedLocation)})
    document.getElementById("displayWaitParkClosed").addEventListener("change", function() {
        populateWaitTimes(displayedLocation)})
})