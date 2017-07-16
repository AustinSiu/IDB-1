"""
Doc.

Doc.
"""
from flask import Flask, redirect
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
from flask_cors import CORS
import datetime

app = Flask(__name__)

# for test purposes, use sqlite:////path/test.db instead
# a config file is needed
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost:5432/banddb2"

CORS(app, headers=['Content-Type'])


db = SQLAlchemy(app)

# *************
# Tips to Note
# *************
# Integer PK will autoincrement by default in Flask SQLAlchemy
# Table name is automatically generated in F-S as "CamelCase" to "camel_case"
# Use append() to insert one-to-many and many-to-many relations
# connections are automatically closed
# *************

TopSongs = db.Table('top_songs',
                    db.Column('ArtistID', db.Integer,
                              db.ForeignKey('artists.ArtistID')),
                    db.Column('SongID', db.Integer, db.ForeignKey('songs.SongID')))

ArtistGenre = db.Table('artist_genre',
                       db.Column('ArtistID', db.Integer,
                                 db.ForeignKey('artists.ArtistID')),
                       db.Column('GID', db.Integer, db.ForeignKey('genre.GID')))

SongGenre = db.Table('song_genre',
                     db.Column('SongID', db.Integer,
                               db.ForeignKey('songs.SongID')),
                     db.Column('GID', db.Integer, db.ForeignKey('genre.GID')))

AlbumGenre = db.Table('album_genre',
                      db.Column('AlbumID', db.Integer,
                                db.ForeignKey('albums.AlbumID')),
                      db.Column('GID', db.Integer, db.ForeignKey('genre.GID')))

TourLineUp = db.Table('tour_line_up',
                      db.Column('TourID', db.Integer,
                                db.ForeignKey('tours.TourID')),
                      db.Column('SongID', db.Integer, db.ForeignKey('songs.SongID')))


class Artists(db.Model):
    """
    Model Artists:
    features of ArtistID, Name, Start_Time, End_Time,
    relations to Songs, Albums, Tours,
    relations of top_3_songs (a table), genre (a table)
    """

    ArtistID = db.Column(db.Integer, nullable=False, primary_key=True)
    Name = db.Column(db.String, nullable=False)
    Age = db.Column(db.Integer, nullable=True)
    Origin = db.Column(db.String, nullable=True)
    Start_Time = db.Column(db.Date, nullable=True)
    End_Time = db.Column(db.Date, nullable=True)
    Image = db.Column(db.String, nullable=True)

#   top 3 songs are many-to-many relationship
    TopSongs = db.relationship(
        'Songs', secondary=TopSongs, backref=db.backref('a', lazy='dynamic'))

#   Artist-genre is a many-to-many relationship
    ArtistGenre = db.relationship('Genre', secondary=ArtistGenre, backref=db.backref(
        'artist', lazy='dynamic'))

#   artist-song is a one-to-many relationship
    Songs = db.relationship('Songs', backref='artist', lazy='dynamic')

#   artist-album is a one-to-many relationship
    Albums = db.relationship('Albums', backref='artist', lazy='dynamic')

#   artist-tour is a one-to-many relationship
    Tours = db.relationship('Tours', backref='artist', lazy='dynamic')

    def __init__(self, name, image, start_time=None, age=None, origin=None, end_time=None, **rest):
        self.Name = name
        self.Start_Time = start_time
        self.End_Time = end_time
        self.Age = age
        self.Origin = origin
        self.Image = image

    def __repr__(self):
        return self.Name


class Songs(db.Model):
    """
    Model Songs:
    features of SongID, Name, Creation_Date, Chart_Position, Run_Time
    relations from Artists, Albums, Labels
    relations of genre (a table)
    """
    SongID = db.Column(db.Integer,  nullable=False, primary_key=True)
    Name = db.Column(db.String, nullable=False)
    Creation_Date = db.Column(db.Date, nullable=False)
    Chart_Position = db.Column(db.Integer, nullable=True)
    Run_Time = db.Column(db.Integer, nullable=False)
    Image = db.Column(db.String, nullable=True)

#   song-genre is a many-to-many relationship
    SongGenre = db.relationship('Genre', secondary=SongGenre, backref=db.backref(
        'song', lazy='dynamic'))

#   artist-song is a one-to-many relationship
    ArtistID = db.Column(db.Integer, db.ForeignKey("artists.ArtistID"))

#   album-song is a one-to-many relationship
    AlbumID = db.Column(db.Integer, db.ForeignKey('albums.AlbumID'))

#   label-song is a one-to-many relationship
    LabelID = db.Column(db.Integer, db.ForeignKey("labels.LabelID"))

    def __init__(self, name, creation_date, run_time, image, chart_position=None, **rest):
        self.Name = name
        self.Creation_Date = creation_date
        self.Chart_Position = chart_position
        self.Run_Time = run_time
        self.Image = image

    def __repr__(self):
        return self.Name


class Albums(db.Model):
    """
    Model Albums has
    features of AlbumID, Title, Year, US_Chart_Position
    relations from Labels, Artists,
    relations to Songs
    relations of genre (album_genre, a table)
    """
    AlbumID = db.Column(db.Integer, nullable=False, primary_key=True)
    Title = db.Column(db.String, nullable=False)
    Year = db.Column(db.Date, nullable=True)
    US_Chart_Postion = db.Column(db.Integer, nullable=True)
    Image = db.Column(db.String, nullable=True)

#   Album-song is a one-to-many relationship
    LabelID = db.Column(db.Integer, db.ForeignKey(
        "labels.LabelID"), nullable=True)
#   Artist-album is a one-to-many relationship
    ArtistID = db.Column(db.Integer, db.ForeignKey(
        "artists.ArtistID"), nullable=True)
#   Album-song is a one-to-many relationship
    Songs = db.relationship('Songs', backref='album')

    AlbumGenre = db.relationship('Genre', secondary=AlbumGenre, backref=db.backref(
        'album', lazy='dynamic'))

    def __init__(self, title, year, image, us_chart_position=None, **rest):
        self.Title = title
        self.Year = year
        self.US_Chart_Postion = us_chart_position
        self.Image = image

    def __repr__(self):
        return self.Title


class Tours(db.Model):
    """
    Model Tours has
    features of TourID, Venue, Location, tDate,
    relations from Artist
    relations of tour_line_up (a table)
    """
    TourID = db.Column(db.Integer, nullable=False, primary_key=True)
    tDate = db.Column(db.String, nullable=False)
    Name = db.Column(db.String, nullable=False)
    Image = db.Column(db.String, nullable=True)
    Venue = db.Column(db.String, nullable=False)
    Locations = db.Column(db.String, nullable=False)

#   Artist-tour is a one-to-many relationship
    ArtistID = db.Column(db.Integer, db.ForeignKey(
        "artists.ArtistID"), nullable=False)
#   Tour-tour_line_up is a many to many relationship
    TourLineUp = db.relationship('Songs', secondary=TourLineUp, backref=db.backref(
        'tour', lazy='dynamic'))

    def __init__(self, date, name, image, venue, locations, **rest):
        self.tDate = date
        self.Name = name
        self.Image = image
        self.Venue = venue
        self.Locations = locations

    def __repr__(self):
        return self.Name


class Genre(db.Model):
    """
    Model Genre has
    feature of GID, Name
    relations of song_genre (a table), album_genre (a table)
    """
    GID = db.Column(db.Integer, nullable=False, primary_key=True)
    Name = db.Column(db.String, nullable=False)
    Image = db.Column(db.String, nullable=True)

    def __init__(self, name, image=None):
        self.Name = name
        self.Image = image

    def __repr__(self):
        return self.Name


class Labels(db.Model):
    """
    Model Labels has
    features of LabelID, Name
    relations to Albums, Songs
    """
    LabelID = db.Column(db.Integer, nullable=False, primary_key=True)
    Name = db.Column(db.String, nullable=False)
    Image = db.Column(db.String, nullable=True)

#   one-to-many
    Albums = db.relationship('Albums', backref='label', lazy='dynamic')

#   one-to-many
    Songs = db.relationship('Songs', backref='label', lazy='dynamic')

    def __init__(self, name, image=None):
        self.Name = name
        self.Image = image

    def __repr__(self):
        return self.Name


import flask.ext.sqlalchemy
import flask.ext.restless
from flask import request, redirect, url_for
from dbFunctions import dbQuery

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Artists, methods=['GET'])
manager.create_api(Songs, methods=['GET'])
manager.create_api(Albums, methods=['GET'])
manager.create_api(Genre, methods=['GET'])


# utility functions
def getDate(s, f="%d %b %Y, %H:%M"):
    return datetime.datetime.strptime(s, f).date().isoformat()


@app.route('/edit/<string:_type>/<int:_id>/', methods=['GET', 'POST'], strict_slashes=False)
def edit(_type, _id):
    if request.method == 'GET':
        artists = [tuple((a.Name, a.ArtistID)) for a in Artists.query.all()]
        songs   = [tuple((s.Name, s.SongID)) for s in Songs.query.all()]
        albums  = [tuple((al.Title, al.AlbumID)) for al in Albums.query.all()]
        tours   = [tuple((t.Name, t.TourID)) for t in Tours.query.all()]
        genre   = [tuple((g.Name, g.GID)) for g in Genre.query.all()]
        if _type == "artist":
            artists = Artists.query.filter(Artists.ArtistID == _id).first()
            artists.ArtistGenre
            info = artists.__dict__
        elif _type == "song":
            songs = Songs.query.filter(Songs.SongID == _id).first()
            songs.SongGenre
            info = songs.__dict__
        elif _type == "album":
            albums = Albums.query.filter(Albums.AlbumID == _id).first()
            info = albums.__dict__
        elif _type == "tour":
            tours = Tours.query.filter(Tours.TourID == _id).first()
            info = tours.__dict__ 
        return render_template('edit.html', _type = _type, info=info, artists=artists, songs=songs, albums=albums, tours=tours,
                                genre=genre)
    elif request.method == 'POST': # here starts editing or deleting
        if _type == 'artist':
            artist = Artists.query.filter(Artists.ArtistID == _id).first()
            if request.form['delete'] == 1:
                db.session.delete(artist)
                db.session.commit()
                return redirect("http://banddb.me")
            else:
                artist.Image = request.form['img']
                artist.Start_Time = request.form['start-time']
                artist.End_Time = request.form['end-time']   # use this to hold form content, delete will a param passed in form
# ---------------------------------
# check deleting relationship later
# ---------------------------------
                artist.ArtistGenre = None
                for gid in request.form['genres']:
                    artistGenre = Genre.query.filter(Genre.GID == gid).first()
                    artist.ArtistGenre.append(artistGenre)
                db.session.commit()
                return redirect("/artist-instance/{0}".format(artist.ArtistID))
        elif _type == 'song':
            song = Songs.query.filter(Songs.SongID == _id).first()
            if request.form['delete'] == 1:
                db.session.delete(song)
                db.session.commit()
                return redirect("http://banddb.me")
            else:
                song.Image = request.form['img']
                song.Creation_Date = request.form['release-date']
                song.Run_Time = request.form['run-time']
                song.Chart_Position = request.form['chart-position']
                song.SongGenre = None
                for gid in request.form['genres']:
                    songgenre = Genre.query.filter(Genre.GID == gid).first()
                    song.SongGenre.append(songgenre)
                artist = Artists.query.filter(Artists.ArtistID == song.ArtistID).first()
                artist.Songs.remove(song)
                db.commit()
                new_artist = Artists.query.filter(Artists.ArtistID == request.form['artist']).first()
                new_artist.Songs.append(song)
                db.commit()
                album = Albums.query.filter(Albums.AlbumID == song.Album).first()
                album.Songs.remove(song)
                db.commit()
                new_album = Albums.query.filter(Albums.AlbumID == request.form['album']).first()
                new_album.Songs.append(song)
                db.commit()
                return redirect("/song-instance/{0}".format(song.SongID))
        elif _type == 'album':
            album = Albums.query.filter(Albums.AlbumID == _id).first()
            if request.form['delete'] == 1:
                db.session.delete(album)
                db.session.commit()
                return redirect("http://banddb.me")
            else:
                album.Image = request.form['img']
                album.Year = request.form['year']
                album.US_Chart_Position = request.form['chart-position']
                artist = Artists.query.filter(Artists.ArtistID == album.ArtistID).first()
                artist.Albums.remove(album)
                db.commit()
                new_artist = Artists.query.filter(Artists.ArtistID == request.form['artist']).first()
                new_artist.Albums.append(album)
                db.commit()
                return redirect("/album-instance/{0}".format(album.AlbumID))
        elif _type == 'tour':
            tour = Tours.query.filter(Tous.TourID == _id).first()
            if request.form['delete'] == 1:
                db.session.delete(tour)
                db.commit()
                return redirect("http://banddb.me")
            else:
                tour.Image = request.form['img']
                tour.tDate = getDate(request.form['dates'])
                tour.Venue = request.form['venue']
                tour.Locations = request.form['locations']
                tour.TourLineUp = None
                for s in request.form['songs']:
                    song = Songs.query.filter(Songs.SongID == s).first()
                    tour.TourLineUp.append(song)
                artist = Artists.query.filter(Artists.ArtistID == tour.ArtistID).first()
                artist.Tours.remove(tour)
                db.commit()
                new_artist = Artists.query.filter(Artists.ArtistID == request.form['artist']).first()
                new_artist.Tours.append(tour)
                db.commit()
                return redirect("/tour-instance/{0}".format(tour.TourID))
# redirect after finishing editing or deleting

#request POST
#request.form['start_date']


@app.route('/add/<string:_type>', methods=['GET', 'POST'], strict_slashes=False)
def add(_type):
    if request.method == 'GET':
        artists = [tuple((a.Name, a.ArtistID)) for a in Artists.query.all()]
        songs   = [tuple((s.Name, s.SongID)) for s in Songs.query.all()]
        albums  = [tuple((al.Title, al.AlbumID)) for al in Albums.query.all()]
        tours   = [tuple((t.Name, t.TourID)) for t in Tours.query.all()]
        genre   = [tuple((g.Name, g.GID)) for g in Genre.query.all()]
        return render_template('add.html', _type=_type, artists=artists, songs=songs, albums=albums, tours=tours,
                                genre=genre)
    elif request.method == 'POST':
        if _type == 'artist':
            NewArtist = Artists(name=request.form['name'], image=request.form['img'],
                            start_time=request.form['start-year'], end_time=request.form['end-year'])
#            genre
            for gid in request.form['genres']:
                artistGenre = Genre.query.filter(Genre.GID == gid).first()
                NewArtist.ArtistGenre.append(artistGenre)
#            album
            if request.form['album'] != 0:
                artistAlbum = Albums.query.filter(Albums.AlbumID == request.form['album'])
                NewArtist.Albums.append(artistAlbum)
#            tour
            if request.form['tour'] != 0:
                artistTour = Tours.query.filter(Tours.TourID == request.form['tour'])
                NewArtist.Tous.append(artistTour)

            db.session.add(NewArtist)
            db.session.commit()
# -----------------------
# check redirection later          
# -----------------------
            return redirect("/artist-instance/{0}".format(NewArtist.ArtistID))
        elif _type == 'song':
            NewSong = NewSong = Songs(name=request.form['name'], 
                creation_date=getDate(request.form['release-date']), 
                run_time=getRunTime(request.form['run-time']), 
                image=request.form['img'], 
                chart_position=request.form['chart-position'])
#           genre
            for gid in request.form['genres']:
                songGenre = Genre.query.filter(Genre.GID == gid).first()
                NewSong.SongGenre.append(songGenre)
#           artist
            if request.form['artist'] != 0:
                artist = Artists.query.filter(Artists.ArtistID == request.form['artist'])
                artist.Songs.append(NewSong)
#           album
            if request.form['album'] != 0:
                album = Albums.query.filter(Albums.AlbumID == request.form['album'])
                album.Songs.append(NewSong)
            db.session.add(NewSong)
            db.session.commit()
            return redirect("/song-instance/{0}".format(NewSong.SongID))
        elif _type == 'album':
            NewAlbum = Albums(title=albumContent['name'], 
                year=getDate(albumContent['release-date']), 
                image=albumContent['img'], 
                us_chart_position=albumContent['chart-position'])
#           artist
            if request.form['artist'] != 0:
                artist = Artists.query.filter(Artists.ArtistID == request.form['artist'])
                artist.Albums.append(NewAlbum)
#           song
            for songid in request.form['song']:
                song = Songs.query.filter(Songs.SongID == songid)
                NewAlbum.Songs.append(song)
            db.session.add(NewAlbum)
            db.session.commit()
            return redirect("/album-instance/{0}".format(NewAlbum.AlbumID))
        elif _type == 'tour':
            NewTour = Tours(date=request.form['dates'], 
                            name=request.form['name'], 
                            image=request.form['img'],
                            venue=request.form['venue'], 
                            locations=request.form['locations'])
#           artist
            if request.form['artist'] != 0:
                artist = Artists.query.filter(Artists.ArtistID == request.form['artist'])
                artist.Tours.append(NewSong)
#           album
            if request.form['album'] != 0:
                album = Albums.query.filter(Albums.AlbumID == request.form['album'])
                album.Tours.append(NewSong)
            db.session.add(NewTour)
            db.session.commit()
            return redirect("/tour-instance/{0}".format(NewTour.TourID))


@app.route('/<path:path>')
def all_other(path):
    return render_template('index.html')


@app.route('/')
@app.route('/index')
def index():
    """
    Doc.

    Doc.
    """
    return render_template('index.html')



@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


# INFO


app.run(debug=True)
