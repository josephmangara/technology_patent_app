from random import choice, randint
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

     # Classification 
    classifications = []

    for _ in range(7):
        fake_classification = Classification(
            class_code=randint(1,6),
            description=fake.sentence(nb_words=11)
        )
        db.session.add(fake_classification)
        classifications.append(fake_classification)

    db.session.commit()

    # Patent
    patent_statuses = ["pending", "granted", "expired"]

    patents = []
       
    for _ in range(70):
        random_user = choice(User.query.all())
        random_classification = choice(Classification.query.all())

        fake_patent = Patent(
            title=fake.sentence(),
            patent_status=choice(patent_statuses),
            summary=fake.paragraph(nb_sentences=5, variable_nb_sentences=5),
            user_id=random_user.id,
            classification_id=random_classification.id
        )
        db.session.add(fake_patent)
        patents.append(fake_patent)

    db.session.commit()

    # Inventors
    group_names = []

    for _ in range (8):
        fake_group = Inventors(
            group_name=fake.sentence(nb_words=5)
        )
        
        db.session.add(fake_group)
        group_names.append(fake_group)

    db.session.commit()