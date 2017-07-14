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
                         'https://lastfm-img2.akamaized.net/i/u/8b238225c5f341dfc10a1695a9cdf00c.png')

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
        self.assertEqual(genres, ['classic rock', 'rock', 'hard rock'])

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
        self.assertEqual(albums, ['Led Zeppelin IV', 'Led Zeppelin', 'Led Zeppelin II'])

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
        self.assertEqual(songs, ['Immigrant Song', 'Stairway to Heaven', 'Whole Lotta Love'])

    def test_get_start_time(self):
        """test_get_start_time."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Start_Time'], 1968)

    def test_get_end_time(self):
        """test_get_end_time."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['End_Time'], 1980)

    def test_get_tour(self):
        """test_get_tour."""
        filters = [dict(name='ArtistID', op='eq', val=2)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.artistsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Tours'][0]['Name'], "Scandinavia 1968")

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
                         'https://lastfm-img2.akamaized.net/i/u/300x300/ead294d0d6a74ad1b1df311ded396cbf.png')

    def test_get_song_artist(self):
        """test_get_song_artist."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'Taylor Swift')

    def test_get_song_release_date(self):
        """test_get_song_release_date."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Creation_Date'],
                         '2010-10-10')

    def test_get_song_runtime(self):
        """test_get_song_runtime."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Run_Time'], 241)

    def test_get_song_genre(self):
        """test_get_song_genre."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['SongGenre'][0]['Name'],
                         'country')

    def test_get_chart_pos(self):
        """test_get_chart_pos."""
        filters = [dict(name='SongID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.songsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Chart_Position'],
                         71)

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
                         'https://lastfm-img2.akamaized.net/i/u/43871b6b40f14f4d89360b68d9084802.png')

    def test_get_album_artist(self):
        """test_get_album_artist."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'Queen')

    def test_get_album_release_date(self):
        """test_get_album_release_date."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['Year'],
                         '2008-11-29')

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
        self.assertEqual(songs, [u'Sweet Lady', 'God Save the Queen', 'Lazing on a Sunday Afternoon', "'39", 'Bohemian Rhapsody', 'Love of My Life', "I'm in Love With My Car", 'Seaside Rendezvous', "The Prophet's Song", 'Good Company'])

    def test_get_album_chart_pose(self):
        """test_get_album_chart_pose."""
        filters = [dict(name='AlbumID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.albumsURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['US_Chart_Postion'],
                         71)

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
                         'https://upload.wikimedia.org/wikipedia/commons/5/54/System_Of_A_Down_en_Chile_2011.jpg')

    def test_get_tour_artist(self):
        """test_get_tour_artist."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['artist']['Name'],
                         'System of a Down')

    def test_get_tour_dates(self):
        """test_get_tour_dates."""
        filters = [dict(name='TourID', op='eq', val=1)]
        params = dict(q=json.dumps(dict(filters=filters)))
        response = requests.get(self.toursURL,
                                params=params,
                                headers=self.headers)

        # self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['objects'][0]['tDate'],
                         'May 10, 2011 - October 7, 2011')

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
        self.assertEqual(songs, ['Lonely Day', 'Toxicity'])

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
