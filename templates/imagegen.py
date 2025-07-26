import openai

# Set your API key
client = openai.OpenAI(api_key="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")

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
