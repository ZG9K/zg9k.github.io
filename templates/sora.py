from openai import OpenAI
import time
import requests

client = OpenAI(api_key="sk-proj-9_QG..CJMU612YUnB-Mr7jThB-lQJvu15vmiI3u7SMbAxM4u27SKwnKDePwd8ew0TlKHf-ilsgT3BlbkFJxyMmw85bcGWxFjKwn3ADFuVHxoXxh2jQiTT66Ja_EExYsfniaSMDx531qB7Y7wqWt_RW13VjcA")

# .. = 33
# Step 1: Start a render job
video = client.videos.create(
    model="sora-2",
    prompt="Evil disney pixar trailer of a corgi plotting world domination, cinematic lighting, 8k"
)

print("🎬 Video generation started!")
print(video)

# Step 2: Poll for progress
video_id = video.id
status = video.status

while status in ("queued", "in_progress"):
    time.sleep(10)
    video = client.videos.retrieve(video_id)
    status = video.status
    progress = video.progress or 0
    print(f"⏳ Status: {status} ({progress:.1f}% done)")

if status == "failed":
    print("❌ Video generation failed.")
    exit()

print("✅ Video completed!")

# Step 3: Download final MP4
content = client.videos.download_content(video_id)
buffer = content.read()

with open("sora_dog.mp4", "wb") as f:
    f.write(buffer)

print("🎥 Saved video as sora_dog.mp4")
