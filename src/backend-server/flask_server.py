#BASE URL: https://shreybirmiwal.pythonanywhere.com/

from flask import Flask
from flask_cors import CORS  # Import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)

# @app.route('/')
# def hello():
#     return 'Hello, World!'


@app.route('/api/hello')
def hello_api():
    return jsonify({'hello': 'world'})


# 1) quereying these models and getting the answers frm the model
# input: model name
# input: prompt
# output: model output
@app.route('/api/inference/<model>/<prompt>')
def inference(model, prompt):
    # query the model and get the output
    return jsonify({'model': model, 'prompt': prompt, 'output': (f'OUTPUT OUTPOUT OUTPUT HEHE +'+model+"SAD"+prompt)})


# 2) updating RLHF given human feedback
# input: human feedback (Usefulness, Clarity Relevance) all frm - (0->10)
# output: new model weights
@app.route('/api/feedback/<usefulness>/<clarity>/<relevance>')
def feedback(usefulness, clarity, relevance):
    # update the model weights
    return jsonify({'usefulness': usefulness, 'clarity': clarity, 'relevance': relevance, 'output': 'new model weights'})



if __name__ == '__main__':
    app.run(debug=True)