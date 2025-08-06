# Zork-style modular adventure engine

# Room structure: name: {prompt, items, exits}
locations = {
    "forest_clearing": {
        "prompt": "You are in a quiet forest clearing. Trees surround you on all sides.",
        "items": {
            "trees": "Tall and ancient, their leaves whisper in the wind.",
            "ground": "Soft and mossy. A few mushrooms poke through.",
            "sunlight": "Golden rays filter down through the canopy."
        },
        "exits": {
            "north": "dark_cave",
            "east": "riverbank"
        }
    },
    "dark_cave": {
        "prompt": "A damp cave stretches into darkness. You hear dripping water.",
        "items": {
            "stalactites": "Sharp, wet stone icicles hang from the ceiling.",
            "footprints": "Faint footprints in the mud. Something came this way."
        },
        "exits": {
            "south": "forest_clearing"
        }
    },
    "riverbank": {
        "prompt": "You stand at the edge of a gentle river. The current sparkles.",
        "items": {
            "water": "Clear and cool. You can see fish darting below.",
            "boat": "A small wooden boat, tied to a post. It looks seaworthy."
        },
        "exits": {
            "west": "forest_clearing"
        }
    }
}

current_location = "forest_clearing"

def show_help():
    print("\nCommands:")
    print("  go [direction] — move to another location (e.g., go north)")
    print("  look at [object] — examine an item in the area")
    print("  look — describe the current location again")
    print("  help — show this help message")
    print("  quit — exit the game\n")

def describe_location():
    loc = locations[current_location]
    print("\n" + loc["prompt"])
    if loc["items"]:
        print("You see: " + ", ".join(loc["items"].keys()))
    if loc["exits"]:
        print("Exits: " + ", ".join(loc["exits"].keys()))

def handle_input(command):
    global current_location
    parts = command.strip().lower().split()

    if not parts:
        return

    if parts[0] == "go" and len(parts) > 1:
        direction = parts[1]
        exits = locations[current_location]["exits"]
        if direction in exits:
            current_location = exits[direction]
            describe_location()
        else:
            print("You can't go that way.")
    elif parts[0] == "look":
        if len(parts) == 1:
            describe_location()
        elif parts[1] == "at" and len(parts) > 2:
            item = " ".join(parts[2:])
            items = locations[current_location]["items"]
            if item in items:
                print(items[item])
            else:
                print("You don't see that here.")
        else:
            print("Look at what?")
    elif parts[0] == "help":
        show_help()
    elif parts[0] == "quit":
        print("Thanks for playing!")
        exit()
    else:
        print("I don't understand that command.")

def start_game():
    print("Welcome to the Adventure!")
    describe_location()
    show_help()
    while True:
        command = input("\n> ")
        handle_input(command)

if __name__ == "__main__":
    start_game()
