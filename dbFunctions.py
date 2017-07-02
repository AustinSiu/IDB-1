from dbModels import *


class dbQuery:
    """
    all query functions
    """
    def AllArtists(self):
        artists = Artists.query.all()
        return artists # return a list of artist names in the form of <artist name>

    def ArtistByName(self, name):
        artist = Artists.query.filter(Artists.Name==name).all()
        return artists # return a list of artist names in the form of <artist name>

    def ArtistByGenre(self, genre):
        artist = Artists.query.join(ArtistGenre).filter(Genre.Name==genre).all()
        return artists

    def ArtistSongs(self, artist):
        songs = Songs.query.join(Artists).filter(Artists.Name==artist).all()
        return songs

    def AllSongs(self):
        songs = Songs.query.all()
        return songs

    def SongByGenre(self, genre):
        songs = Songs.query.join(SongGenre).filter(Genre.Name==genre).all()
        return songs

    def SongByAlbum(self, album):
        songs = Songs.query.join(Albums).filter(Albums.Name==album).all()
        return songs

    def AllAlbums(self):
        albums = Albums.query.all()
        return albums

    def AlbumByArtist(self, artist):
        albums = Albums.query.join(Artists).filter(Artistd.Name==artist).all()
        return albums

    def AlbumByGenre(self, genre):
        albums = Albums.query.join(AlbumGenre).filter(Genre.Name==genre).all()
        return albums

    def allGenre(self):
        genre = Genre.query.all()


class dbAdd():
    """
    all insertions
    """
#    def addArtist():

#    def addSong():

#    def addTour():

#    def addAlbum():
