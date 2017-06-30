from dbModels import *


class dbQuery:
    """
    all query functions
    """
    def AllArtists():
        artists = Artists.query.all()
    	return artists
    def ArtistByName(name):
    	artist = Artists.query.filter_by(Name=name).all()
    	return artists
    def ArtistByStartTime(start_time):
    	artist = Artists.query.filter_by(Start_Time=start_time).all()
    	return artists
    def ArtistByEndTime(end_time):
    	artist = Artists.query.filter_by(End_Time=end_time).all()
    	return artists
    def ArtistByGenre(genre):
    	artist = Artists.query.filter_by(Genre=genre).all()
    	return artists
    def ArtistTop3Songs(artist):
    	songs = Artists.query.filter_by(Name=artist).get(1).Top_3_Songs
    	return songs

    def AllSongs():
        songs = Songs.query.all()
    	return songs
    def SongByGenre(genre):
    	songs = Songs.query.filter_by(Genre=genre).all()
    	return songs
    def SongByAlbum(album):
    	ID = Albums.query.filter_by(Name=album).get(1).AlbumID
    	songs = Songs.query.filter_by(AlbumID=ID).all()
    	return songs
    def SongByArtist(artist):
    	ID = Artists.query.filter_by(Name=artist).get(1).ArtistID
    	songs = Songs.query.filter_by(ArtistID=ID).all()
    	return songs
    def SongByLabel(label):
    	ID = Labels.query.filter_by(Name=label).get(1).LabelID
    	songs = Songs.query.filter_by(LabelID=ID).all()
    	return songs

    def allAlbums():
        albums = Albums.query.all()
        return albums
    def AlbumByArtist(artist):
    	ID = Artists.query.filter_by(Name=artist).get(1).ArtistID
    	albums = Albums.query.filter_by(ArtistID=ID).all()
    	return albums
    def AlbumByGenre(genre):
    	albums = Albums.query.filter_by(Genre=genre).all()
    	return albums


    def allGenre():
        genre = Genre.query.all()

    def allLabels():
        labels = Labels.query.all()

    def allTours():
        tours = Tours.query.all()
        return tours


class dbAdd():
    """
    all insertions
    """
    def addArtist():

    def addSong():

    def addTour():

    def addAlbum():
