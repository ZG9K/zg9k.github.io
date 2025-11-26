import openai
import base64
from tkinter import Tk, Label
from PIL import Image, ImageTk
import io

# Start OpenAI client
from openai import OpenAI
client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# Function to rewrite prompt
def rewrite_prompt(original_prompt):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "Rewrite the user's prompt to be clearer, more descriptive, and more visually specific."},
            {"role": "user", "content": original_prompt}
        ]
    )
    return response.choices[0].message.content


# Function to generate image
def generate_image(prompt):
    img_response = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="1024x1024"
    )

    # Extract base64 image data
    img_base64 = img_response.data[0].b64_json
    img_bytes = base64.b64decode(img_base64)

    return img_bytes

# Function to display image using Tkinter
def display_image(image_bytes):
    root = Tk()
    root.title("Generated Image")

    # Convert bytes → PIL Image → Tkinter Image
    img = Image.open(io.BytesIO(image_bytes))
    tk_img = ImageTk.PhotoImage(img)

    label = Label(root, image=tk_img)
    label.pack()

    root.mainloop()

# Run the process
if __name__ == "__main__":
    user_prompt = input("Enter your image prompt: ")

    print("\nRewriting your prompt...")
    rewritten = rewrite_prompt(user_prompt)
    print("Rewritten Prompt:", rewritten, "\n")

    print("Generating image...")
    img_bytes = generate_image(rewritten)

    print("Opening image window...")
    display_image(img_bytes)
