import os
import openai
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key="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")  # or replace with your actual key: OpenAI(api_key="sk-...")

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
    model="gpt-3.5-turbo",
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
