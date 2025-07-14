import openai

# Generate image
response = client.images.generate(
    model="dall-e-3",  # or "dall-e-2"
    prompt="A cozy bookstore in the forest with fairy lights and a cat sleeping on a windowsill",
    n=1,
    size="1024x1024"
)

# Get and print image URL
image_url = response.data[0].url
print("Generated image URL:", image_url)
