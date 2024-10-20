# BASE URL: https://shreybirmiwal.pythonanywhere.com/
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS  # Import CORS
from flask import jsonify

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

    # Return the second string in JSON format
    return jsonify({"second_string": string2}), 200


if __name__ == "__main__":
    app.run(debug=True)
