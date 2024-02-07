#git pull origin main

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

inventors_patent = db.Table(
    'inventors_patent',
    db.Column('patent_id', db.Integer, db.ForeignKey('patents.id'), primary_key=True),
    db.Column('inventor_id', db.Integer, db.ForeignKey('inventors.id'), primary_key=True),
    extend_existing=True,
)

class Patent(db.Model):
    __tablename__ = 'patents'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400), nullable=False)
    patent_status = db.Column(db.String(50))
    summary = db.Column(db.String)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
    
    inventors = db.relationship('Inventors', secondary=inventors_patent, back_populates="patents")

    
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    affiliation = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    patents = db.relationship('Patent', backref="users")

    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value:
            raise ValueError("Invalid email")
        return value

class Classification(db.Model):
    __tablename__ = 'classifications'

    id = db.Column(db.Integer, primary_key=True)
    class_code = db.Column(db.Integer)
    description = db.Column(db.String)

    patents = db.relationship('Patent', backref="classifications")

class Inventors(db.Model):
    __tablename__ = 'inventors'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(250), nullable=False)

    patents = db.relationship('Patent', secondary=inventors_patent, back_populates="inventors")