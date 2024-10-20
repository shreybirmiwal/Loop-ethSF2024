from huggingface_hub import InferenceClient
import os

def inference(model: str, prompt: str):

    client = InferenceClient(
        model,
        token=os.environ["HF_PAT"],
    )

    print(client.text_classification(prompt))

inference("cardiffnlp/twitter-roberta-base-sentiment-latest", "I love you")
