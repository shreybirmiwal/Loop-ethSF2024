from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
import os
from huggingface_hub import InferenceClient

load_dotenv()

app = Flask(__name__)
CORS(app)



@app.route('/test', methods=['POST'])
def get_second_string():
    # Get the JSON data from the request body
    data = request.get_json()

    # Extract the two strings from the JSON payload
    string1 = data.get('string1', '')
    string2 = data.get('string2', '')

    print(string1)
    print(string2)

    # Return the second string in JSON format
    return jsonify({"second_string": string2}), 200



@app.route("/infer", methods=['POST'])
def inference():

    data = request.get_json()

    # Extract the two strings from the JSON payload
    model = data.get('model', '')
    query = data.get('query', '')

    print(model)
    print(query)



    if model == '0':
        client = OpenAI(api_key="sk-proj---8bU8Sc-BLAH")

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a licensed professional therapist who assists with emotional and mental health issues.",
                },
                {
                    "role": "user",
                    "content": query,
                },
            ],
        )

        return jsonify({"res": completion.choices[0].message.content})

    if model == "therapygpt":
        client = OpenAI(api_key="sk-proj---8bU8Sc-BLAH")

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a licensed professional therapist who assists with emotional and mental health issues.",
                },
                {
                    "role": "user",
                    "content": query,
                },
            ],
        )

        return jsonify({"res": completion.choices[0].message.content})

    else:
        client = InferenceClient(
            model,
            token="BLAH",
        )
        out =  client.text_generation(query)
        return jsonify({"res": out})  



if __name__ == "__main__":
    app.run(debug=True)
