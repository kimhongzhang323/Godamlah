from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from LLm.model import model
from models import db

app = Flask(__name__, static_folder="static", template_folder="templates")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db.init_app(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def get_data():
    return jsonify({"message": "Hello from Flask!"})


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    response = model.send_message(data["message"])
    return jsonify({"response": response.text})

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
