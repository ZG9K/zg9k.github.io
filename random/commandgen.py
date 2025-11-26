# First set parameters
first_x1, first_y1, first_z1 = -89, -22, -62
first_x2, first_y2, first_z2 = -59, -5, -85
dest_x, dest_y, dest_z = -14, 4, -25

# Dimensions and gaps
x_size = 31  # Width
y_size = 18  # Height (-22 to -5 is 17 blocks, so 18 blocks tall)
z_size = 24  # Depth
x_gap = 6
z_gap = 14
y_gap = 3

# Generate AHK script
ahk_script = []
ahk_script.append("; AutoHotkey Script to generate command blocks")
ahk_script.append("; Press F1 to start")
ahk_script.append("")
ahk_script.append("#NoEnv")
ahk_script.append("SetKeyDelay, 0, 0")
ahk_script.append("SetBatchLines, -1")
ahk_script.append("")
ahk_script.append("F1::")

command_number = 1

for layer in range(3):
    for row in range(5):
        for col in range(5):
            # Calculate offsets
            x_offset = col * (x_size + x_gap)
            y_offset = layer * (y_size + y_gap)
            z_offset = row * (z_size + z_gap)
            
            # Calculate coordinates for this set
            x1 = first_x1 + x_offset
            x2 = first_x2 + x_offset
            y1 = first_y1 + y_offset
            y2 = first_y2 + y_offset
            z1 = first_z1 + z_offset
            z2 = first_z2 + z_offset
            
            clone_command = f"clone {x1} {y1} {z1} {x2} {y2} {z2} {dest_x} {dest_y} {dest_z}"
            
            # Don't escape braces - use SendRaw instead
            cmd1 = f"setblock ~{command_number} ~-1 ~1 command_block[facing=south]{{Command:\"{clone_command}\"}}"
            cmd2 = f"setblock ~{command_number} ~-1 ~2 chain_command_block[facing=south,conditional=true]{{Command:\"/title @a[tag=techbooth] actionbar \\\"Set {command_number} Loaded\\\"\"}}"
            
            # Add to AHK script - use SendRaw for commands with braces
            ahk_script.append(f"Sleep 100")
            ahk_script.append(f"SendRaw /")
            ahk_script.append(f"Sleep 50")
            ahk_script.append(f"SendRaw {cmd1}")
            ahk_script.append(f"Sleep 50")
            ahk_script.append(f"Send {{Enter}}")
            ahk_script.append(f"Sleep 100")
            ahk_script.append(f"SendRaw /")
            ahk_script.append(f"Sleep 50")
            ahk_script.append(f"SendRaw {cmd2}")
            ahk_script.append(f"Sleep 50")
            ahk_script.append(f"Send {{Enter}}")
            ahk_script.append(f"Sleep 100")
            
            command_number += 1

ahk_script.append("return")

# Write to file
with open("minecraft_commands.ahk", "w") as f:
    f.write("\n".join(ahk_script))

print("AHK script generated: minecraft_commands.ahk")
print(f"Total sets: {command_number - 1}")