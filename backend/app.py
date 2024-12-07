from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import jwt, datetime, json
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)
bcrypt = Bcrypt(app)

with open('key.json', 'r') as config_file:
    skey = json.load(config_file)
    app.config['SECRET_KEY'] = skey['SECRET_KEY']

client = MongoClient('mongodb://localhost:27017/')
db = client['user_auth_db']
users_collection = db['users']

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the user already exists
    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    # Hash the password and store the user
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one({
        "username": username,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Find the user in the database
    user = users_collection.find_one({"username": username})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Generate a JWT token
    token = jwt.encode({
        "user_id": str(user["_id"]),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"token": token}), 200

# Protected route (requires authentication)
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"error": "Token is missing"}), 401

    try:
        # Decode the token
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return jsonify({"message": "Access granted", "user_id": decoded['user_id']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401



@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def get_data():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == "__main__":
    app.run(debug=True)
