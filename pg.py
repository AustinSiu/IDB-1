from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# for test purposes, use sqlite:////path/test.db instead
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////Users/shidashen/Desktop/IDB/random.db"

#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/test"

db = SQLAlchemy(app)

tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('page_id', db.Integer, db.ForeignKey('page.id'))
)

class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tags = db.relationship('Tag', secondary=tags,
        backref=db.backref('pages', lazy='dynamic'))

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)

ArtistGenre = db.Table('artist_genre',
    db.Column('ArtistID', db.Integer, db.ForeignKey('artists.id')),
    db.Column('GID', db.Integer, db.ForeignKey('genre.id')))

class Artists(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    Name = db.Column(db.String(length=50), nullable=False)
    ArtistGenre = db.relationship('Genre', secondary=ArtistGenre, backref=db.backref(
        'artists', lazy='dynamic'))
    def __init__(self, name, start_time, image, age=None, origin=None, end_time=None, **rest):
        self.Name = name
        self.Start_Time = start_time
        self.End_Time = end_time
        self.Age = age
        self.Origin = origin
        self.Image = image

    def __repr__(self):
        return '<Artist %r> ' % self.Name

class Genre(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    Name = db.Column(db.String, nullable=False)
    Image = db.Column(db.String, nullable=True)



db.drop_all()
db.create_all()