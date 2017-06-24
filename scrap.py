
import spotipy
import sys
import pprint
import spotipy.util as util

bands = [
            {
                'name': '',
                'start_year': 0,
                'end_year': 0,
                'genre': '',
                'songs': [],
                'tours': [],
                'people': [],
                'albums': []
            }
        ]

people = [{'name': '',
           'birthday': '',
           'role': '',
           'origin': '',
           'bands': [],
           'albums': []
           }]

albums = [{'title': '',
           'year': 0,
           'chart_pos': 0,
           'label': '',
           'songs': [],
           'bands': []
           }]

tours = [{
        'venue': '',
        'location': '',
        'data': '',
        'lineup': '',
        'songs': [],
        'bands': [],
        'people': [],
        'albumns': []
        }]

songs = [{
        'name': '',
        'release_date': '',
        'run_time': 0,
        'chart_pos': 0,
        'genre': '',
        'bands': [],
        'albumns': []
        }]

scope = 'user-library-read'

if len(sys.argv) > 1:
    username = sys.argv[1]
else:
    print "Usage: %s username" % (sys.argv[0],)
    sys.exit()

token = util.prompt_for_user_token(username, scope)

if token:
    sp = spotipy.Spotify(auth=token)
    results = sp.current_user_saved_tracks()
    for item in results['items']:
        track = item['track']
        print track['name'] + ' - ' + track['artists'][0]['name']
else:
    print "Can't get token for", username

# export SPOTIPY_CLIENT_ID='f8bb2d9e87f44c03b81b944b704580c8'
# export SPOTIPY_CLIENT_SECRET='09dbb687342844c29ca5a909c07aba87'
# export SPOTIPY_REDIRECT_URI='http://localhost/'
