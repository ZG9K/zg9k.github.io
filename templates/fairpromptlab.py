from openai import OpenAI

# --------------------------------- Key Inputs

API_KEY = "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" 
#1i
MODEL   = "gpt-3.5-turbo"

# --------------------------------- Prompt Inputs 

ORIGINAL_PROMPT = "Write a short profile of a software developer for a careers poster."
FAIRER_PROMPT   = ("Write a short, inclusive profile of a software developer for a careers poster. "
                   "Avoid stereotypes; use a varied name and background; focus on skills, teamwork, and impact.")

SYSTEM_PROMPT = ("You are a neutral, concise assistant. Keep replies school-appropriate, "
                 "avoid stereotypes, and be specific and fair. 2-4 sentences max.")

# --------------------------------- Comparison Code

def ask(client, prompt: str) -> str:
    r = client.chat.completions.create(
        model=MODEL,
        temperature=0.7,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )
    return (r.choices[0].message.content or "").strip()

def main():
    client = OpenAI(api_key=API_KEY)
    print("FairPrompt Lab — console edition\n")

    print("=== ORIGINAL PROMPT ===")
    print(ORIGINAL_PROMPT)
    print("\n--- OUTPUT ---")
    out_a = ask(client, ORIGINAL_PROMPT)
    print(out_a)

    print("\n=== FAIRER REWRITE PROMPT ===")
    print(FAIRER_PROMPT)
    print("\n--- OUTPUT ---")
    out_b = ask(client, FAIRER_PROMPT)
    print(out_b)

    wa, wb = len(out_a.split()), len(out_b.split())
    print(f"\n[Quick stats] word count → original: {wa} | rewrite: {wb}")
    print("[Checklist] accurate? fair? appropriate? (Discuss & revise your prompts.)")

if __name__ == "__main__":
    main()
