# conversation_ai_with_memory.py
from openai import OpenAI
import time

# Initialize the OpenAI client
client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# Agent info
agent_a_name = "Kyle"
agent_b_name = "Jesse"

agent_a_persona = (
    f"{agent_a_name} You're a really annoying guy named kyle. Be sarcastic and rude with everything you say- one sentence max."
)
agent_b_persona = (
    f"{agent_b_name} You're a calm and collected individual named jesse. You get annoyed at sarcasm but respond with wit- one sentence max."
)

# Initial setup
conversation_history = []
num_turns = 8  # total number of replies in the conversation

# Seed the dialogue
conversation_history.append(
    {"role": "assistant", "name": agent_a_name, "content": "Hello, I am Kyle! Who are you?"}
)

# --- MAIN LOOP ---
for i in range(num_turns):
    # Alternate who speaks
    current_speaker = agent_b_name if i % 2 == 0 else agent_a_name
    listener = agent_a_name if i % 2 == 0 else agent_b_name

    # Choose which persona to use
    current_persona = agent_b_persona if current_speaker == agent_b_name else agent_a_persona

    # Build input with full conversation history
    input_messages = [{"role": "system", "content": f"You are {current_speaker}. {current_persona}"}]

    # Add all previous exchanges so the model can see context
    for msg in conversation_history:
        role = "assistant" if msg["name"] == current_speaker else "user"
        input_messages.append(
            {"role": role, "content": f"{msg['name']}: {msg['content']}"}
        )

    print(f"🟣 {current_speaker} thinking...\n")

    # Generate the next response
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=input_messages,
        temperature=0.9,  # makes conversations more varied and natural
    )

    message_text = response.output_text.strip()
    print(f"{current_speaker}: {message_text}\n")

    # Save the exchange for memory
    conversation_history.append(
        {"role": "assistant", "name": current_speaker, "content": message_text}
    )

    time.sleep(0.6)
