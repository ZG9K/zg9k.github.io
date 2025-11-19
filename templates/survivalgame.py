from openai import OpenAI
# Initialize the OpenAI client
client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# --- Step 1: User chooses scenario type ---
scenario_type = input("Choose a scenario type (e.g., jungle, space, zombies): ")

# --- Step 2: AI generates the scenario ---
scenario_prompt = f"""
Create a short, classroom-friendly survival scenario based on this theme:

Theme: {scenario_type}

Rules:
- 2–4 sentences.
- Clearly describe the danger.
- Do NOT include solutions.
- End with: "What do you do?"
"""

scenario_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": scenario_prompt}
    ]
)

scenario_text = scenario_response.choices[0].message.content

print("\nSCENARIO:")
print(scenario_text)

# --- Step 3: User explains how they survive ---
user_action = input("\nHow do you try to survive? ")

# --- Step 4: AI evaluates the outcome ---
outcome_prompt = f"""
Here is a survival scenario:

{scenario_text}

Here is how the player tries to survive:

"{user_action}"

Your job:
- Explain what happens next.
- Say whether their action succeeds or fails.
- Keep it light, fun, and safe.
- 2–4 sentences.
- End with "Your move."
"""

outcome_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": outcome_prompt}
    ]
)

outcome_text = outcome_response.choices[0].message.content

print("\nOUTCOME:")
print(outcome_text)
