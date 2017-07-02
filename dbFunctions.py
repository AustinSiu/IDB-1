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
        return artist

    def ArtistByEndTime(end_time):
        artist = Artists.query.filter_by(End_Time=end_time).all()
        return artist

    def ArtistByGenre(genre):
        artist = Artists.query.filter_by(Genre=genre).all()
        return artist

    def ArtistSongs(artist):
        songs = Songs.query.join(Artists).filter(Artists.Name==artist).all()
        return songs

    def AllSongs():
        songs = Songs.query.all()
        return songs

    def SongByGenre(genre):
        songs = Songs.query.filter_by(Genre=genre).all()
        return songs

    def SongByAlbum(album):
        ID = Albums.query.filter_by(Name=album).first().AlbumID
        songs = Songs.query.filter_by(AlbumID=ID).all()
        return songs

    def SongByLabel(label):
        ID = Labels.query.filter_by(Name=label).first().LabelID
        songs = Songs.query.filter_by(LabelID=ID).all()
        return songs

    def AllAlbums():
        albums = Albums.query.all()
        return albums

    def AlbumByArtist(artist):
        ID = Artists.query.filter_by(Name=artist).first().ArtistID
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
#    def addArtist():

#    def addSong():

#    def addTour():

#    def addAlbum():
