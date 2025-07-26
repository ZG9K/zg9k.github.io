// disneyland id 7340550b-c14d-4def-80bb-acdb51d49a66
// dca id 832fcd51-ea19-4e77-85c7-75d5843b127c


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

//wakelock
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        
        // Handle release of the wake lock
        wakeLock.addEventListener('release', () => {
            console.log('Wake lock was released.');
        });
    } catch (err) {
        //console.error(`Wake lock request failed: ${err.name}, ${err.message}`);
    }
}

// Request wake lock when the page is loaded
window.addEventListener('load', () => {
    if ('wakeLock' in navigator) {
        requestWakeLock();

        // Optionally, renew wake lock when the visibility state changes
        document.addEventListener('visibilitychange', () => {
            if (wakeLock !== null && document.visibilityState === 'visible') {
                requestWakeLock();
            }
        });
    } else {
        console.warn('Wake Lock API not supported in this browser.');
    }
});

//end wakelock

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
    const waitContainer = document.getElementById('waitContainer');
    waitContainer.innerHTML = '<h1>Loading Wait Times...</h1 style="padding-left:40px;">';
    let nextIndex = currentIndex;
    let foundActive = false;
    let checked = 0;
    while (checked < locations.length) {
        const currentLocation = locations[nextIndex];
        if (isActive(currentLocation)) {
            displayedLocation = currentLocation;
            populateWaitTimes(currentLocation);
            updateLocationDisplay(currentLocation);
            currentIndex = (nextIndex + 1) % locations.length;
            foundActive = true;
            break;
        }
        nextIndex = (nextIndex + 1) % locations.length;
        checked++;
    }
    if (!foundActive) {
        waitContainer.innerHTML = '<h1>No active locations available.</h1>';
    }
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
    },
    {
    "title": "<titleBlock>Pack a Portable Charger</titleBlock>",
    "body": "<p>Keep phones and cameras powered all day.<br> - Download-heavy features like Genie+ drain batteries fast.<br> - FuelRod kiosks let you swap spent chargers for full ones.<br> - Bring an extra cable so friends can share the juice.</p>"
  },
  {
    "title": "<titleBlock>Use Rider Switch for Little Ones</titleBlock>",
    "body": "<p>Parents can still enjoy thrill rides without double‑waiting.<br> - Ask the Cast Member at the queue entrance to set it up.<br> - One adult rides while the other waits with the child, then swap.<br> - The second group usually boards through Lightning Lane or a shortened line.</p>"
  },
  {
    "title": "<titleBlock>Grab a Free Celebration Button</titleBlock>",
    "body": "<p>Mark birthdays, graduations, or “I’m Here!” with style.<br> - Pick one up at City Hall or most shop counters.<br> - Characters and Cast often give extra attention to button‑wearers.<br> - They make a fun, cost‑free souvenir.</p>"
  },
  {
    "title": "<titleBlock>Midday Chill in the Animation Building</titleBlock>",
    "body": "<p>DCA’s Animation Academy is AC heaven.<br> - Watch looping Disney clips on gigantic screens.<br> - Re‑energise while sketching a character in free art classes.<br> - Great place to escape heat or rain without leaving the park.</p>"
  },
  {
    "title": "<titleBlock>Visit Galaxy’s Edge After Dark</titleBlock>",
    "body": "<p>Batuu transforms once the suns set.<br> - Lightsabers and neon translate into incredible photos.<br> - Millennium Falcon: Smugglers Run often posts shorter waits.<br> - Nighttime atmosphere feels straight out of the movies.</p>"
  },
  {
    "title": "<titleBlock>Repeat Fantasyland Classics at Closing</titleBlock>",
    "body": "<p>Many families leave after fireworks.<br> - Lines for Alice in Wonderland, Mr. Toad, etc. shrink dramatically.<br> - If you’re in line one minute before official close, you ride.<br> - Perfect nostalgia‑filled finale to the day.</p>"
  },
  {
    "title": "<titleBlock>Swap FuelRods, Don’t Buy Twice</titleBlock>",
    "body": "<p>Already have a FuelRod from another trip?<br> - Kiosks in both parks exchange depleted rods for fresh ones free of charge.<br> - Saves luggage space and repeat purchases.<br> - Look for machines near locker rentals and large gift shops.</p>"
  },
  {
    "title": "<titleBlock>Rent a Locker Once, Access Anytime</titleBlock>",
    "body": "<p>Stash hoodies, merch, and snacks without carrying them.<br> - Lockers are inside each park and in the Esplanade (cheapest).<br> - In‑park lockers stay accessible until closing—even after stores shut.<br> - Re‑enter as often as you need.</p>"
  },
  {
    "title": "<titleBlock>Track Seasonal Food & Merch Drops</titleBlock>",
    "body": "<p>Limited‑time treats appear for almost every holiday.<br> - The Disneyland app and Disney Parks Blog post menus weekly.<br> - Mobile‑order high‑demand items (e.g., beignets) before they sell out.<br> - Great way to collect exclusive popcorn buckets and sippers.</p>"
  },
  {
    "title": "<titleBlock>Have a Rainy‑Day Game Plan</titleBlock>",
    "body": "<p>Wet forecasts can be a hidden blessing.<br> - Pack disposable ponchos and washable shoes.<br> - Indoor rides (Haunted Mansion, Space Mountain) stay open with short waits.<br> - Watch for rare “Rainy Day Cavalcade” character parade on Main Street.</p>"
  },
  {
    "title": "<titleBlock>Ride the Monorail at Midday</titleBlock>",
    "body": "<p>Give your legs a break without leaving Disney bubble.<br> - Board near Finding Nemo Submarine Voyage or Downtown Disney.<br> - The loop offers breezy views of Tomorrowland and the resort.<br> - Perfect quick escape when crowds peak after lunch.</p>"
  },
  {
    "title": "<titleBlock>Use Package Pick‑Up or Delivery</titleBlock>",
    "body": "<p>Don’t haul souvenirs all afternoon.<br> - Ask retail Cast Members to send purchases to the park exit for later pick‑up.<br> - Guests of on‑property hotels can have items delivered to bell services overnight.<br> - Keeps hands free for churros instead of shopping bags.</p>"
  },
  {
    "title": "<titleBlock>Catch the Daily Flag Retreat Ceremony</titleBlock>",
    "body": "<p>Main Street U.S.A. honours veterans every afternoon.<br> - Exact time posted on entertainment schedule (usually ~4 p.m.).<br> - Live band and color guard lower the American flag.<br> - Moving tradition that many visitors overlook.</p>"
  },
  {
    "title": "<titleBlock>Master Virtual Queues & Boarding Groups</titleBlock>",
    "body": "<p>New or high‑demand experiences may skip standby entirely.<br> - Join the queue in the app the moment it opens (typically 7 a.m. and/or noon).<br> - Enable push notifications and clock sync on your phone.<br> - Have everyone’s tickets linked in one account for fastest tap.</p>"
  },
  {
    "title": "<titleBlock>Dessert Party = Stress‑Free Fireworks</titleBlock>",
    "body": "<p>Reserve a Plaza Inn or Tomorrowland Terrace dessert package.<br> - Includes seated viewing and unlimited sweets.<br> - Worth the splurge if you dislike staking curb space hours early.<br> - Book exactly 60 days out—spots vanish quickly.</p>"
  }
];
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
      "title": "<titleBlock>Genie+ Tips</titleBlock>",
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

const advancedDisneylandTips = [
  {
    "title": "<titleBlock>Early‑Entry Power Half‑Hour</titleBlock>",
    "body": "<p>Hotel guests can knock out 5–6 rides before rope‑drop crowds arrive.<br> - Early Entry opens 30 min before the public.<br> - Only Fantasyland & Tomorrowland are accessible—plan a tight loop.<br> - Scan a room key or linked reservation at the Plaza Inn gate.</p>"
  },
  {
    "title": "<titleBlock>Know the Early‑Entry Rotation</titleBlock>",
    "body": "<p>The eligible park alternates by day—check the pattern to avoid surprises.<br> - DCA on Mon/Wed/Fri/Sun, Disneyland on Tue/Thu/Sat.<br> - Schedule breakfasts or lightning‑lane stacks in the other park.<br> - Update plans if the resort posts a special‑event change.</p>"
  },
  {
    "title": "<titleBlock>Front‑Row Rope‑Drop Tactics</titleBlock>",
    "body": "<p>Be through security by 6 : 45 a.m. to secure pole‑position.<br> - Gates usually crack open around 7 : 05–7 : 25 a.m.<br> - Line up on the curb nearest your target land to shave minutes.</p>"
  },
  {
    "title": "<titleBlock>Pick the Opposite Park on EE Days</titleBlock>",
    "body": "<p>If you don’t have Early Entry, rope‑drop the park that **doesn’t** offer it that morning.<br> - You’ll avoid 30 min of head‑starts on key rides.<br> - Lines stay shorter until about 10 a.m.<br> - Great strategy for single‑day tickets.</p>"
  },
  {
    "title": "<titleBlock>Fantasyland Blitz Order</titleBlock>",
    "body": "<p>Crush seven dark‑rides in one swoop during Early Entry.<br> - Hit Peter Pan → Alice → Dumbo → Mr Toad → Snow White → Pinocchio → Teacups.<br> - Pan builds a 20‑min queue within 5 min; go there first.<br> - Skip if Early Entry isn’t available that day.</p>"
  },
  {
    "title": "<titleBlock>Skip Indy’s Lightning Lane</titleBlock>",
    "body": "<p>The paid queue only bypasses the outdoor rope maze.<br> - If no crowd outside, standby is 20‑30 min.<br> - Book other attractions with your LL credits.<br> - Watch the exterior loop; if it’s empty, jump in.</p>"
  },
  {
    "title": "<titleBlock>Read the Jungle Cruise Balcony</titleBlock>",
    "body": "<p>Peek upstairs before committing.<br> - Guests flowing = ≤ 25 min. Posted‑up guests = long slog.<br> - Saves you from a surprise 45‑min wait.<br> - Re‑check later; the upstairs empties in cycles.</p>"
  },
  {
    "title": "<titleBlock>Runaway Railway Prop‑Room Math</titleBlock>",
    "body": "<p>Each of the four exhibit rooms = ~12 min.<br> - If you enter with only two rooms ahead, expect ~24 min total.<br> - Rarely tops 45 min all day.<br> - Great midday AC break.</p>"
  },
  {
    "title": "<titleBlock>Galaxy’s Edge After 10 p.m.</titleBlock>",
    "body": "<p>Batuu empties at night—perfect photo ops.<br> - Smugglers Run becomes a walk‑on; often solo cockpits.<br> - Rise typically closes earlier—plan it earlier.<br> - Bring a tripod for neon‑lit shots.</p>"
  },
  {
    "title": "<titleBlock>Single‑Rider Shortcuts</titleBlock>",
    "body": "<p>Go solo to slash waits on marquee rides.<br> - Offered on Smugglers Run, Space Mountain, Matterhorn & Incredicoaster.<br> - Perfect for repeat thrill seekers.<br> - Parties may reunite within minutes of each other.</p>"
  },
  {
    "title": "<titleBlock>Respect the Two‑Hour Rule</titleBlock>",
    "body": "<p>You can’t book another Lightning Lane until 2 h after the last reservation—or once you scan in.<br> - The cooldown starts at *park open* for pre‑8 a.m. bookings.<br> - Occasionally drops to 1 h; treat it as pixie‑dust bonus.</p>"
  },
  {
    "title": "<titleBlock>Modify, Don’t Cancel</titleBlock>",
    "body": "<p>Changing a Lightning Lane keeps your cooldown intact.<br> - Use “Modify” to shift times or swap attractions instead of cancelling.<br> - Great for dodging ride breakdowns.<br> - Refresh often—earlier slots pop up.</p>"
  },
  {
    "title": "<titleBlock>Stack Afternoon LLs</titleBlock>",
    "body": "<p>Book & bump return times into peak hours while you tour standby in the morning.<br> - By 1 : 30 p.m. you can hold 3‑4 passes for headliners.<br> - Take a hotel break, then burn the stack after 4 p.m.<br> - Works even better on multi‑day trips.</p>"
  },
  {
    "title": "<titleBlock>Watch for Elastic Queues</titleBlock>",
    "body": "<p>Lines stretch & shrink in predictable cycles.<br> - Demand drops, queue shrinks; posted wait then lures crowds back.<br> - Pirates’ 3,400 pph capacity eats lines fast.<br> - Time your walk‑up during a dip.</p>"
  },
  {
    "title": "<titleBlock>Park‑Hop After 11 a.m.</titleBlock>",
    "body": "<p>On Park‑Hopper tickets you can bounce once the clock strikes 11.<br> - Choose your “starting” park when you make the reservation.<br> - The esplanade hop is <5 min gate to gate.<br> - Skip the add‑on on 4‑day stays if you’re budget‑conscious.</p>"
  },
  {
    "title": "<titleBlock>Prime Breakfast Breaks</titleBlock>",
    "body": "<p>Fuel up while crowds surge.<br> - Jolly Holiday, Red Rose Taverne, or Market House are reliable a.m. stops.<br> - Mobile‑order to dodge the queue.<br> - Grab pastries to snack in standby lines.</p>"
  },
  {
    "title": "<titleBlock>Collect Monthly Park Maps</titleBlock>",
    "body": "<p>Pick up a map every visit—they change artwork monthly.<br> - Free, flat, and frame‑worthy.<br> - Handy for planning your next lightning‑lane sprint.</p>"
  },
  {
    "title": "<titleBlock>Link Your PhotoPass Code ASAP</titleBlock>",
    "body": "<p>Input on‑ride photo codes in the app before leaving the unload area.<br> - Saves the pic even if Wi‑Fi drops.<br> - Share the download with linked tickets.</p>"
  },
  {
    "title": "<titleBlock>Posted Wait Times Lag</titleBlock>",
    "body": "<p>High‑demand rides can rise 15 min while you walk there.<br> - Cross‑check with what you *see* at the entrance.<br> - Short standby spikes often mean LL merge is overloaded.</p>"
  },
  {
    "title": "<titleBlock>Use Your Hotel for Midday Recharge</titleBlock>",
    "body": "<p>On‑property rooms are a 5‑min stroll via private entrances.<br> - Quick naps prevent burnout during 12‑hour park days.<br> - Swim, change clothes, then ride the night wave.<br> - Early Entry + midday rest = marathon longevity.</p>"
  },

  /* ──────────  EXTRA 10  ────────── */

  {
    "title": "<titleBlock>Snipe Cancelled Lightning Lanes</titleBlock>",
    "body": "<p>Keep refreshing the LL menu—dropped slots flash open.<br> - Tap the ride, back out, then refresh for auto‑scroll.<br> - Confirm fast; others snap them up in seconds.<br> - Great during hotel breaks or parade lulls.</p>"
  },
  {
    "title": "<titleBlock>Save “Green” LLs for Gap Fillers</titleBlock>",
    "body": "<p>Buzz, Autopia and Star Tours rarely sell out.<br> - Book them only when you need a quick return.<br> - Don’t waste your stack or two‑hour timer.<br> - Use them to bridge time before a headliner.</p>"
  },
  {
    "title": "<titleBlock>Big Thunder ➜ Indy Rope‑Drop Trick</titleBlock>",
    "body": "<p>Hit Big Thunder first while crowds chase headliners.<br> - Wait dies on Indy ~30 min after open.<br> - You’ll beat the surge and ride both fast.<br> - Works even on Early‑Entry mornings.</p>"
  },
  {
    "title": "<titleBlock>Plan for Rise Downtime</titleBlock>",
    "body": "<p>Rise of the Resistance opens late or stalls often.<br> - Rope‑drop only if it’s showing “open” at gates.<br> - Have Smugglers Run or Tiana’s Bayou as backup.<br> - Queue’s 30‑40 min even first thing—budget the time.</p>"
  },
  {
    "title": "<titleBlock>Quiet Break: Grizzly River Run Path</titleBlock>",
    "body": "<p>Need shade and silence? Slip behind Grizzly River Run.<br> - Forested walkway with benches and mist fans.<br> - Perfect for stroller naps or snack resets.<br> - Re‑enter DCA crowds refreshed.</p>"
  },
  {
    "title": "<titleBlock>Tom Sawyer Island Midday Reset</titleBlock>",
    "body": "<p>Escape the hubbub without leaving Disneyland.<br> - Take the raft over, find a riverside seat.<br> - Kids can explore caves while adults rest.<br> - Cell signal is solid for planning your next LL.</p>"
  },
  {
    "title": "<titleBlock>Watch Pirates’ Elastic Queue</titleBlock>",
    "body": "<p>Capacity is 3,400 guests / hr—lines evaporate fast.<br> - If the courtyard is half‑full or less, jump in.<br> - Posted waits can drop by 15 min within one cycle.<br> - Skip LL here; standby often matches merge time.</p>"
  },
  {
    "title": "<titleBlock>Arrive 5 min Early for LL Scans</titleBlock>",
    "body": "<p>Cast Members allow entry 5 min before your slot.<br> - Scan at 8:55 for a 9:00 return, shaving precious minutes.<br> - Use overlap to chain two LLs back‑to‑back.<br> - Great during stacked afternoon runs.</p>"
  },
  {
    "title": "<titleBlock>Scan Everyone Before Booking</titleBlock>",
    "body": "<p>LL reservations only work for tickets already scanned in.<br> - Link every ticket in one account pre‑trip.<br> - Hold booking until the last person passes the gate.<br> - Prevents orphaned return times and re‑booking headaches.</p>"
  },
  {
    "title": "<titleBlock>Sunrise Riverboat & Columbia Hack</titleBlock>",
    "body": "<p>Jump on the Mark Twain or Sailing Ship Columbia at rope‑drop.<br> - Virtually empty decks = golden photos of Frontierland sunrise.<br> - Relaxing cruise while crowds stampede elsewhere.<br> - You’ll step off ready to tackle the west‑side headliners.</p>"
  }
];

  
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
setInterval(updateTip, 20000);

// Function to update the heading, image, and tips, based on the current location
function updateLocationDisplay(location) {
    var theme = "defaultTheme"
    updateTip()

    const DisneylandBackgrounds = [
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disneyland/gallery/disneyland-gallery02.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disneyland/gallery/disneyland-gallery10.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disneyland/gallery/disneyland-gallery11.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disneyland/gallery/disneyland-gallery20.jpg"
    ];
    
    const DCABackgrounds = [
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disney-california-adventure/gallery/disney-california-adventure-gallery20.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disney-california-adventure/gallery/disney-california-adventure-gallery21.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disney-california-adventure/gallery/disney-california-adventure-gallery26.jpg",
        "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1280/720/81/media/disneyparksjapan-prod/disneyparksjapan_v0001/1/media/dlr/videos/disney-california-adventure/gallery/disney-california-adventure-gallery00.jpg"
    ];

    // Preload images for both Disneyland and DCA backgrounds
    function preloadImages(imageArray) {
        return imageArray.map((url) => {
            const img = new Image();
            img.src = url;
            return img;
        });
    }

    // Preload images for each specific array
    const preloadedDisneylandBackgrounds = preloadImages(DisneylandBackgrounds);
    const preloadedDCABackgrounds = preloadImages(DCABackgrounds);

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

        rightTabs = document.querySelectorAll('.right');
        
        if (document.getElementById("randomBackground").checked == false) {
            const imagePath = `assets/backgrounds/${imagesArray[location]}`;
            infoContainer.style.backgroundImage = `url('${imagePath}')`;
            infoContainer.style.setProperty('--overlay-opacity', '0.0');
            infoContainer.style.setProperty('--accentColor', '#99b8df');
            infoContainer.style.setProperty('--accentLighter', '#dfeeff');
            infoContainer.style.setProperty('--accentOneofThem', '#cee4ff ');
            rightTabs.forEach(tab => {
                tab.style.backgroundColor = "rgba(8, 39, 80, 0.55)";
            });
        } else {
            const locations = ['Disneyland', 'DCA', 'Downtown', 'Hotel', 'Grand', 'Pixar'];
            const backgroundArrays = {
                'Disneyland': DisneylandBackgrounds,
                'Downtown': DisneylandBackgrounds,
                'Hotel': DisneylandBackgrounds,
                'DCA': DCABackgrounds,
                'Grand': DCABackgrounds,
                'Pixar': DCABackgrounds
            };
            
            const selectedArray = backgroundArrays[location];
            
     if (selectedArray && selectedArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * selectedArray.length);
        const randomImagePath = selectedArray[randomIndex];
        infoContainer.style.backgroundImage = `url('${randomImagePath}')`;
            
                infoContainer.style.setProperty('--accentColor', '#dedede');
                infoContainer.style.setProperty('--accentLighter', '#ffffff');
                infoContainer.style.setProperty('--accentOneofThem', '#f2f2f2');
                infoContainer.style.setProperty('--overlay-opacity', '0.5');
            
                rightTabs.forEach(tab => {
                    tab.style.backgroundColor = "rgba(0, 0, 0, 0.55)";
                });

            } else {
                console.error("Image array not found or is empty for the given location:", location);
            }
        }
    }
}

document.getElementById("randomBackground").addEventListener('change', function() {
    updateLocationDisplay(displayedLocation);
});
    
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
        getWeatherDescription(currentData.current.weathercode);
        const currentTemp = Math.ceil(currentData.current.temperature_2m);

        document.getElementById("currentWeather").textContent = useCelcius ? currentTemp + "°" : Math.round(currentTemp * 9 / 5 + 32) + "°";

    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

// went down a rabbit hole of WMO codes, theyre neat
//TODO: add lil icons to show the weather state
//TODO: add a "later" forecast section
function getWeatherDescription(wmoCode) {
    weatherIconCurrent = document.getElementById("weatherIconCurrent");
    switch (wmoCode) {
        case 1:
            weatherIconCurrent.src = "assets/weather/sun.svg";
            break;
        case 2:
            weatherIconCurrent.src = "assets/weather/suncloud.svg";
            break;
        case 3:
            weatherIconCurrent.src = "assets/weather/suncloud.svg";
            break;
        case 4:
            weatherIconCurrent.src = "assets/weather/cloud.svg";
            break;
        case 5:
            weatherIconCurrent.src = "assets/weather/cloud.svg";
            break;
        case 10:
            weatherIconCurrent.src = "assets/weather/rain.svg";
            break;
        case 21:
            weatherIconCurrent.src = "assets/weather/storm.svg";
            break;
        default:
            return 'Unknown';
    }
}

getWeather();

setInterval(getWeather, 1000*60*10)

document.getElementById("useCelcius").addEventListener('change', getWeather);



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
                    clearInterval(scrollInterval); // Stop the scrolling temporarily
                    setTimeout(() => {
                        scrollBox.scrollTop = 0; // Reset to top after delay
                        startScrolling(); // Restart scrolling
                    }, 2000); // Delay in milliseconds
                }
            }
        }, 50); // Adjust the speed by changing the interval (in ms)
    }    
    
    // Start the scrolling after a 2-second delay
    startScrolling();
});

// Check screen size on page load
window.onload = checkScreenSize;
window.onresize = checkScreenSize;

const parkInfo = document.getElementById('parkInfo');
const settings = document.getElementById('settings');
const audio = document.getElementById('audio');

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel.style.display === 'block') {
        parkInfo.style.display = 'block';
        panel.style.display = 'none';
    } else {
        settings.style.display = 'none';
        audio.style.display = 'none';
        parkInfo.style.display = 'none';
        panel.style.display = 'block';
    }
}

document.getElementById("settingsButton").addEventListener('click', function() {
    togglePanel("settings");
});
document.getElementById("audioButton").addEventListener('click', function() {
    togglePanel("audio");
});


pinnedAttractions = []

function populateWaitTimes(park) {
    const waitContainerParent = document.getElementById('hideAllWaits');
    const waitContainer = document.getElementById('waitContainer');
    const waitContainerPinned = document.getElementById('pinnedWaits');
    
    if (park === 'Disneyland') {
        parkId = "DisneylandResortMagicKingdom";
        parkEntityId = '7340550b-c14d-4def-80bb-acdb51d49a66'
    } else if (park === 'DCA') {
        parkId = "DisneylandResortCaliforniaAdventure";
        parkEntityId = '832fcd51-ea19-4e77-85c7-75d5843b127c'
    } else {
        console.log('Provided park is not Disneyland or DCA, fetching resort wait times instead.');

        // Fetch and process data for Hotel or Grand if applicable
        const url = 'https://api.themeparks.wiki/v1/entity/bfc89fd6-314d-44b4-b89e-df1a89cf991e/live';

        // hotel info fetch
        fetch(url)
            .then(response => response.json())
            .then(data => {
                waitContainer.innerHTML = '<h1>Hotel Restaurant Status</h1 style="padding-left:40px;">';
                let locations = [];

                if (park === "Hotel") {
                    locations = ["Goofy's Kitchen", "Trader Sam's Enchanted Tiki Bar"];
                } else if (park === "Grand") {
                    locations = ["Napa Rose", "Storytellers Cafe", "GCH Craftsman Bar"];
                } else if (park === "Pixar") {
                    locations = ["Palm Breeze Bar"]
                } else if (park === "Downtown") { 
                    console.log("No reported objects for Downtown Disney, skipping wait times.");
                } else {
                    console.error("Invalid park specified for hotel wait times.");
                    return;
                }

                locations.forEach(location => {
                    const item = data.liveData.find(item => item.name === location);

                    if (item) {
                        const status = item.status;
                        const backgroundColor = status === "OPERATING" ? 'rgba(100, 255, 100, 0.3)' :
                                              status === "DOWN" ? 'rgba(164, 91, 0, 0.3)' :
                                              status === "REFURBISHMENT" ? 'rgba(255, 80, 80, 0.3)' :
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
                        if(displayWaitParkClosed==false){waitContainerParent.style.display = "none";}else{waitContainerParent.style.display = "block";}
                    }else{waitContainerParent.style.display = "block";}
                });
            })
            .catch(error => {
                console.error('Error fetching or processing data:', error);
            });

        waitContainerParent.style.display = "none"; // Hide container if park is not supported
        return; // Exit function if park is not Disneyland or DCA
    }

    // First, check if the park is currently operating
    // Get current time in park's timezone (Pacific Time)
    const now = new Date();
    const parkTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const today = parkTime.toISOString().split("T")[0];
    
    fetch(`https://api.themeparks.wiki/v1/entity/${parkEntityId}/schedule`)
        .then(response => response.json())
        .then(scheduleData => {
            // Find today's operating schedule (in park's timezone)
            const todayOperating = scheduleData.schedule.find(entry => 
                entry.date === today && entry.type === "OPERATING"
            );

            if (!todayOperating) {
                // Park is not operating today
                waitContainer.innerHTML = '<h1>Park is Closed</h1 style="padding-left:40px;">';
                waitContainerParent.style.display = displayWaitParkClosed ? "block" : "none";
                return;
            }

            // Check if current time is within operating hours
            // API returns times with timezone info, so these will be correctly parsed
            const openingTime = new Date(todayOperating.openingTime);
            const closingTime = new Date(todayOperating.closingTime);
            
            // Compare using actual current time (not park time) since openingTime/closingTime are already timezone-aware
            if (now < openingTime || now > closingTime) {
                // Park is closed (outside operating hours)
                waitContainer.innerHTML = '<h1>Park is Closed</h1 style="padding-left:40px;">';
                waitContainerParent.style.display = displayWaitParkClosed ? "block" : "none";
                return;
            }

            // Park is open, proceed to fetch wait times
            fetchWaitTimes(parkEntityId, waitContainer, waitContainerPinned);
        })
        .catch(error => {
            console.error('Error checking park schedule:', error);
            // If schedule check fails, try to fetch wait times anyway
            fetchWaitTimes(parkEntityId, waitContainer, waitContainerPinned);
        });
}

// Separate function to handle wait time fetching
function fetchWaitTimes(parkEntityId, waitContainer, waitContainerPinned) {
    fetch(`https://api.themeparks.wiki/v1/entity/${parkEntityId}/live`)
        .then(response => response.json())
        .then(data => {
            waitContainer.innerHTML = '<h1>Live Wait Times</h1 style="padding-left:40px;">';
            waitContainerPinned.innerHTML= '<h3 class="pinnedTitle">Pinned Wait Times</h3 style="padding-left:40px;">'
            const pinnedTitle = document.querySelector('.pinnedTitle');

            let attractions = data.liveData;

            attractions.sort((a, b) => {
                // Function to get the wait time safely
                const getWaitTime = (attraction) => {
                    return attraction.queue?.STANDBY?.waitTime ?? null;
                };
            
                const waitTimeA = getWaitTime(a);
                const waitTimeB = getWaitTime(b);
            
                // Sort by waitTime descending (highest to lowest)
                if (waitTimeA !== null && waitTimeB !== null) {
                    return waitTimeB - waitTimeA;
                } else if (waitTimeA !== null) {
                    return -1; // a has waitTime, b does not, so a comes before b
                } else if (waitTimeB !== null) {
                    return 1; // b has waitTime, a does not, so b comes before a
                }
            
                // If waitTime is null for both, sort by status
                const statusOrder = {
                    "DOWN": 2,
                    "OPERATING": 1,
                    "REFURBISHMENT": 3,
                    "CLOSED": 4,
                    "null": 5  // null status comes last
                };
            
                const statusA = a.status ?? "null";
                const statusB = b.status ?? "null";
            
                return statusOrder[statusA] - statusOrder[statusB];
            });

            attractions.forEach(attraction => {
                var waitTime = (attraction.queue?.STANDBY?.waitTime === null || attraction.queue?.STANDBY?.waitTime === undefined)
                    ? (attraction.status === null || attraction.status === undefined ? "Unknown" : attraction.status)
                    : `${attraction.queue.STANDBY.waitTime} Minutes`;
        
                var backgroundColor = (attraction.queue?.BOARDING_GROUP && attraction.status === "OPERATING")
                ? 'rgba(192, 121, 199, 0.3)'  // Purple background for boarding group only if operating
                : (attraction.queue?.STANDBY?.waitTime === null || 
                    typeof attraction.queue?.STANDBY?.waitTime !== 'number' || 
                    isNaN(attraction.queue.STANDBY.waitTime))
                    ? (attraction.status === "OPERATING" ? 'rgba(100, 255, 100, 0.3)' 
                    : (attraction.status === "DOWN" ? 'rgba(164,91,0,0.3)' 
                    : (attraction.status === "REFURBISHMENT" ? 'rgba(255, 80, 80, 0.3)' 
                    : 'rgba(0, 0, 0, 0.4)'))) 
                    : getBackgroundColor(attraction.queue.STANDBY.waitTime);

                const attractionElement = document.createElement('div');
                let lightningLaneTime = '';

                //lightning lane logic
                if (attraction.queue?.RETURN_TIME?.returnStart !== undefined) {
                    if (attraction.queue.RETURN_TIME.returnStart === null) {
                        lightningLaneTime = 'Sold Out';
                    } else {
                        const returnTime = new Date(attraction.queue.RETURN_TIME.returnStart);
                        const options = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' };
                        const formattedTime = returnTime.toLocaleString('en-US', options);
                
                        lightningLaneTime = `${formattedTime}`;
                    }
                }

                //boarding group logic
                if (attraction.queue?.BOARDING_GROUP) {
                    const startGroup = attraction.queue.BOARDING_GROUP.currentGroupStart;
                    const endGroup = attraction.queue.BOARDING_GROUP.currentGroupEnd;

                    waitTime = `Boarding ${startGroup} to ${endGroup}`;
                
                    if (attraction.status === 'DOWN') {
                        backgroundColor = 'rgba(164,91,0,0.3)';
                        waitTime = 'DOWN';
                    } else if (attraction.status === 'CLOSED') {
                        backgroundColor = 'rgba(0, 0, 0, 0.4)';
                        waitTime = 'CLOSED';
                    }
                    else if (attraction.queue.BOARDING_GROUP.currentGroupStart == undefined){
                        backgroundColor = 'rgba(82, 59, 84,0.3)';
                        waitTime = 'Virtual Queue Closed';
                    }
                }
                
               if (waitTime.includes("Minutes") || displayClosed == true || waitTime.includes("DOWN") || waitTime.includes("Boarding")) {
                    attractionElement.classList.add('waitElement');

                    pinText="Toggle Pin"
                    attractionElement.innerHTML = `
                        <div class=pinText>${pinText}</div>
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
                                    // Function to add/remove pin
                    function togglePin() {
                        const isPinned = pinnedAttractions.some(pinned => pinned.name === attraction.name);

                        if (isPinned) {
                            // Remove attraction from pinned array
                            pinnedAttractions.splice(pinnedAttractions.findIndex(pinned => pinned.name === attraction.name), 1);
                            // Move the element back to the main container
                            waitContainerPinned.removeChild(attractionElement);
                            waitContainer.appendChild(attractionElement);

                            if (waitContainerPinned.children.length > 0) {
                                waitContainerPinned.style.display = 'block';
                            } else {
                                pinnedTitle.style.display = 'none';
                            }

                        } else {
                            // Add attraction to pinned array
                            pinnedAttractions.push(attraction);
                            // Move the element to the pinned container
                            waitContainer.removeChild(attractionElement);
                            waitContainerPinned.appendChild(attractionElement);

                            if (waitContainerPinned.children.length > 0) {
                                pinnedTitle.style.display = 'block';
                            } else {
                                pinnedTitle.style.display = 'none';
                            }
                        }
                    }

                    // Add click event to the pinText element
                    const pinTextElement = attractionElement.querySelector('.pinText');
                    pinTextElement.addEventListener('click', togglePin);

                    // Add the element to the appropriate container based on pinned status
                    if (pinnedAttractions.some(pinned => pinned.name === attraction.name) || (attraction.status === 'DOWN' && pinDownAttractions == true)) {
                        waitContainerPinned.appendChild(attractionElement);
                        pinnedTitle.style.display = 'block';
                    } else {
                        waitContainer.appendChild(attractionElement);
                    }
                }
            });

            document.getElementById('waitContainer').scrollTop=0;
            checkNone = document.getElementsByClassName('waitName')

            if (checkNone.length === 0) {
                waitContainer.innerHTML = '<h1>No Wait Times Available</h1 style="padding-left:40px;">';
                waitContainerParent.style.display = "block";
            } else {
                waitContainerParent.style.display = "block";
            }
        })
        .catch(error => {
            waitContainerParent.style.display = "block";
            console.error(error)
            waitContainer.innerHTML = '<h1>Wait time fetch failed!</h1 style="padding-left:40px;">'
        })
        
    document.getElementById('waitContainer').scrollTop=0;
}

async function fetchParkOpenTimes() {
    const disneylandAPI = 'https://api.themeparks.wiki/v1/entity/7340550b-c14d-4def-80bb-acdb51d49a66/schedule';
    const californiaAdventureAPI = 'https://api.themeparks.wiki/v1/entity/832fcd51-ea19-4e77-85c7-75d5843b127c/schedule';

    const [disneylandResponse, californiaResponse] = await Promise.all([
        fetch(disneylandAPI),
        fetch(californiaAdventureAPI)
    ]);

    const disneylandData = await disneylandResponse.json();
    const californiaData = await californiaResponse.json();

    const today = new Date().toISOString().split('T')[0];

    function updateParkTimes(parkData, openId, eeId) {
        const todaySchedules = parkData.schedule.filter(day => day.date === today);

        const operating = todaySchedules.find(entry => entry.type === "OPERATING");
        const earlyEntry = todaySchedules.find(entry => entry.type === "TICKETED_EVENT" && entry.description?.includes("Early Entry"));

        // Update regular opening hours
        if (operating) {
            document.getElementById(openId).textContent =
                formatTime(operating.openingTime) + ' - ' + formatTime(operating.closingTime);
        } else {
            document.getElementById(openId).textContent = '??:00 AM - ??:00 PM';
        }

        // Update early entry visibility
        const earlyEntryElement = document.getElementById(eeId);
        if (earlyEntry) {
            earlyEntryElement.textContent = 'Early Entry from ' + formatTime(earlyEntry.openingTime);
            earlyEntryElement.style.display = 'block';
        } else {
            earlyEntryElement.style.display = 'none';
        }
    }

    updateParkTimes(disneylandData, 'disneyOpenTimes', 'disneyEETimes');
    updateParkTimes(californiaData, 'californiaOpenTimes', 'californiaEETimes');
}


  function formatTime(dateTimeString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' };
    const time = new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    return time;
}

window.addEventListener('load', fetchParkOpenTimes);

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
    document.getElementById("pinDownAttractions").addEventListener("change", function() {
        populateWaitTimes(displayedLocation)})
})