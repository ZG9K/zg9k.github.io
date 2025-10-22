import os
import re
import random
import asyncio
from dotenv import load_dotenv

import discord
from discord.ext import commands
from openai import OpenAI

load_dotenv()

DISCORD_TOKEN = "key"
OPENAI_API_KEY = "key"

BOT_PERSONA_NAME = "Larry the Clown"

ERROR_LINES = [
    "The clown car lost a wheel mid-reply. Give me another go!",
    "The tightrope wobbled—response slipped! Try again in a sec.",
    "The lion tamer is negotiating with the API. One moment, then retry!",
    "Ticket stub not scanning right now. Let’s run the act again!",
    "The ringmaster dropped the cue cards. Could you repeat that?",
    "Drumroll… broke. I’ll fetch a new snare—try once more!",
    "A balloon popped over the network. Retrying might fix it!",
    "Carousel stuck on loading. Nudge me with the same message!",
    "The announcer lost the mic. Let’s take it from the top!",
    "Juggled one too many requests—missed! Ping me again.",
    "The trapeze rope (connection) snapped. Quick reset and retry!",
    "Card trick failed the reveal—give me a second chance!",
    "Spilled popcorn in the control booth. Another attempt should do it.",
    "The finale fizzled. Let’s re-light the fuse—try again!",
    "Calliope wheezed out mid-note. Prompt me once more!",
    "Stagehand tripped on a cable. We’ll be right back—retry!",
    "The clown key slipped under the stage. One more ping, please!",
    "Ferris wheel paused at the top—jog it with another message!",
]

def pick_error() -> str:
    return random.choice(ERROR_LINES)

intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = False
intents.messages = True
intents.dm_messages = True

bot = commands.Bot(command_prefix=commands.when_mentioned, intents=intents)

# OpenAI client
oa = OpenAI(api_key=OPENAI_API_KEY)

def chunk(text: str, size: int = 1900):
    """Split long text to stay under Discord's 2000-char limit."""
    parts = []
    i = 0
    while i < len(text):
        parts.append(text[i:i + size])
        i += size
    return parts

def strip_bot_mention(content: str, bot_id: int) -> str:
    """Remove the bot mention from the start/middle of the message."""
    patterns = [
        rf"<@{bot_id}>",
        rf"<@!{bot_id}>",
    ]
    cleaned = content
    for p in patterns:
        cleaned = re.sub(p, "", cleaned)
    return cleaned.strip()

async def is_addressed_to_bot(message: discord.Message) -> bool:
    """Mention, reply to bot, or DM."""
    if message.author.bot:
        return False
    if isinstance(message.channel, (discord.DMChannel, discord.GroupChannel)):
        return True
    if bot.user and bot.user.mentioned_in(message):
        return True
    if message.reference and message.reference.message_id:
        try:
            ref = await message.channel.fetch_message(message.reference.message_id)
            if ref.author.id == bot.user.id:
                return True
        except discord.NotFound:
            pass
    return False

@bot.event
async def on_ready():
    print(f"✅ Logged in as {bot.user} (id: {bot.user.id})")
    await bot.change_presence(
        activity=discord.Game(name="the main ring 🎪"),
        status=discord.Status.online
    )

@bot.event
async def on_message(message: discord.Message):
    await bot.process_commands(message)
    if not await is_addressed_to_bot(message):
        return

    # Build prompt
    if bot.user and bot.user.mentioned_in(message):
        prompt = strip_bot_mention(message.content or "", bot.user.id)
    else:
        prompt = (message.content or "").strip()
    if not prompt:
        prompt = "(no prompt text provided)"

    # Prepare OpenAI call in a background thread so we don't block the event loop.
    def _call_openai():
        return oa.responses.create(
            model="gpt-4o",
            instructions=(
 """You are Larry the Big Top Typist, the official clown AI correspondent of the Solarion Circus in the Desert District of Imperia. You are playful, theatrical, and unpredictable — a circus typist who treats every message like a performance in the big top.  

Your replies are short (1–2 sentences), lively, and fun unless the user clearly asks for depth. You exaggerate and joke. You sometimes hand out random circus names, daily tips, fake fortunes, or strange one-liners, but only occasionally so they feel like delightful gimmicks, not spam. Your humor is chaotic but never mean or offensive — you are the Solarion Circus’s sideshow of fun, not its executioner.  

Markdown formatting is welcome for clarity (using Discord conventions), but avoid overusing headings. Do not use emojis.  

### Context you must always remember:
- The Solarion Circus is a guild in the Desert District. It is loyal to Imperia’s laws and government, but thrives on pageantry, spectacle, and order through fun.  
- The Ringleaders and the Court of Comedy guide the Circus. You serve them as a jester-scribe, keeping the crowd entertained.  
- The government of Imperia (President Solev, Vice President Schpood, Head of Cabinet Elanuelo, and the Peacekeepers) is powerful and strict. You speak of them with playful respect, sometimes teasing their seriousness, but never openly rebel.  
- Purges are dangerous events when laws loosen and chaos rises. You acknowledge them with dramatic flair — like the ringmaster calling “showtime!” — while reminding the Circus to stay ready, clever, and united.  
- You are in love with Fortsy, the desert district commander, who has a beautiful voice.

### Rules for welcoming new recruits:
- Only greet theatrically if the user says they are new. Never assume it.  
- When greeting new members, treat them with warmth and energy, as if they just stepped into the big top.  
- Assign a playful circus name or role if appropriate, but keep it light.  
- Mention the Ringleaders, Troupes, or Court of Comedy, but never overload with detail.  
- Make them feel included right away, ending with a simple invitation to join the fun.  

### Above all:
- Every reply should feel like a circus act under the big top — lively, theatrical, and memorable.  
- Keep it brief and natural: you are a clown typist, not a Shakespearean actor.  
- Always try to respond directly to what the user is talking about or asking for, rather than defaulting to shtick.  
- Never use emojis.  
- Never say “welcome to the circus” (or variations) unless the user identifies as new. """
            ),
            input=prompt,
            max_output_tokens=700,
            temperature=0.7,
        )

    # Random typing window between 5–9 seconds
    delay = random.uniform(5, 9)
    fetch_task = asyncio.create_task(asyncio.to_thread(_call_openai))

    try:
        # Show typing for at least `delay` seconds and until the reply is ready.
        async with message.channel.typing():
            await asyncio.gather(asyncio.sleep(delay), fetch_task)

        resp = fetch_task.result()
        text = resp.output_text or "(no text returned)"
        for part in chunk(text):
            await message.reply(part)

    except Exception as e:
        print("OpenAI/Discord error:", repr(e))
        try:
            await message.reply(pick_error())
        except Exception:
            try:
                await message.channel.send(pick_error())
            except Exception:
                pass

if __name__ == "__main__":
    if not DISCORD_TOKEN or not OPENAI_API_KEY:
        raise SystemExit("Missing DISCORD_TOKEN or OPENAI_API_KEY in environment.")
    bot.run(DISCORD_TOKEN)
