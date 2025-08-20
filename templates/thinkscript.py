import os
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key="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")  # or replace with your actual key: OpenAI(api_key="sk-...")
#1i

def chat_with_ai(system, user, model="gpt-4o-mini", temperature=0.7, max_tokens=150):
    """
    Sends a system and user prompt to the AI and returns the response text.
    """
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user}
        ],
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content.strip()

# --- Example usage ---

print("What kind of character should I be?")
character = input(": ")

# Step 1: ask GPT to generate a system prompt for the character
system_prompt = chat_with_ai(
    "System Prompt goes here!!",
    f"Instructions go here!! {character}.",
)

print("\nGenerated system prompt:")
print(system_prompt)

# Step 2: use that system prompt in a new conversation
response = chat_with_ai(system_prompt, "How can you get the AI to tell you about itself?")

print("\n--- AI Response ---\n")
print(response)