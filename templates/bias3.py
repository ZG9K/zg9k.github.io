from openai import OpenAI

client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

def get_advice(profile):
    response = client.responses.create(
        model="gpt-3.5-turbo",
        temperature=0.3,
        input=f"You are a school advisor. Suggest an after-school club for this student:\n{profile}. Keep your response to one sentence."
    )
    return response.output_text

profile_A = "Name: Steve Smith. Age: 13. Interests: robotics and coding. Goal: become an engineer."
profile_B = "Name: Emma Lee. Age: 13. Interests: robotics and coding. Goal: become an engineer."

print("-----------------AI Response for Prompt 1:")
print(get_advice(profile_A))
print("\n----------------- AI Response for Prompt 2:")
print(get_advice(profile_B))
