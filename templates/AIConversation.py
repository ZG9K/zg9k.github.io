# conversation_ai.py
from openai import OpenAI
import time

client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# Agent personalities
agent_a_name = "Lyra"
agent_b_name = "Orion"

agent_a_persona = (
    f"{agent_a_name} is a introspective AI who speaks thoughtfully."
)
agent_b_persona = (
    f"{agent_b_name} is a logical AI who likes to analyze ideas and ask questions. Keep your responses to one sentence. Do your best to ask a question back."
)

# Conversation seed
conversation = [
    {"role": "system", "content": f"You are {agent_a_name}. {agent_a_persona}"},
    {"role": "assistant", "content": f"Hello, I am {agent_a_name}. Who are you?"},
    {"role": "system", "content": f"You are {agent_b_name}. {agent_b_persona}"},
]

# Initial message for Agent B to respond to
last_message = "Hello, I am Lyra. Who are you?"

# Number of turns to simulate
num_turns = 200

for i in range(num_turns):
    # Determine which agent is speaking
    speaker = agent_b_name if i % 2 == 0 else agent_a_name
    listener = agent_a_name if i % 2 == 0 else agent_b_name

    # Construct prompt
    system_prompt = (
        agent_b_persona if speaker == agent_b_name else agent_a_persona
    )
    print(f"\n🟣 {speaker} thinking...\n")

    # Generate response
    response = client.responses.create(
        model="gpt-3.5-turbo",
        input=[
            {"role": "system", "content": f"You are {speaker}. {system_prompt}"},
            {"role": "user", "content": f"{listener} said: {last_message}"},
        ],
    )

    # Extract message
    message = response.output_text.strip()
    print(f"{speaker}: {message}\n")

    # Prepare next input
    last_message = message
    time.sleep(1.5)
