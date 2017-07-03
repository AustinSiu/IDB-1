"""API Unittests."""

from unittest import main, TestCase
import requests
import json


class TestAPI (TestCase):
    """Test API code."""

    artistsURL = 'http://banddb.me/api/artists'
    songsURL = 'http://banddb.me/api/songs'
    albumsURL = 'http://banddb.me/api/albums'
    headers = {'Content-Type': 'application/json'}

    ################
    # Artist Tests #
    ################

    def test_get_artist_by_id(self):
        """test_get_artist_by_id."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['ArtistID'], 2)

    def test_get_artist_by_name(self):
        """test_get_artist_by_name."""
        filters = [dict(name='Name', op='eq', val='Metallica')]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Name'], 'Metallica')

    def test_get_artists_img(self):
        """test_get_artists_img."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/'
                         'd6549455318c4928bc3055d821827258.png')

    def test_get_artists_genres(self):
        """test_get_artists_genres."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        genres = response.json()['objects'][0]['ArtistGenre']
        genres = [g['Name'] for g in genres]
        self.assertEqual(genres, ['thrash metal', 'metal', 'heavy metal'])

    def test_get_artists_albums(self):
        """test_get_artists_albums."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        albums = response.json()['objects'][0]['Albums']
        albums = [a['Title'] for a in albums]
        self.assertEqual(albums, ['Master of Puppets',
                                  'Ride the Lightning',
                                  'Metallica'])

    def test_get_artists_top_songs(self):
        """test_get_artists_top_songs."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        songs = response.json()['objects'][0]['TopSongs']
        songs = [s['Name'] for s in songs]
        self.assertEqual(songs, ['Master of Puppets',
                                 'Nothing Else Matters',
                                 'Enter Sandman'])

    def test_get_artist_error(self):
        """test_get_artist_error."""
        filters = [dict(name='ArtistID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['objects']), 0)
        self.assertEqual(response.json()['num_results'], 0)

    ##############
    # Song Tests #
    ##############

    def test_get_song_by_name(self):
        """test_get_song_by_name."""
        filters = [dict(name='Name', op='eq', val='Taxman')]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Name'], 'Taxman')

    def test_get_song_by_id(self):
        """test_get_song_by_id."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['ArtistID'], 1)

    def test_get_song_img(self):
        """test_get_song_img."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/300x300/'
                         'fafc74a8f45241acc10158be6e2d8270.png')

    def test_get_song_artist(self):
        """test_get_song_artist."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'The Beatles')

    def test_get_song_release_date(self):
        """test_get_song_release_date."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Creation_Date'],
                         '2014-12-08')

    def test_get_song_runtime(self):
        """test_get_song_runtime."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Run_Time'], 156)

    def test_get_song_genre(self):
        """test_get_song_genre."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['SongGenre'][0]['Name'],
                         'classic rock')

    def test_get_song_error(self):
        """test_get_song_error."""
        filters = [dict(name='SongID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['objects']), 0)
        self.assertEqual(response.json()['num_results'], 0)

    ###############
    # Album Tests #
    ###############

    def test_get_album_by_name(self):
        """test_get_album_by_name."""
        filters = [dict(name='Title', op='eq', val='19')]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Title'], '19')

    def test_get_album_by_id(self):
        """test_get_album_by_id."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['AlbumID'], 1)

    def test_get_album_img(self):
        """test_get_album_img."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/'
                         'b981d2efc62719fc76dfe1ceee8dc9bc.png')

    def test_get_album_artist(self):
        """test_get_album_artist."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'Adele')

    def test_get_album_release_date(self):
        """test_get_album_release_date."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Year'],
                         '2008-08-17')

    def test_get_album_songs(self):
        """test_get_album_songs."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        songs = response.json()['objects'][0]['Songs']
        songs = [s['Name'] for s in songs]
        self.assertEqual(songs, ['Daydreamer'])

    def test_get_album_error(self):
        """test_get_album_error."""
        filters = [dict(name='AlbumID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['objects']), 0)
        self.assertEqual(response.json()['num_results'], 0)


if __name__ == "__main__":
    main()
