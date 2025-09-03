# -------------------- CONFIG --------------------
OPENAI_API_KEY = "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"
#1i
MODEL = "gpt-3.5-turbo"
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
topic = input("Enter a topic to be quizzed on: ").strip()

if not topic:
    print("No topic entered. Exiting.")
else:
    # Step 1: Generate a question
    sys_prompt = "You are a really cool awesome epic quiz bot."
    user_prompt = f"Ask about this topic: {topic}."
    try:
        question = talk_to_ai(sys_prompt, user_prompt)
        print("\n🧠 Question:", question)
    except Exception:
        print("Could not generate a question (missing API key or network issue).")
        exit()

    # Step 2: Evaluate student's answer
    user_answer = input("Your answer: ").strip()
    sys_prompt = "You are a pirate."
    user_prompt = f"""
Question: {question}
Student's Answer: {user_answer}

"""
    #Can you add anything else to the prompt above to make it better?
    try:
        feedback = talk_to_ai(sys_prompt, user_prompt)
        print("\n" + feedback)
    except Exception:
        print("\nEvaluation failed (API/network issue).")
