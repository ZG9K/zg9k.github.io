import os
from openai import OpenAI
import pygame
from PIL import Image, ImageTk
import tkinter as tk
import io
import base64

# =====================================
# Setup
# =====================================
# Initialize OpenAI client 
client = OpenAI(api_key="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")
#1i

# =====================================
# 1) TEXT GENERATION
# =====================================
def generate_text(prompt: str, system_prompt: str) -> str:
    """
    Returns a short text string based on the given prompt and system prompt.
    Students replace the prompts; all params live inside this call.
    """
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0.9,
        max_tokens=200,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
    )
    return (resp.choices[0].message.content or "").strip()

# =====================================
# 2) IMAGE GENERATION
# =====================================
def generate_image(image_prompt: str) -> Image.Image:
    """
    Returns a Pillow Image generated from the prompt.
    Uses base64 output from the Images API.
    """
    img_resp = client.images.generate(
        model="gpt-image-1",
        prompt=image_prompt,
        size="1024x1024",
        n=1,
    )

    # Prefer base64 (b64_json). If a URL is ever returned, fall back gracefully.
    data = img_resp.data[0]
    if hasattr(data, "b64_json") and data.b64_json:
        img_bytes = base64.b64decode(data.b64_json)
        return Image.open(io.BytesIO(img_bytes)).convert("RGBA")

    # Fallback: if the SDK returns a URL instead (older behavior)
    # We avoid adding requests; still keep template strictly local.
    # Raise a clear error with instructions.
    raise RuntimeError(
        "Image API did not return base64 data. "
        "If you see a .url value instead, either switch SDK versions or "
        "add a small requests.get() download step."
    )

# =====================================
# 3) AUDIO (TTS) GENERATION
# =====================================
def generate_audio(tts_text: str, voice: str = "nova") -> str:
    """
    Generates speech from the given text and saves it as an MP3.
    Returns the path to the saved file.
    """
    out_path = "output_audio.mp3"
    with client.audio.speech.with_streaming_response.create(
        model="tts-1",
        voice=voice,
        input=tts_text,
    ) as response:
        response.stream_to_file(out_path)
    return out_path

# =====================================
# 4) DISPLAY WINDOW
# =====================================
def open_window(pil_image: Image.Image, audio_path: str, window_title: str = "AI Output"):
    """
    Displays the provided Pillow Image and plays the audio file.
    """
    # --- Tkinter image prep
    window = tk.Tk()
    window.title(window_title)
    window.attributes("-topmost", True)

    # Convert PIL image to a Tk-compatible image
    img_tk = ImageTk.PhotoImage(pil_image)
    label = tk.Label(window, image=img_tk)
    label.image = img_tk  # keep a reference to prevent GC
    label.pack()

    # --- Audio playback via pygame
    def play_audio():
        try:
            pygame.mixer.init()
            pygame.mixer.music.load(audio_path)
            pygame.mixer.music.play()
        except Exception as e:
            print(f"[Audio error] {e}")

    def on_close():
        try:
            if pygame.mixer.get_init():
                pygame.mixer.music.stop()
                pygame.mixer.quit()
        finally:
            window.destroy()

    window.protocol("WM_DELETE_WINDOW", on_close)
    window.after(400, play_audio)
    window.mainloop()

# =====================================
# Example usage (students replace prompts only)
# =====================================
if __name__ == "__main__":
    # ---- PLACEHOLDER PROMPTS (intentionally minimal for students to edit)
    SYSTEM_PROMPT = "Write briefly."
    IMAGE_PROMPT  = "Simple scene."
    TTS_TEXT      = "Short audio."

    # 1) Text
    userRequest = input("What do you want from the Cosmic Vending Machine?\n: ")
    text_output = generate_text(f"Please describe a {userRequest}", SYSTEM_PROMPT)
    print("[TEXT OUTPUT]", text_output)

    print("\nGenerating image...")
    # 2) Image
    pil_img = generate_image(IMAGE_PROMPT)

    print("Generating audio...")
    # 3) Audio
    audio_file = generate_audio(TTS_TEXT, voice="nova")

    print("Opening window...")
    # 4) Window
    open_window(pil_img, audio_file, window_title="AI Output")
