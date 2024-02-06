from random import choice 
import faker
from models import Classification, User, Inventors, Patent
from app import app, db

fake = faker.Faker()

with app.app_context():
    Classification.query.delete()
    User.query.delete()
    Inventors.query.delete()
    Patent.query.delete()
    
    # Users
    affiliations = ["university", "organisation", "individual"]
    names = []

    for _ in range(31):
        fake_name = User(
            name=fake.name(),
            email=fake.email(),
            affiliation=choice(affiliations)
        )
        db.session.add(fake_name)
        names.append(fake_name)

    db.session.commit()
