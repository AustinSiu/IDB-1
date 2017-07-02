from dbModels import *


class dbQuery:
    """
    all query functions
    """
    def AllArtists(self):
        artists = Artists.query.all()
        for a in artists:
            a.ArtistGenre
        artistsInfo = [a.__dict__ for a in artists]
        return artistsInfo # return a list of dict of artist

    def ArtistByName(self, name):
        artists = Artists.query.filter(Artists.Name==name).all()
        for a in artists:
            a.ArtistGenre
        artistsInfo = [a.__dict__ for a in artists]
        return artistsInfo # return a list of dict of artist

    def ArtistGenre(self, artist):
        genre = Artists.query.filter(Artists.Name==artist).first().ArtistGenre
        return genre # return a list

    def ArtistByGenre(self, genre):
        artists = Artists.query.join(ArtistGenre).filter(Genre.Name==genre).all()
        for a in artists:
            a.ArtistGenre
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
        for s in songs:
            s.SongGenre
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def SongAlbum(self, song):
        albums = Albums.query.join(Songs).filter(Songs.Name==song).all()
        albumsInfo = [al.__dict__ for al in albums]
        return albumsInfo

    def SongByGenre(self, genre):
        songs = Songs.query.join(SongGenre).filter(Genre.Name==genre).all()
        for s in songs:
            s.SongGenre
        songsInfo = [s.__dict__ for s in songs]
        return songsInfo

    def SongByAlbum(self, album):
        songs = Songs.query.join(Albums).filter(Albums.Title==album).all()
        for s in songs:
            s.SongGenre
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

    def AllGenre(self):
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
