from openai import OpenAI

client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33

# Step 1: Ask what the question should be about
topic = input("What topic do you want your question to be about? ")

# Step 2: Ask the AI to make a question
question_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a teacher who writes short quiz questions. Put the answer after questions in this format: `Answer: <answer>`."},
        {"role": "user", "content": f"Write one simple quiz question about {topic}."}
    ]
)

question = question_response.choices[0].message.content
print("\nQuestion:", question)

# Step 3: Get the user’s answer
user_answer = input("\nYour answer: ")

# Step 4: Ask the AI if the answer is correct
check_response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a teacher who checks quiz answers."},
        {"role": "user", "content": f"Question: {question}\nStudent's answer: {user_answer}\nSay if it's correct or not, and give a short explanation."}
    ]
)

print("\nAI Feedback:", check_response.choices[0].message.content)
