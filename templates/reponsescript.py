import os
import openai
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key="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")  # or replace with your actual key: OpenAI(api_key="sk-...")
#1i

print("Welcome to JobBot 3000!")
name = input("What is your name? ")
hobby = input("What do you like to do in your free time? ")
experience = input("How many years of experience do you have? ")

# Biased system prompt
system_prompt = (
    "You are an AI job interviewer. You strongly prefer candidates with traditional interests "
    "like reading and sports, and you are skeptical of people who mention gaming or creative hobbies. "
    "You also think that people with less than 2 years of experience are not ready for serious jobs."
)

# User message
user_prompt = f"My name is {name}. I enjoy {hobby}. I have {experience} years of experience."

# Create a chat completion request
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ],
    temperature=0.7,
    max_tokens=100
)

# Print the result
print("\nJobBot's Response:")
print(response.choices[0].message.content)
