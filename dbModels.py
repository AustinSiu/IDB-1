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
# Use append() to insert one-to-many and many-to-many relations
# connections are automatically closed
# *************

class Artists(db.Model):
    """
    Model Artists:
    features of ArtistID, Name, Start_Time, End_Time,
    relations to Songs, Albums, Tours,
    relations of top_3_songs (a table)
    """

    ArtistID 	= db.Column(db.Integer, nullable=False, primary_key=True)
    Name 		= db.Column(db.String(length=50), nullable=False)
    Start_Time 	= db.Column(db.Date, nullable=False)
    End_Time 	= db.Column(db.Date, nullable=True)

#   artist-song is a one-to-many relationship
    songs       = db.relationship('Songs', backref=db.backref('artist', lazy='dynamic'), lazy='dynamic')

#   artist-album is a one-to-many relationship
    albumns     = db.relationship('Albums', backref=db.backref('artist', lazy='dynamic'), lazy='dynamic')

#   artist-tour is a one-to-many relationship
    tours       = db.relationship('Tours', backref=db.backref('artist', lazy='dynamic'), lazy='dynamic')   

#	top 3 songs is a many-to-many relationship
    Top_3_Songs	= db.relationship('Songs', secondary=top_3_songs, backref=db.backref('artist', lazy='dynamic'), lazy='dynamic')

    def __init__(self, name, start_time, end_time=None, **rest):
    	self.Name 		= name
    	self.Start_Time = start_time
    	self.End_Time 	= end_time

    def __repr__(self):
    	return '<Artist %r> ' % self.Name

top_3_songs = db.Table(
    db.Column('ArtistID', db.Integer, db.ForeignKey("artists.ArtistID")),
    db.Column('SongID', db.Integer, db.ForeignKey("songs.SongID")))

class Songs(db.Model):
    """ 
    Model Songs:
    features of SongID, Name, Creation_Date, Chart_Position, Run_Time
    relations from Artists, Albums, Labels
    relations of genre (a table)
    """
    SongID          = db.Column(db.Integer,  nullable = False, primary_key = True)
    Name            = db.Column(db.String(length=50), nullable = False)
    Creation_Date   = db.Column(db.Date, nullable = False)
    Chart_Position  = db.Column(db.Integer, nullable = True)
    Run_Time        = db.Column(Numeric(scale = 2), nullable = False)

#   song-genre is a many-to-many relationship
    Genre    = db.relationship('Genre', secondary=song_genre, backref=db.backref('song', lazy='dynamic'), lazy='dynamic')

#   artist-song is a one-to-many relationship
    ArtistID = db.Column(db.Integer, db.ForeignKey("artist.ArtistID"))

#   albumn-song is a one-to-many relationship 
    AlbumID  = db.Column(db.Integer, db.ForeignKey('albumn.id'))

#   label-song is a one-to-many relationship
    LabelID  = db.Column(db.Integer, db.ForeignKey("label.LabelID"))



    def __init__(self, name, creation_date, chart_position=None, run_time, **rest):
    	self.Name 			= name
    	self.Creation_Date  = creation_date
    	self.Chart_Position = chart_position
    	self.Run_Time 		= run_time

    def __repr__(self):
    	return '<Song %r> ' % self.Name

class Albums(db.Model):
    """
    Model Albums has
    features of AlbumID, Title, Year, US_Chart_Position
    relations from Labels, Artists, 
    relations to Songs
    relations of genre (album_genre, a table)
    """
    AlbumID             = db.Column(db.Integer, nullable = False, primary_key = True)
    Title               = db.Column(db.String, nullable = False)
    Year                = db.Column(db.Date, nullable = False)
    US_Chart_Postion    = db.Column(db.Integer, nullable = True)

#   Album-song is a one-to-many relationship
    LabelID  = db.Column(db.Integer, db.ForeignKey("LabelList.LabelID"), nullable = False)
#   Artist-album is a one-to-many relationship
    ArtistID = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)
#   Album-song is a one-to-many relationship
    Songs    = db.relationship('Songs', backref='Albumn', lazy='dynamic')

    def __init__(self, title, year, us_chart_position=None, **rest):
        self.title            = title
        self.Year             = year
        self.US_Chart_Postion = us_chart_position

    def __repr__(self):
        return '<Album %r> ' % self.Name


class Tours(db.Model):
    """
    Model Tours has
    features of TourID, Venue, Location, tDate, 
    relations from Artist
    relations of tour_line_up (a table)
    """
    TourID      = db.Column(db.Integer, nullable = False, primary_key = True)
    Venue       = db.Column(db.String(length=50), nullable = False)
    Location    = db.Column(db.Integer, nullable = False)
    tDate       = db.Column(db.Date, nullable = False)

#   Artist-tour is a one-to-many relationship
    ArtistID     = db.Column(db.Integer, db.ForeignKey("Artists.ArtistID"), nullable = False)
#   Tour-tour_line_up is a many to many relationship
    Tour_Line_Up = db.relationship('Songs', secondary=tour_line_up, backref=db.backref('tour', lazy='dynamic'), lazy='dynamic')

    def __init__(self, venue, location, date, **rest)
        self.Venue      = venue
        self.Location   = location
        self.tDate      = date

tour_line_up = db.table(
    db.Column('TourID', db.Integer, db.ForeignKey('tours.TourID')),
    db.Column('SongID', db.Integer, db.ForeignKey('songs.SongID')))

class Genre(db.Model):
    """
    Model Genre has
    feature of GID, Name
    relations of song_genre (a table), album_genre (a table)
    """
    GID     = db.Column(db.Integer, nullable = False, primary_key = True)
    Name    = db.Column(db.String, nullable = False)

    Songs   = db.relationship('Songs', secondary=song_genre, backref=db.backref('genre', lazy='dynamic'), lazy='dynamic')
    Albums  = db.relationship('Albums', secondary=album_genre, backref=db.backref('genre', lazy='dynamic'), lazy='dynamic')

song_genre = db.table(
    db.Column('SongID', db.Integer, db.ForeignKey('songs.SongID')),
    db.Column('GID', db.Integer, db.ForeignKey('genre.GID')))

album_genre = db.table(
    db.Column('AlbumID', db.Integer, db.ForeignKey('albums.SongID')),
    db.Column('GID', db.Integer, db.ForeignKey('genre.GID')))


class Labels(db.Model):
    """
    Model Labels has
    features of LabelID, Name
    relations to Albums, Songs
    """
    LabelID = db.Column(db.Integer, nullable = False, primary_key = True)
    Name = db.Column(db.String, nullable = False)
    Albums = db.relationship('Albums', backref=db.backref('label', lazy='dynamic'), lazy='dynamic')
    Songs = db.relationship('Songs', backref=db.backref('label', lazy='dynamic'), lazy='dynamic')



#	For test purposes, uncomment to initialize database
#	if __name__ == '__main__':
#		app.run(port=9001)