#git pull origin main

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt 
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()
bcrypt = Bcrypt() 

inventors_patent = db.Table(
    'inventors_patent',
    db.Column('patent_id', db.Integer, db.ForeignKey('patents.id'), primary_key=True),
    db.Column('inventor_id', db.Integer, db.ForeignKey('inventors.id'), primary_key=True),
)

class Patent(db.Model, SerializerMixin):
    __tablename__ = 'patents'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400), unique=True, nullable=False)
    patent_status = db.Column(db.String(50))
    summary = db.Column(db.String)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    classification_id = db.Column(db.Integer, db.ForeignKey('classifications.id'))
    
    inventors = db.relationship('Inventors', secondary=inventors_patent, back_populates="patents")
    
    def __repr__(self):
        return f"Patent('{self.title}', '{self.patent_status}')"
    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True)
    affiliation = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    patents = db.relationship('Patent', backref="users")

    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value and '.com' not in value:
            raise ValueError("Invalid email")
        return value
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f"User('{self.name}', '{self.email}')"

class Classification(db.Model, SerializerMixin):
    __tablename__ = 'classifications'

    id = db.Column(db.Integer, primary_key=True)
    class_code = db.Column(db.Integer, unique=True)
    description = db.Column(db.String)

    patents = db.relationship('Patent', backref="classifications")

    def __repr__(self):
        return f"Classification('{self.class_code}', '{self.description}')"

class Inventors(db.Model, SerializerMixin):
    __tablename__ = 'inventors'

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(250), nullable=False)

    patents = db.relationship('Patent', secondary=inventors_patent, back_populates="inventors")

    def __repr__(self):
        return f"Inventors('{self.group_name}')"
       