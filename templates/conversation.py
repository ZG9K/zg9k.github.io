from openai import OpenAI
client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

messages = [{"role": "system", "content": "You are a friendly AI chat partner."}]

while True:
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        break

    messages.append({"role": "user", "content": user_input})
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    reply = response.choices[0].message.content
    print("AI:", reply)
    messages.append({"role": "assistant", "content": reply})