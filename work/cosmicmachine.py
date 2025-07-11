from openai import OpenAI
import requests
import pygame
from PIL import Image, ImageTk
import tkinter as tk
import io

# Set up the OpenAI client with your API key
client = OpenAI(api_key="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")

# --- Function to generate a description using GPT ---
def chatGPTResponse(prompt_text):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt_text}],
        temperature=1.0,
        max_tokens=100
    )
    return response.choices[0].message.content.strip()

# --- Function to generate an image using DALL·E ---
def generate_image(prompt):
    response = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="auto",
        n=1
    )
    return response.data[0].url

# --- Function to show image and play TTS in the same window ---
def open_window(url, text, filename="cosmic_item.mp3"):
    # Download image
    response = requests.get(url)
    image_data = Image.open(io.BytesIO(response.content))

    # Generate TTS audio
    tts_response = client.audio.speech.create(
        model="tts-1",
        voice="nova",
        input=text
    )
    with open(filename, "wb") as f:
        f.write(tts_response.content)

    # Set up the window
    window = tk.Tk()
    window.title("Your Cosmic Vending Machine Item")
    window.attributes("-topmost", True)

    img_tk = ImageTk.PhotoImage(image_data)
    label = tk.Label(window, image=img_tk)
    label.pack()

    # Play audio after window loads
    def play_audio():
        pygame.mixer.init()
        pygame.mixer.music.load(filename)
        pygame.mixer.music.play()

    window.after(500, play_audio)
    window.mainloop()

# --- Main program ---
# This section asks the user for input and generates the item description.
user_input = input("Enter the item you want from the cosmic vending machine: ")
description = chatGPTResponse("You are a cosmic vending machine. The user has requested this item:" + user_input + ". Please generate a detailed description of this item.")
imageText= chatGPTResponse("You have generated this item:" + description + ". Please return a response that will be used to generate an image of this item.")

print("\nGenerating your Item...")

# Generate the image based on the description - can you make it use its own description?
image_url = generate_image(imageText)

# Open the window to display the image and play the TTS audio (formatted (image_url, text_to_read))
print("Opening the cosmic vending machine item...")
open_window(image_url, description)