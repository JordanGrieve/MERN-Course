from app import app, db
from flask import request, jsonify
from models import Friend

# Get all friends
@app.route('/api/friends', methods=['GET'])
def get_friends():
    friends = Friend.query.all()
    # Turn to JSON
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

# Create a friend
@app.route('/api/friends', methods=['POST'])
def create_friend():
    try:
        data = request.json

        required_fields = ['name', 'role', 'description', 'gender']
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f'Missing required field: {field}'}), 400

        name = data['name']
        role = data['role']
        description = data['description']
        gender = data['gender']

        # Fetch avatar image based on gender
        if gender == 'male':
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == 'female':
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_friend = Friend(name=name, role=role, description=description, img_url=img_url, gender=gender)

        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400

# Delete a friend
@app.route('/api/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error":f"Friend with id {id} not found"}), 404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": "Friend has been deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500


# Update a friend
@app.route('/api/friends/<int:id>', methods=['PATCH'])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": f"Friend with id {id} not found"}), 404

        data = request.json

        friend.name = data.get('name', friend.name)
        friend.role = data.get('role', friend.role)
        friend.description = data.get('description', friend.description)
        friend.gender = data.get('gender', friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400



