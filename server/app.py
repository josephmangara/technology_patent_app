#!/usr/bin/env python3

from flask import Flask, make_response, request, jsonify, session 
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Patent, Inventors, User, Classification

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///patents.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

app.json.compact = True 

migrate = Migrate(app, db)

db.init_app(app)

class Home(Resource):
    def get(self):
        return jsonify({"message":  "Welcome to the patent technology API."})
    
api.add_resource(Home, '/')
# Patent views 
class Patents(Resource):
    def get(self):
        patents = []

        for patent in Patent.query.all():
            patent_dict = {
                "id": patent.id,
                "title": patent.title,
                "patent_status": patent.patent_status,
                "summary": patent.summary
            }
            patents.append(patent_dict)

        response = make_response(
            jsonify(patents),
            200,
        )
        return response
    
    # POST a patent
    def post(self):
        try: 
            data = request.get_json()

            title=data.get("title") 
            patent_status=data.get("patent_status") 
            summary=data.get("summary") 
            user_id=data.get("user_id")
            classification_id=data.get("classification_id")

            # patent = Patent.query.filter_by(id=id).first()
            if title is None or patent_status is None or summary is None:
                response_dict = {"message": "Either title, patent status, or summary field is empty"}
                response = make_response(
                    jsonify(response_dict),
                    404,
                )
                return response
            
            else:
                new_patent = Patent(
                    title=title, 
                    patent_status=patent_status, 
                    summary=summary, 
                    user_id=user_id, 
                    classification_id=classification_id,
                    )
                db.session.add(new_patent)
                db.session.commit()

                response = make_response(
                    jsonify({"message": "successful"}),
                    201,
                )
            return response 
        
        except:
            err_dict= {"errors": "validation errors"}
            response = make_response(err_dict, 404)
            db.session.rollback()
            return response 

api.add_resource(Patents, '/patents')

class PatentById(Resource):
    # Get a patent by id
    def get(self, id):
        patent = Patent.query.filter_by(id=id).first()

        if patent:
            classification = Classification.query.filter_by(id=patent.classification_id).first()

            creator = User.query.filter_by(id=patent.user_id).first()
            creator_dict = {
                "id": creator.id,
                "name": creator.name
            }
            classification_dict = {
                "id": classification.id,
                "class_code": classification.class_code,
                "description": classification.description
            }

            response_dict = {
                "id": patent.id,
                "title": patent.title,
                "patent_status": patent.patent_status,
                "summary": patent.summary,
                "patent_creator": creator_dict,
                "classification": classification_dict
            }

            response = make_response(
                jsonify(response_dict),
                200,
            )
            return response 
        else:
            response = make_response(
                jsonify({"error": "Patent not found!"}),
                404
            )
            return response
        
    # Delete a patent 
    def delete(self, id):
        patent = Patent.query.filter_by(id=id).first()

        if patent:
            db.session.delete(patent)
            db.session.commit()
            response_dict = {"message": "record successfully deleted"}

            response = make_response(
                jsonify(response_dict),
                204
            )
        else:
            response = make_response(
                jsonify({"error": "Patent not found!"}),
                404
            )
        return response 

api.add_resource(PatentById, '/patents/<int:id>')

# Classification
class Classifications(Resource):
    def get(self):
        classifications = []

        for classification in Classification.query.all():
            classification_dict = {
                "id": classification.id,
                "class_code": classification.class_code,
                "description": classification.description
            }
            classifications.append(classification_dict)

        response = make_response(
            jsonify(classifications),
            200,
        )
        return response
api.add_resource(Classifications, '/classifications')

class ClassificationById(Resource):
    # Get a classification by id
    def get(self, id):
        classification = Classification.query.filter_by(id=id).first()

        if classification:
            response_dict = {
                "id": classification.id,
                "class_code": classification.class_code,
                "description": classification.description,
            }
            response = make_response(
                jsonify(response_dict),
                200,
            )
            return response 
    
    
api.add_resource(ClassificationById, '/classifications/<int:id>')

#users
class Users(Resource):
    def get(self):
        users = []
        for user in User.query.all():
            users_dict = {
                'id': user.id,
                'name': user.name,
                'affiliation': user.affiliation,
                'email': user.email
                                        }
            users.append(users_dict)
        response = make_response(
            jsonify(users),
            200,
        )
        return response
    
    def post(self):
        try: 
            data = request.get_json()

            name=data.get("name") 
            affiliation=data.get("affiliation") 
            email=data.get("email") 
            password=data.get("password")

            if name is None or affiliation is None or email is None or password is None:
                response_dict = {"message": "Either name, affiliation, email or password field is empty!"}
                response = make_response(
                    jsonify(response_dict),
                    404,
                )
                return response
            
            else:
                new_user = User(
                    name=name, 
                    affiliation=affiliation, 
                    email=email, 
                    password=password, 
                    )
                db.session.add(new_user)
                db.session.commit()

                response = make_response(
                    jsonify({"message": "successful"}),
                    201,
                )
            return response 
        
        except:
            err_dict= {"errors": "Either name, affiliation,email or password field is empty"}
            response = make_response(err_dict, 404)
            db.session.rollback()
            return response 
    
api.add_resource(Users, '/users')

class Login(Resource):
    def post(self):
        request_data = request.get_json()
        if not request_data or 'email' not in request_data:
            return jsonify({"message": "email not provided"}), 400
        
        email = request_data['email']
        user = User.query.filter_by(email=email).first()

        if user:
            session['user_id'] = user.id
            return {"user": user.email}, 200

        else:
            return jsonify({"message": "User not found"}), 404

api.add_resource(Login, '/login')

#users by Id
class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        patents_list = []
        for user_patent in user.patents:
            patent_dict = {
                        "id": user_patent.id,
                        "title": user_patent.title,
                        "summary": user_patent.summary,
                        "patent_status": user_patent.patent_status
                    } 
            patents_list.append(patent_dict)
        if user:
            response_dict = {
                'id': user.id,
                'name': user.name,
                'affiliation': user.affiliation,
                'email': user.email,
                "patents": patents_list
            }
            response = make_response(
                jsonify(response_dict),
                200,
            )
            return response
        
        else:
            response = make_response(
                jsonify({"error": "User not found!"}),
                404
            )
            return response
        
    # Delete a user 
    def delete(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            db.session.delete(user)
            
            response_dict = {"message": "record successfully deleted"}

            response = make_response(
                jsonify(response_dict),
                204
            )
            db.session.commit()
        else:
            response = make_response(
                jsonify({"error": "user not found!"}),
                404
            )
        return response 
        
api.add_resource(UsersById, '/users/<int:id>')

# Inventors
class InventorSi(Resource):
    def get(self):
        inventors = []
        for inventor in Inventors.query.all():
            inventor_dict = {
                'id': inventor.id,
                'group_name': inventor.group_name
                }
            inventors.append(inventor_dict)
        response = make_response(
            jsonify(inventors),
            200,
        )
        return response
    
api.add_resource(InventorSi, '/inventors')

# Inventors by ID
class InventorsById(Resource):
    def get(self, id):
        inventors = Inventors.query.filter_by(id=id).first()
        patents = Patent.query.all()
        patents_list = []
        
        for inventors_patent in patents:
            patent_dict = {
                        "id": inventors_patent.id,
                        "title": inventors_patent.title,
                        "summary": inventors_patent.summary,
                        "patent_status": inventors_patent.patent_status
                    } 
            patents_list.append(patent_dict)

        if inventors:
            response_dict = {
                'id': inventors.id,
                'group_name': inventors.group_name,
                "patents": patents_list
            }
            response = make_response(
                jsonify(response_dict),
                200,
            )
            return response
        
        else:
            response = make_response(
                jsonify({"error": "Inventors not found!"}),
                404
            )
            return response
        
api.add_resource(InventorsById, '/inventors/<int:id>')
        
if __name__ == '__main__':
    app.run(port=5555, debug=True)
