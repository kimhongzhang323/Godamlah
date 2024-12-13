from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
<<<<<<< HEAD
from flask_hcaptcha import hCaptcha
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt, datetime, json
import re

app = Flask(__name__)
=======
from LLm.model import model
from models import db

app = Flask(__name__, static_folder="static", template_folder="templates")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
>>>>>>> main
CORS(app)
bcrypt = Bcrypt(app)

<<<<<<< HEAD
# hCaptcha Configuration
app.config["HCAPTCHA_SITEKEY"] = (
    "496c1d9a-7714-4c70-82be-8cc666046cd0"  # this site key is from micheal's hcaptcha account
)
app.config["HCAPTCHA_SECRET"] = (
    "ES_d7ff3bff89274c69a0495ceab4116c5ay"  # this secret key is from micheal's hcaptcha account
)
hcaptcha = hCaptcha(app)  # Initialize the hCaptcha extension

# JWT Configuration
with open("secretkey/key.json", "r") as config_file:
    skey = json.load(config_file)
    app.config["SECRET_KEY"] = skey["SECRET_KEY"]  # Use a secure secret key

# MongoDB Configuration
client = MongoClient("mongodb://localhost:27017/")
db = client["user_auth_db"]
users_collection = db["users"]

# Flask-Bcrypt configuration
# Initialize Flask-Bcrypt


# Password Validation Function
def validate_password(password):
    # First letter must be capitalized
    if not password[0].isupper():
        return False

    # Password must be at least 8 characters long
    if len(password) < 8:
        return False

    # Password must be alphanumeric and contain at least one symbol
    if not re.search(r"[A-Za-z0-9]", password):  # Check if it's alphanumeric
        return False
    if not re.search(r"[\W_]", password):  # Check if it includes at least one symbol
        return False

    return True


# Routes
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    captcha_response = data.get("captcha_response")

    if not username or not password or not captcha_response:
        return jsonify({"error": "Missing fields"}), 400

    # Validate password
    if not validate_password(password):
        return (
            jsonify(
                {
                    "error": "Password must meet the following criteria: "
                    "First letter capitalized, "
                    "at least 8 characters, "
                    "alphanumeric, and contain at least one symbol."
                }
            ),
            400,
        )

    # Verify captcha using flask-hcaptcha
    if not hcaptcha.verify(captcha_response):
        return jsonify({"error": "Invalid captcha"}), 400

    # Check if user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    # Hash the password using Flask-Bcrypt and store the user
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"username": username, "password": hashed_password})

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    captcha_response = data.get("captcha_response")

    if not username or not password or not captcha_response:
        return jsonify({"error": "Missing fields"}), 400

    # Verify captcha using flask-hcaptcha
    if not hcaptcha.verify(captcha_response):
        return jsonify({"error": "Invalid captcha"}), 400

    # Authenticate user
    user = users_collection.find_one({"username": username})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Create JWT token
    token = jwt.encode(
        {
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        },
        app.config["SECRET_KEY"],
        algorithm="HS256",
    )

    return jsonify({"token": token, "message": "Welcome to the dashboard"}), 200


@app.route("/protected", methods=["GET"])
def protected():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Token is missing"}), 401

    try:
        # Decode the token
        decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return (
            jsonify({"message": "Access granted", "user_id": decoded["user_id"]}),
            200,
        )
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
=======
db.init_app(app)

@app.route("/")
def index():
    return render_template("index.html")
>>>>>>> main



@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    response = model.send_message(data["message"])
    return jsonify({"response": response.text})

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
