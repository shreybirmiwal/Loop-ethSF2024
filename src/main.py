from dotenv import load_dotenv
import os
from transformers import pipeline

load_dotenv()

messages = [
    {"role": "user", "content": "Who are you?"},
]
pipe = pipeline("text-generation", model="meta-llama/Llama-3.1-8B-Instruct", token=os.getenv("HF_PAT"))
pipe(messages)