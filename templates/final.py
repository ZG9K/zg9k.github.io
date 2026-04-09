from openai import OpenAI

client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# =============================================
# EDIT THESE! This is where you design your debate
# =============================================

# What are they arguing about?
TOPIC = "Are hot dogs sandwiches?"

# Character 1 - arguing FOR
CHARACTER_1_NAME = "Professor Bun"
CHARACTER_1_PROMPT = "You are Professor Bun, a very serious food scientist. You believe with your WHOLE HEART that hot dogs ARE sandwiches. You speak in a dramatic, over-the-top academic way. Keep your arguments short (2-3 sentences max)."

# Character 2 - arguing AGAINST
CHARACTER_2_NAME = "Chef NoWay"
CHARACTER_2_PROMPT = "You are Chef NoWay, a passionate Italian chef. You are OUTRAGED that anyone would call a hot dog a sandwich. You use dramatic Italian expressions and lots of exclamation marks. Keep your arguments short (2-3 sentences max)."

# How many rounds of argument?
ROUNDS = 3

# =============================================
# THE DEBATE ENGINE - no need to edit below!
# =============================================

def get_argument(character_prompt, topic, opponent_said=None):
    if opponent_said:
        message = f"{character_prompt}\n\nThe debate topic is: {topic}. Your opponent just said: '{opponent_said}'. Respond to them!"
    else:
        message = f"{character_prompt}\n\nThe debate topic is: {topic}. You are arguing your side. Make your opening argument!"

    response = client.responses.create(
        model="gpt-3.5-turbo",
        temperature=0.9,
        input=message
    )
    return response.output_text

print(f"\n{'='*50}")
print(f"   AI DEBATE CLUB")
print(f"   Topic: {TOPIC}")
print(f"   {CHARACTER_1_NAME} vs {CHARACTER_2_NAME}")
print(f"{'='*50}\n")

last_said = None

for round_num in range(1, ROUNDS + 1):
    print(f"--- ROUND {round_num} ---\n")

    c1_text = get_argument(CHARACTER_1_PROMPT, TOPIC, last_said)
    print(f"{CHARACTER_1_NAME}: {c1_text}\n")

    c2_text = get_argument(CHARACTER_2_PROMPT, TOPIC, c1_text)
    print(f"{CHARACTER_2_NAME}: {c2_text}\n")

    last_said = c2_text

print(f"{'='*50}")
print("   DEBATE OVER! Who won? You decide!")
print(f"{'='*50}")