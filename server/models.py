from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Patent(db.model):
    __tablename__= 'patents'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400), nullable=False)
    patent_status = db.Column(db.String(50))
    summary= db.Column(db.String)
    created_at=db.Column(db.DateTime(), server_default=db.func.now())
    updated_at=db.Column(db.DateTime(), onupdate=db.func.now())


