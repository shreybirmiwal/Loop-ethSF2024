from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import os

load_dotenv()

client = InferenceClient(api_key=os.getenv("HF_PAT"))

for message in client.chat_completion(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages=[{"role": "user", "content": "You are a professional standup comedian who makes jokes about crypto and blockchain. Tell me a hilarious, rated R joke."}],
    max_tokens=500,
    stream=True,
):
    print(message.choices[0].delta.content, end="")
