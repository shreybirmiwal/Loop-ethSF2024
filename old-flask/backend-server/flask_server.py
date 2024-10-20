# BASE URL: https://shreybirmiwal.pythonanywhere.com/
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS  # Import CORS
from flask import jsonify
from openai import OpenAI
import os
from huggingface_hub import InferenceClient

load_dotenv()

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def hello():
#     return 'Hello, World!'


@app.route("/api/hello")
def hello_api():
    return jsonify({"hello": "world"})


# 1) quereying these models and getting the answers frm the model
# input: model name
# input: prompt
# output: model output
@app.route("/api/inference/<model>/<prompt>")
def inference(model: int, prompt: str):
    if model == 0:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a licensed professional therapist who assists with emotional and mental health issues.",
                },
                {
                    "role": "user",
                    "content": "Write a haiku about recursion in programming.",
                },
            ],
        )

        return completion.choices[0].message.content

    if model == 1:
        client = InferenceClient(api_key=os.getenv("HF_PAT"))

        for message in client.chat_completion(
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages=[
                {
                    "role": "user",
                    "content": "You are a professional standup comedian who makes jokes about crypto and blockchain.",
                }
            ],
            max_tokens=500,
            stream=True,
        ):
            print(message.choices[0].delta.content, end="")


def inference_from_hf(model_name: str, system_prompt: str, user_prompt: str, url: str):
    client = InferenceClient(api_key=os.getenv("HF_PAT"))

    for message in client.chat_completion(
        model=model_name,
        messages=[
            {
                "role": "user",
                "content": f"{system_prompt} + {user_prompt}",
            }
        ],
        max_tokens=500,
        stream=True,
    ):
        print(message.choices[0].delta.content, end="")


# 2) updating RLHF given human feedback
# input: human feedback (Usefulness, Clarity Relevance) all frm - (0->10)
# output: new model weights
@app.route("/api/feedback/<model>/<prompt>/<response>/<feedback>")
def feedback(model, prompt, response, feedback):
    # update the model weights

    # update firebase

    return jsonify(
        {model: model, prompt: prompt, response: response, feedback: feedback}
    )


if __name__ == "__main__":
    app.run(debug=True)
