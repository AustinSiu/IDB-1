from dbModels import *


class dbQuery:
    """
    all query functions
    """
    def allArtists():
        artists = Artists.query().all()
        # sort

    def allSongs():
        songs = Songs.query().all()

    def allTours():
        tours = Tours.query().all()

    def allAlbums():
        albums = Albums.query().all()

    def allGenre():
        genre = Genre.query().all()

    def allLabels():
        labels = Labels.query().all()


class dbAdd():
    """
    all insertions
    """
    def addArtist():

    def addSong():

    def addTour():

    def addAlbum():
