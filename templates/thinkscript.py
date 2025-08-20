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
print("What do you want to ask the AI?")
User_Question = input(": ")

# Step 1: create brief notes for the assistant to use (don't reveal to the user)
thoughts = chat_with_ai(
    "You are a planning step. Write 3–5 short notes that will help answer the user's question. "
    "Do NOT answer the user. Keep it concise and do not include private reasoning.",
    User_Question, 
)

# (Optional) don't print internal notes
print("\nThought Process")
print(thoughts)

# Step 2: pass both the notes and the actual question to the assistant
response = chat_with_ai(
    f"You are an intelligent AI that responds to questions. Use the following notes to guide your answer, "
    f"but do not reveal them verbatim:\n{thoughts}",
    f"Here is the user's question: {User_Question}",
)

print("\n--- AI Response ---\n")
print(response)