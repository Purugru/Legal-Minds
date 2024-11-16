# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import vertexai
from vertexai.generative_models import GenerativeModel, Part, SafetySetting
import base64
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Vertex AI settings
def init_vertexai():
    vertexai.init(project="optimum-pier-437602-t7", location="us-central1")
    model = GenerativeModel("gemini-1.5-flash-002")
    return model

# Function to generate response from Vertex AI
def generate(company_name, company_description):
    model = init_vertexai()
    
    prompt = f"""Given the following company name and description, identify and provide relevant details about the laws that are applicable based on the provided document, which contains law names and detailed descriptions. Return only the relevant laws along with their descriptions.

    Company Name: {company_name}

    Company Description: {company_description}

    Please return the law names and detailed descriptions from the document that apply to this company."""
    
    # If you have a PDF document, encode it in base64 and include it here
    # For example:
    # with open("path_to_document.pdf", "rb") as f:
    #     pdf_data = f.read()
    #     document = Part.from_data(mime_type="application/pdf", data=base64.b64encode(pdf_data).decode('utf-8'))
    # For demonstration, we'll assume no document is provided
    document = Part.from_data(
        mime_type="application/pdf",

    )

    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 1,
        "top_p": 0.95,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
    ]

    responses = model.generate_content(
        [prompt, document],
        generation_config=generation_config,
        safety_settings=safety_settings,
        stream=True,
    )
    result = "".join([response.text for response in responses])
    return result

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    company_name = data.get('company_name')
    company_description = data.get('company_description')

    if not company_name or not company_description:
        return jsonify({'error': 'Missing company_name or company_description'}), 400

    try:
        result = generate(company_name, company_description)
        return jsonify({'result': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)