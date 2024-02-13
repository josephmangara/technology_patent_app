from random import choice, sample
import faker
from models import Classification, User, Inventors, Patent, inventors_patent
from app import app, db
from flask_bcrypt import Bcrypt 

bcrypt = Bcrypt() 
fake = faker.Faker()

with app.app_context():
    Classification.query.delete()
    User.query.delete()
    Inventors.query.delete()
    Patent.query.delete()
   
    db.session.commit()

    # Users
    affiliations = ["university", "organisation", "individual"]
    names = []

    for _ in range(4):
        fake_password = fake.password()
        hashed_password = bcrypt.generate_password_hash(fake_password).decode('utf-8') 

        fake_name = User(
            name=fake.name(),
            email=fake.email(),
            affiliation=choice(affiliations),
            _password_hash=hashed_password
        )
        db.session.add(fake_name)
        names.append(fake_name)
    
    db.session.commit()

     # Classification 
    technology_subfields = [
        "Machine Learning Algorithms",
        "Blockchain Technology",
        "Nanotechnology",
        "Augmented Reality Applications",
        "Internet of Things (IoT)",
        "Biometric Authentication Systems"
    ]
    classifications = []

    for i, subfield in enumerate(technology_subfields, start=1):
        class_code = f"{i}"
        classification = Classification(
            class_code=class_code,
            description=subfield
        )
        db.session.add(classification)
        classifications.append(classification)

    db.session.commit()

    # Patent
    patent_statuses = ["pending", "granted", "expired"]

    patent_titles = [
        "Method and System for Autonomous Vehicle Navigation",
        "Adaptive Machine Learning Model for Predictive Maintenance",
        "Efficient Blockchain Consensus Mechanism",
        "Blockchain-Based Digital Identity Management",   
        "Nanotechnology-Based Cancer Treatment",
        "Nanotechnology-Based Personalized Medicine Platform",
        "Augmented Reality Simulator for Surgical Training",
        "Augmented Reality System for Anatomical Education and support",
        "Secure Communication Protocol for IoT Devices",
        "Smart Grid Optimization Algorithm",
        "Enhanced Biometric Authentication System",
        "Biometric Encryption System for Secure Data Transmission and Storage"
    ]
    patent_summaries = [
        "A method and system for autonomous vehicle navigation using machine learning algorithms and real-time sensor data to optimize route planning and avoid obstacles.",
        "The patent creates an adaptive machine learning model capable of predicting equipment failures and scheduling maintenance activities to minimize downtime and maintenance costs.",
        "An efficient blockchain consensus mechanism that improves transaction throughput and scalability while maintaining decentralization and security.",
        "A blockchain-based digital identity management solution enabling secure and decentralized identity verification, authentication, and access control.",
        "A nanotechnology-based cancer treatment approach using targeted drug delivery systems to deliver therapeutic agents directly to cancer cells, minimizing side effects.",
        "An AI-powered personalized medicine platform that analyzes individual genetic profiles and medical histories to tailor treatment plans and optimize patient outcomes.",
        "A robotic surgical assistance system combining artificial intelligence and robotics for precise and minimally invasive surgical procedures with improved patient outcomes.",
        "This is a patent for an augmented reality-based remote assistance platform for medical procedures, enabling experts to provide real-time guidance and support to healthcare practitioners in remote locations.",
        "A secure communication protocol designed for IoT devices, ensuring data integrity, confidentiality, and authenticity in interconnected smart systems.",
        "A smart grid optimization algorithm leveraging machine learning and predictive analytics to optimize energy distribution, reduce wastage, and enhance grid reliability.",
        "An enhanced biometric authentication system utilizing multi-modal biometrics and advanced encryption techniques for robust user identification and access control.",
        "This is a patent for a biometric encryption system that uses biometric data as cryptographic keys to secure data transmission and storage, ensuring end-to-end security in communication networks."
    ]

    patents = []
    summary_index = 0

    for classification in classifications:
        for _ in range(2):  
            random_user = choice(User.query.all())

            title = patent_titles[summary_index]
            summary = patent_summaries[summary_index]
            summary_index += 1

            fake_patent = Patent(
                title=title,
                patent_status=choice(patent_statuses),
                summary=summary,
                user_id=random_user.id,
                classification_id=classification.id
            )
            db.session.add(fake_patent)
            patents.append(fake_patent)

    db.session.commit()

    # Inventors
    images = [
            "https://i.pinimg.com/236x/88/e5/f1/88e5f18fae15a003b7ec5e76f6b186eb.jpg",
            "https://i.pinimg.com/236x/e6/dc/5c/e6dc5c3772b07c0c2a5cb5a64940a1ed.jpg",
            "https://i.pinimg.com/236x/79/af/43/79af432e40034b8c32194cbc4d74962d.jpg",
            "https://i.pinimg.com/236x/b3/6e/e4/b36ee41cce0cf150bfa97bf4b8feaad8.jpg",
            "https://i.pinimg.com/236x/b2/b2/7c/b2b27c69409c2f8779b9a5a5ac28521f.jpg",
            "https://i.pinimg.com/236x/a1/84/48/a1844838cb4c2f63facb1c1b14975a89.jpg",
            "https://i.pinimg.com/236x/d1/ab/dd/d1abdd9a052946b94bf8feb6115540aa.jpg",
            "https://i.pinimg.com/236x/df/4e/f6/df4ef6146bfde94dd90ebe7ec6c67a07.jpg"
        ]
    innovators_names = [
            "TechGen Innovations",
            "Code craft ",
            "Silicon",
            "CyberVision group",
            "DataSphere Innovators",
            "NanoTech Nexus",
            "Quantum Innovations ll",
            "AI Ventures"
        ]

    group_names = []

    for i in range (8):
        fake_group = Inventors(
            group_name=innovators_names[i],
            group_image=images[i]
        )
        
        db.session.add(fake_group)
        group_names.append(fake_group)

    db.session.commit()

    # inventors_patent
    patents = Patent.query.all()
    inventors = Inventors.query.all()

    num_inventors_per_patent = 4

    for patent in patents:
        selected_inventors = sample(inventors, num_inventors_per_patent)
        patent.inventors.extend(selected_inventors)

    db.session.commit()