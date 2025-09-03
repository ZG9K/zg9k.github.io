# -------------------- CONFIG --------------------
OPENAI_API_KEY = "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"
#1i
MODEL = "gpt-4o-mini"
# ------------------------------------------------


def talk_to_ai(system_prompt: str, user_prompt: str) -> str:
    """
    Sends a message to the AI with a system role and a user prompt.
    Returns the model's text output.
    """
    if not OPENAI_API_KEY:
        raise RuntimeError("No API key set. Add OPENAI_API_KEY to enable AI.")

    from openai import OpenAI
    client = OpenAI(api_key=OPENAI_API_KEY)

    resp = client.responses.create(
        model=MODEL,
        input=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.5,
        max_output_tokens=250,
    )
    return (resp.output_text or "").strip()


# -------------------- SCRIPT LOGIC --------------------

print("===== AI Study Buddy =====")
topic = input("Enter a topic (e.g., 'fractions', 'photosynthesis'): ").strip()

if not topic:
    print("No topic entered. Exiting.")
else:
    # Step 1: Generate a question
    sys_prompt = "You are a quiz bot for Years 7–9. Ask simple short-answer questions."
    user_prompt = f"Ask ONE clear short-answer question about the topic: {topic}."
    try:
        question = talk_to_ai(sys_prompt, user_prompt)
        print("\n🧠 Question:", question)
    except Exception:
        print("Could not generate a question (missing API key or network issue).")
        exit()

    # Step 2: Evaluate student's answer
    user_answer = input("Your answer: ").strip()
    sys_prompt = "You are a helpful tutor who fairly evaluates answers."
    user_prompt = f"""
Question: {question}
Student's Answer: {user_answer}

Decide if it is correct or incorrect.
"""
    try:
        feedback = talk_to_ai(sys_prompt, user_prompt)
        print("\n" + feedback)
    except Exception:
        print("\nEvaluation failed (API/network issue).")
