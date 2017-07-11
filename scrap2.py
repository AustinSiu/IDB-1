"""Scrapper."""
import json
import requests
import traceback
import pprint
import wikipedia
import re
import uuid
from random import randint

key = "4052bb9ce9df1086a8155f7af21a52b6"
result = {'artists': {}, 'albums': {}, 'tours': [], 'songs': {}}
pp = pprint.PrettyPrinter(indent=4)


def getJSON(url):
    """Get the JSON result from the URL."""
    response = requests.get(url)
    return json.loads(response.text)


def save():
    """Save the file."""
    with open('data.txt', 'w') as outfile:
        json.dump(result, outfile)


def fail():
    print('NOT VALID')


def isDataValid(d):
    for a in d['artists']:
        a = d['artists'][a]
        for s in a['songs']:
            if s['id'] not in d['songs']:
                fail()
                return
        for album in a['albums']:
            if album['id'] not in d['albums']:
                fail()
                return
        if len(a['songs']) <= 0 or len(a['albums']) <= 0:
            fail()
            return

    for s in d['songs']:
        s = d['songs'][s]
        if s['artist']['id'] not in d['artists']:
            fail()
            return
        if s['album']['id'] not in d['albums']:
            fail()
            return

    for a in d['albums']:
        a = d['albums'][a]
        if a['artist']['id'] not in d['artists']:
            fail()
            return
        for s in a['songs']:
            if s['id'] not in d['songs']:
                fail()
                return
        if len(a['songs']) <= 0:
            fail()
            return

    print('VALID!')

def clean(data):
    # Remove song if its artist DNE
    data['songs'] = {x: data['songs'][x] for x in data['songs']
                     if data['songs'][x]['artist']['id'] in data['artists']}
    # Remove song if its album DNE
    data['songs'] = {x: data['songs'][x] for x in data['songs']
                     if data['songs'][x]['album']['id'] in data['albums']}

    # Remove album if its artist DNE
    data['albums'] = {x: data['albums'][x] for x in data['albums']
                      if data['albums'][x]['artist']['id'] in data['artists']}
    # Remove song from album if song DNE
    for album in data['albums']:
        album = data['albums'][album]
        album['songs'] = [x for x in album['songs']
                          if x['id'] in data['songs']]
    # Remove album is there are zero songs
    data['albums'] = {x: data['albums'][x] for x in data['albums']
                      if len(data['albums'][x]['songs']) > 0}

    # GOOD CODE...COMMENTED B/C I ONLY NEEDED TO RUN IT ONCE.
    # # Add label from wikipedia
    # for a in data['albums']:
    #     data['albums'][a]['label'] = 'No Labels'
    #     try:
    #         album = data['albums'][a]
    #         html = wikipedia.WikipediaPage(album['name']).html()
    #         html = re.findall("<tr>.{0,100}Labels?.*?tr>", html, re.S)
    #         if html:
    #             labels = re.findall('title="(.*?)"', html[0])
    #             labels = [x for x in labels if x != 'Record label']
    #             labels = ', '.join(labels)
    #             data['albums'][a]['label'] = labels
    #     except wikipedia.DisambiguationError:
    #         pass
    #     # print(data['albums'][a]['label'])


    for artist in data['artists']:
        artist = data['artists'][artist]
        # Remove album from artist if album DNE
        artist['albums'] = [x for x in artist['albums'] if x['id'] in data['albums']]
        # Remove song from artist if song DNE
        artist['songs'] = [x for x in artist['songs'] if x['id'] in data['songs']]
    # Remove artist if there are zero songs
    data['artists'] = {x: data['artists'][x] for x in data['artists'] if len(data['artists'][x]['songs']) > 0}
    # Remove artist if there are zero albums
    data['artists'] = {x: data['artists'][x] for x in data['artists'] if len(data['artists'][x]['albums']) > 0}

    # GOOD CODE...COMMENTED B/C I ONLY NEEDED TO RUN IT ONCE.
    # for a in data['artists']:
    #     id = str(uuid.uuid4())
    #     data['artists'][a]['tours'] += [{'id': id, 'name': ''}]
    #     data['tours'][id] = {'id': id,
    #                          'name': '',
    #                          'venue': '',
    #                          'locations': '',
    #                          'dates': '',
    #                          'img': '',
    #                          'songs': data['artists'][a]['songs'],
    #                          'artist': {'id': data['artists'][a]['id'],
    #                                     'name': data['artists'][a]['name']}
    #                          }


data = None
# Reading data back
with open('data.json', 'r') as f:
    data = json.load(f)

clean(data)
clean(data)

isDataValid(data)

# Writing JSON data
with open('data.json', 'w') as f:
    json.dump(data, f)
