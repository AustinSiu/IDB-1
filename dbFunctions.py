from dbModels import *


class dbQuery:
    """
    all query functions
    """
    def AllArtists(self):
        artists = Artists.query.all()
        artistsInfo = [a.__dict__ for a in artists]
        return artistsInfo # return a list of artist names in the form of <artist name>

    def ArtistByName(self, name):
        artist = Artists.query.filter(Artists.Name==name).all()
        artistsInfo = [a.__dict__ for a in artists]
        return artistsInfo # return a list of artist names in the form of <artist name>

    def ArtistByGenre(self, genre):
        artist = Artists.query.join(ArtistGenre).filter(Genre.Name==genre).all()
        artistsInfo = [a.__dict__ for a in artists]
        return artistsInfo

    def ArtistSongs(self, artist):
        songs = Songs.query.join(Artists).filter(Artists.Name==artist).all()
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def ArtistImage(self, artist):
        return Artists.query.filter(Artists.Name==artist).first().Image

    def AllSongs(self):
        songs = Songs.query.all()
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def SongByGenre(self, genre):
        songs = Songs.query.join(SongGenre).filter(Genre.Name==genre).all()
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def SongByAlbum(self, album):
        songs = Songs.query.join(Albums).filter(Albums.Title==album).all()
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def SongImage(self, song):
        return Songs.query.filter(Songs.Name==song).first().Image

    def AllAlbums(self):
        albums = Albums.query.all()
        albumsInfo = [al.__dict__ for al in albums]
        return albumsInfo

    def AlbumByArtist(self, artist):
        albums = Albums.query.join(Artists).filter(Artists.Name==artist).all()
        albumsInfo = [al.__dict__ for al in albums]
        return albumsInfo

    def AlbumImage(self, album):
        return Albums.query.filter(Albums.Title==album).first().Image

    def allGenre(self):
        genre = Genre.query.all()
        genreInfo = [g.__dict__ for g in genre]
        return genreInfo


class dbAdd():
    """
    all insertions
    """
#    def addArtist():

#    def addSong():

#    def addTour():

#    def addAlbum():
