from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# for test purposes, use sqlite:////path/test.db instead
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////path/test.db"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/test"

db = SQLAlchemy(app)

# *************
# Tips to Note
# *************
# Integer PK will autoincrement by default in Flask SQLAlchemy
# Table name is automatically generated in F-S as "CamelCase" to "camel_case"

class Artists(db.Model):
    ArtistID 	= db.Column(db.Integer, nullable=False, primary_key=True)
    Name 		= db.Column(db.String(length=50), nullable=False)
    Start_time 	= db.Column(db.Date, nullable=False)
    End_time 	= db.Column(db.Date, nullable=True)

#	top 3 songs is a many-to-many relationship
    Top_3_Songs	= db.relationship('Songs', secondary=top_3_songs, backref=db.backref('Artist', lazy='dynamic'), lazy='dynamic')
    
    def __init__(self, name, start_time, end_time=None):
    	self.Name 		= name
    	self.Start_time = start_time
    	self.End_time 	= end_time

    def __repr__(self):
    	return '<Artist %r> ' % self.Name

top_3_songs = db.Table(
    db.Column('ArtistID', db.Integer, db.ForeignKey("artists.ArtistID"), nullable = False)
    db.Column('SongID', db.Integer, db.ForeignKey("songs.SongID"), nullable = False)
)

class Songs(db.Model):
    SongID = db.Column(db.Integer,  nullable = False, primary_key = True)
    Name = db.Column(db.String(length=50), nullable = False)
    Creation_Date = db.Column(db.Date, nullable = False)
    Chart_Position = db.Column(db.Integer, nullable = True)
    Run_Time = db.Column(Numeric(scale = 2), nullable = False)

    ArtistID = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)
    GID = db.Column(db.Integer, db.ForeignKey("GenreList.GID"), nullable = False)

    # albumn-song is a one-to-many relationship 
    AlbumID = db.Column(db.Integer, db.ForeignKey('albumn.id'))

    def __init__(self, name, creation_date, chart_position=None, run_time):
    	self.Name 			= name
    	self.Creation_Date  = creation_date
    	self.Chart_Position = chart_position
    	self.Run_Time 		= run_time

    def __repr__(self):
    	return '<Song %r> ' % self.Name

class Albums(db.Model):

    AlbumID = db.Column(db.Integer, nullable = False, primary_key = True)
    LabelID = db.Column(db.Integer, db.ForeignKey("LabelList.LabelID"), nullable = False)
    Title = db.Column(db.String, nullable = False)
    Year = db.Column(db.Date, nullable = False)
    US_Chart_Postion = db.Column(db.Integer, nullable = True)
    ArtistID = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)

    Songs = db.relationship('Songs', backref='Albumn', lazy='dynamic')

class Tours(db.Model):

    Venue = db.Column(db.String(length=50), nullable = False)
    Location = db.Column(db.Integer, nullable = False)
    tDate = db.Column(db.Date, nullable = False)
    TourID = db.Column(db.Integer, nullable = False, primary_key = True)
    ArtistID = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)

class GenreList(db.Model):

    Genre = db.Column(db.String, nullable = False)
    GID = db.Column(db.Integer, nullable = False, primary_key = True)

class GenreBelong(db.Model):

    gbID = db.Column(db.Integer, nullable = False, primary_key = True)
    ArtistID = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)
    GID = db.Column(db.Integer, db.ForeignKey("GenreList.GID"), nullable = False)

class LabelList(db.Model):

    LabelID = db.Column(db.Integer, nullable = False, primary_key = True)
    LabelName = db.Column(db.String, nullable = False)






class AlbumList(db.Model):

    alID = db.Column(db.Integer, nullable = False, primary_key = True)
    AlbumID = db.Column(db.Integer, db.ForeignKey("Albums.AlbumID"), nullable = False)
    SongID  = db.Column(db.Integer, db.ForeignKey("Songs.SongID"), nullable = False)

class TourLineUp(db.Model):

    tluID = db.Column(db.Integer, nullable = False, primary_key = True)
    TourID = db.Column(db.Integer, db.ForeignKey("Tours.TourID"), nullable = False)
    SongID = db.Column(db.Integer, db.ForeignKey("Songs.SongID"), nullable = False)


#	For test purposes, uncomment to initialize database
#	if __name__ == '__main__':
#		app.run(port=9001)