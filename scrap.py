"""Scrapper."""
import json
import requests
import traceback
import pprint

key = "4052bb9ce9df1086a8155f7af21a52b6"
result = {'artists': {}, 'albums': {}, 'tours': [], 'songs': {}}
pp = pprint.PrettyPrinter(indent=4)


def getArtistGenre(id):
    try:
        URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags'\
              '&mbid=%s&api_key=%s&format=json' % (id, key)
        data = getJSON(URL)
        result = [tag['name'] for tag in data['toptags']['tag']]
        return result[:3]
        # return list(itertools.islice(result, 3))
    except KeyError as e:
        raise KeyError('Error getting artist genres.', e)


def getArtistSongs(id):
    try:
        URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&'\
              'mbid=%s&limit=3&api_key=%s&format=json' % (id, key)
        data = getJSON(URL)
        result = [{'id': t['mbid'], 'name': t['name']} for t
                  in data['toptracks']['track']]
        # return list(itertools.islice(result, 3))
        return result[:3]
    except KeyError as e:
        raise KeyError('Error getting artists songs.', e)


def getArtistAlbumns(id):
    try:
        URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&'\
              'mbid=%s&limit=3&api_key=%s&format=json' % (id, key)
        data = getJSON(URL)
        result = [{'id': a['mbid'], 'name': a['name']} for a
                  in data['topalbums']['album']]
        # return list(itertools.islice(result, 3))
        return result[:3]
    except KeyError as e:
        raise KeyError('Error getting artists albums.', e)


def getArtistImg(id):
    try:
        URL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&'\
              'mbid=%s&api_key=%s&format=json' % (id, key)
        data = getJSON(URL)
        return data['artist']['image'][4]['#text']
    except KeyError as e:
        raise KeyError('Error getting artist image.', e)


def getAlbumSongs(names, artist):
    result = []
    for s in names:
        try:
            URL = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo'\
                  '&api_key=%s&artist=%s&track=%s'\
                  '&format=json' % (key, artist, s)
            data = getJSON(URL)['track']
            # pp.pprint(data)
            result += [{'id': data['mbid'], 'name': data['name']}]
        except KeyError as e:
            # raise KeyError('Error creating songs from album.', e)
            pass
        except ValueError:
            raise KeyError
    return result


def songExists(id):
    for v in result['songs']:
        if v == id:
            return True
    return False


def albumExists(id):
    for v in result['albums']:
        if v == id:
            return True
    return False


def artistExists(id):
    for v in result['artists']:
        if v == id:
            return True
    return False


def createArtists():
    limit = 5
    data = getJSON('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartis'
                   'ts&limit=%i&api_key=%s&format=json' % (limit, key))
    for a in data['artists']['artist']:
        print('@@ Creating Artists... @@')
        try:
            artist = {}
            artist['id'] = a['mbid']                                # Last.fm
            artist['name'] = a['name']                              # Last.fm
            artist['active'] = {'start': -1, 'end': -1}             # Wikipedia
            artist['genre'] = getArtistGenre(artist['id'])          # Last.fm
            artist['songs'] = getArtistSongs(artist['id'])          # Last.fm
            artist['tours'] = []                                    # Wikipedia
            artist['albums'] = getArtistAlbumns(artist['id'])       # Last.fm
            artist['img'] = getArtistImg(artist['id'])              # Last.fm
            # pp.pprint(artist)

            # print('@@ Artist has %i songs and %i albums @@' % (len(artist['songs']), len(artist['albums'])))
            # print('Songs', [s['id'] for s in artist['songs']])
            # print('Albums', [a['id'] for a in artist['albums']])
            # print('@@ Making Songs @@')
            # print('@@@@@@@@@@@@@@@@@@@@@ AAAAAA @@@@@@@@@@@@@@@@@@@@@')
            songs = [s['id'] for s in artist['songs']]
            # print(songs)
            for s in songs:
                try:
                    song = createSong(s)
                    album = createAlbum(
                        song['album']['id'], song['artist']['id'], song['artist']['name'])
                    for ms in album['songs']:
                        createSong(ms['id'])
                except KeyError:
                    pass
                except TypeError:
                    pass

            # print('@@@@@@@@@@@@@@@@@@@@@ BBBBBB @@@@@@@@@@@@@@@@@@@@@')
            albums = [a['id'] for a in artist['albums']]
            # print(albums)
            for a in albums:
                try:
                    album = createAlbum(a, artist['id'], artist['name'])
                    for s in album['songs']:
                        createSong(s['id'])
                except KeyError:
                    pass
                except TypeError:
                    pass

            # print('@@ FINISHED @@')

            result['artists'][artist['id']] = artist
            print('@@ Artists successfully added! @@')
        except KeyError as e:
            print('@@ Artists creation failed! @@')
            print("Log:", e)


def createSong(s):
    print('## Creating song %s ##' % s)
    if songExists(s):
        print('## Song %s aready existed. ##' % s)
        return
    URL = 'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&'\
          'mbid=%s&api_key=%s&track=believe&'\
          'format=json' % (s, key)
    data = getJSON(URL)['track']
    try:
        song = {}

        song['id'] = data['mbid']                            # Last.fm
        song['name'] = data['name']                          # Last.fm
        song['release_date'] = data['wiki']['published']     # Last.fm
        song['chart_pos'] = -1                               # Wiki
        song['run_time'] = data['duration']                  # Last.fm
        song['genre'] = data['toptags']['tag'][0]['name']    # Last.fm
        song['artist'] = {'id': data['artist']['mbid'],      # Last.fm
                          'name': data['artist']['name']}
        song['img'] = data['album']['image'][3]['#text']     # Last.fm
        song['album'] = {'id': data['album']['mbid'],        # Last.fm
                         'name': data['album']['title']}

        result['songs'][data['mbid']] = song
        # pp.pprint(song)
        # pp.pprint(song)
        # print('## Song successfully added! ##')

        return song
        # createAlbum(song['album']['id'], song['artist']['id'], song['artist']['name'])
    except KeyError as e:
        print('## Song creation failed! ##')
        del result['songs'][data['mbid']]
        raise KeyError('Error creating song.', e)
    return None


def createAlbum(a, artist_id, artist_name):
    print('$$ Creating album %s $$' % a)
    if albumExists(a):
        print('Album %s aready existed.' % a)
        return
    URL = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo'\
          '&mbid=%s&api_key=%s&album=Believe&'\
          'format=json' % (a, key)
    data = getJSON(URL)['album']
    try:
        album = {}

        album['id'] = a                                     # Last.fm
        album['name'] = data['name']                        # Last.fm
        album['release_date'] = data['wiki']['published']   # Last.fm
        album['chart_pos'] = -1                             # Wikipedia
        album['label'] = ''                                 # Wikipedia
        album['artist'] = {'id': artist_id,                 # Last.fm
                           'name': artist_name}
        album['img'] = data['image'][4]['#text']            # Last.fm
        songNames = [s['name'] for s in data['tracks']['track']]
        album['songs'] = getAlbumSongs(songNames,           # Last.fm
                                       album['artist']['name'])

        result['albums'][a] = album
        # pp.pprint(album)
        # print('$$ Album successfully added! $$')

        return album

        # songs = [s['id'] for s in album['songs']]
        # for s in songs:
        #     createSong(s)
    except KeyError as e:
        print('$$ Album creation failed! $$')
        # traceback.print_exc()
        del result['albums'][a]
        raise KeyError('Error creating album', e)


def getJSON(url):
    """Get the JSON result from the URL."""
    response = requests.get(url)
    return json.loads(response.text)


def save():
    """Save the file."""
    with open('data.txt', 'w') as outfile:
        json.dump(result, outfile)


def testJSON():
    failed = False
    for a in result['artists']:
        artist = result['artists'][a]
        for album in artist['albums']:
            albumID = album['id']
            if not albumExists(albumID):
                print('Album %s DNE for Artist %s' % (albumID, a))
                failed = True
        for song in artist['songs']:
            songID = song['id']
            if not songExists(songID):
                print('Song %s DNE for Artist %s' % (songID, a))
                failed = True

    for s in result['songs']:
        artistID = result['songs'][s]['artist']['id']
        if not artistExists(artistID):
            print('Artist %s DNE for song %s' % (artistID, s))
            failed = True
        albumID = result['songs'][s]['album']['id']
        if not albumExists(albumID):
            print('Album %s DNE for song %s' % (albumID, s))
            failed = True

    for a in result['albums']:
        album = result['albums'][a]
        artistID = result['albums'][a]['artist']['id']
        if not artistExists(artistID):
            print('Artist %s DNE for Album %s' % (artistID, a))
            failed = True
        for song in album['songs']:
            songID = song['id']
            if not songExists(songID):
                print('Song %s DNE for Album %s' % (songID, a))
                failed = True

    if not failed:
        print('JSON file is VALID!')
    else:
        print('JSON file is NOT VALID!')


try:
    createArtists()
    save()
    testJSON()
except Exception as e:
    print("Something when wrong! Saving...")
    print(e)
    traceback.print_exc()
    save()
