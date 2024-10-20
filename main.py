from huggingface_hub import InferenceClient
import os


client = InferenceClient(api_key=os.environ["HF_PAT"])

# for message in client.chat_completion(
#     model="mistralai/Mixtral-8x7B-Instruct-v0.1",
#     messages=[
#         {
#             "role": "user",
#             "content": "You are a professional standup comedian who makes jokes about crypto and blockchain.",
#         }
#     ],
#     max_tokens=500,
#     stream=True,
# ):
#     print(message.choices[0].delta.content, end="")

print(
    client.chat_completion(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {
                "role": "user",
                "content": "You are a professional standup comedian who makes jokes about crypto and blockchain.",
            }
        ],
        max_tokens=500,
        stream=True,
    )
)
