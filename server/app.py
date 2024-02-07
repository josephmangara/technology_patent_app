#!/usr/bin/env python3

from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Patent, Inventors, User, Classification
from collections import OrderedDict

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
        return jsonify({"message":  "Welcome to the patent technologyAPI."})
    
api.add_resource(Home, '/')

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
                response_dict = {"message": "Either title, patent status, or summary field is empy"}
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
            response_dict = {
                "id": patent.id,
                "title": patent.title,
                "patent_status": patent.patent_status,
                "summary": patent.summary
            }
            response = make_response(
                jsonify(response_dict),
                200,
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


        
if __name__ == '__main__':
    app.run(port=5555, debug=True)
