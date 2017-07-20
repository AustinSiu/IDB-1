"""API Unittests."""

from unittest import main, TestCase
import requests
import json


class TestAPI (TestCase):
    """Test API code."""

    artistsURL = 'http://banddb.me/api/artists'
    songsURL = 'http://banddb.me/api/songs'
    albumsURL = 'http://banddb.me/api/albums'
    toursURL = 'http://banddb.me/api/tours'
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

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['ArtistID'], 2)

    def test_get_artist_by_name(self):
        """test_get_artist_by_name."""
        filters = [dict(name='Name', op='eq', val='Metallica')]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Name'], 'Metallica')

    def test_get_artists_img(self):
        """test_get_artists_img."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/9c75c892aaa828633077a3b2ef0b65ad.png')

    def test_get_artists_genres(self):
        """test_get_artists_genres."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        genres = response.json()['objects'][0]['ArtistGenre']
        genres = [g['Name'] for g in genres]
        self.assertEqual(genres, ['pop', 'dance', 'female vocalists'])

    def test_get_artists_albums(self):
        """test_get_artists_albums."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        albums = response.json()['objects'][0]['Albums']
        albums = [a['Title'] for a in albums]
        self.assertEqual(albums, ['In the Zone', 'Blackout', 'Greatest Hits: My Prerogative'])

    def test_get_artists_top_songs(self):
        """test_get_artists_top_songs."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        songs = response.json()['objects'][0]['TopSongs']
        songs = [s['Name'] for s in songs]
        self.assertEqual(songs, ['Womanizer', '...Baby One More Time', 'Toxic'])

    def test_get_start_time(self):
        """test_get_start_time."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Start_Time'], 1992)

    def test_get_end_time(self):
        """test_get_end_time."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['End_Time'], 2017)

    def test_get_tour(self):
        """test_get_tour."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Tours'][0]['Name'], "The Circus Starring Britney Spears")

    def test_get_artist_error(self):
        """test_get_artist_error."""
        filters = [dict(name='ArtistID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
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

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Name'], 'Taxman')

    def test_get_song_by_id(self):
        """test_get_song_by_id."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['ArtistID'], 1)

    def test_get_song_img(self):
        """test_get_song_img."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/300x300/938222f5dd7c4af1818c353234bcd9a7.png')

    def test_get_song_artist(self):
        """test_get_song_artist."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'Daft Punk')

    def test_get_song_release_date(self):
        """test_get_song_release_date."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Creation_Date'],
                         '2009-03-29')

    def test_get_song_runtime(self):
        """test_get_song_runtime."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Run_Time'], 223)

    def test_get_song_genre(self):
        """test_get_song_genre."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['SongGenre'][0]['Name'],
                         'electronic')

    def test_get_chart_pos(self):
        """test_get_chart_pos."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Chart_Position'],
                         91)

    def test_get_song_error(self):
        """test_get_song_error."""
        filters = [dict(name='SongID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
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

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Title'], '19')

    def test_get_album_by_id(self):
        """test_get_album_by_id."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['AlbumID'], 1)

    def test_get_album_img(self):
        """test_get_album_img."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://lastfm-img2.akamaized.net/i/u/53442bc27a314142a02d2df018b4161e.png')

    def test_get_album_artist(self):
        """test_get_album_artist."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'The Smiths')

    def test_get_album_release_date(self):
        """test_get_album_release_date."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Year'],
                         '2010-05-05')

    def test_get_album_songs(self):
        """test_get_album_songs."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        songs = response.json()['objects'][0]['Songs']
        songs = [s['Name'] for s in songs]
        self.assertEqual(songs, ['There Is a Light That Never Goes Out'])

    def test_get_album_chart_pose(self):
        """test_get_album_chart_pose."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['US_Chart_Position'],
                         8)

    def test_get_album_error(self):
        """test_get_album_error."""
        filters = [dict(name='AlbumID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['objects']), 0)
        self.assertEqual(response.json()['num_results'], 0)

    ###############
    # Tour Tests #
    ###############

    def test_get_tour_by_name(self):
        """test_get_tour_by_name."""
        filters = [dict(name='Name', op='eq', val='System of a Down Reunion Tour')]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Name'], 'System of a Down Reunion Tour')

    def test_get_tour_by_id(self):
        """test_get_tour_by_id."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['TourID'], 1)

    def test_get_tour_img(self):
        """test_get_tour_img."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Image'],
                         'https://upload.wikimedia.org/wikipedia/en/c/c6/HumanzTour2017.jpg')

    def test_get_tour_artist(self):
        """test_get_tour_artist."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'Gorillaz')

    def test_get_tour_dates(self):
        """test_get_tour_dates."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['tDate'],
                         '8 July 2017 - 16 December 2017')

    def test_get_tour_songs(self):
        """test_get_tour_songs."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        songs = response.json()['objects'][0]['TourLineUp']
        songs = [s['Name'] for s in songs]
        self.assertEqual(songs, ['Clint Eastwood', 'DARE', 'Feel Good Inc.'])

    def test_get_tour_error(self):
        """test_get_tour_error."""
        filters = [dict(name='TourID', op='eq', val=-1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['objects']), 0)
        self.assertEqual(response.json()['num_results'], 0)


if __name__ == "__main__":
    main()
