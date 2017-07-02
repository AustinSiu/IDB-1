"""
A Json Parser for insertions
"""

from dbModels import *

# connect database

# read json file

# parsing

# insertions

# close databases


# ***********
# playground
# ***********

import json
from pprint import pprint

with open('data.json') as data_file:
    data = json.load(data_file)

db.drop_all()
db.create_all()


def getDate(s, f="%d %b %Y, %H:%M"):
	return datetime.datetime.strptime(s, f).date().isoformat()

def getRunTime(s):
	return int(s) // 1000

# for artist, content in data['artists'].items():
# 	# construct artist
# 	NewArtist = Artists(name=content['name'],  image=content['img'])
# 	# genre info	
# 	for gr in content['genre']:
# 		if Genre.query.filter(Genre.Name==gr).count():
# 			NewArtist.ArtistGenre.append(Genre.query.filter(Genre.Name==gr).first())
# 		else:
# 			NewGenre = Genre(name=gr)
# 			NewArtist.ArtistGenre.append(NewGenre)

# 	# album info
# 	for a in content['albums']:
# 		if not a['id'] in data['albums']:
# 			continue

# 		albumInfo = data['albums'][a['id']]
# 		if Albums.query.filter(Albums.Title==albumInfo['name'] and Albums.Image==albumInfo['img']).count():
# 			NewArtist.Albums.append(Albums.query.filter(Albums.Title==albumInfo['name'] and Albums.Image==albumInfo['img']).first())
# 		else:
# 			NewAlbum = Albums(title=albumInfo['name'], year=getDate(albumInfo['release_date']), image=albumInfo['img'])
# 			NewArtist.Albums.append(NewAlbum)

# 	# top song info

# 	for s in content['songs']:
# 		if not s['id'] in data['songs']:
# 			continue

# 		songInfo = data['songs'][s['id']]
# 		if Songs.query.filter(Songs.Name==songInfo['name'] and Songs.Image==songInfo['img']).count():
# 			NewArtist.TopSongs.append(Songs.query.filter(Songs.Name==songInfo['name'] and Songs.Image==songInfo['img']).first())
# 		else:
# 			NewSong = Songs(name=songInfo['name'], creation_date=getDate(songInfo['release_date']), run_time=getRunTime(songInfo['run_time']), image=songInfo['img'])
			
# 			gr = songInfo['genre']
# 			if Genre.query.filter(Genre.Name==gr).count():
# 				NewSong.SongGenre.append(Genre.query.filter(Genre.Name==gr).first())
# 			else:
# 				NewGenre = Genre(name=gr)
# 				NewSong.SongGenre.append(NewGenre)

# 			NewArtist.TopSongs.append(NewSong)
# 			NewArtist.Songs.append(NewSong)


# 	db.session.add(NewArtist)
# 	db.session.commit()

for song, songContent in data['songs'].items():
	NewSong = Songs(name=songContent['name'], creation_date=getDate(songContent['release_date']), 
		run_time=getRunTime(songContent['run_time']), image=songContent['img'])
	
	gr = songContent['genre']
	if Genre.query.filter(Genre.Name==gr).count():
		NewSong.SongGenre.append(Genre.query.filter(Genre.Name==gr).first())
	else:
		NewGenre = Genre(name=gr)
		NewSong.SongGenre.append(NewGenre)

	albumInfo = data['songs'][songContent['album']['id']]
	if Albums.query.filter(Albums.Title==albumInfo['name'] and Albums.Image==albumInfo['img']).count():
		Albums.query.filter(Albums.Title==albumInfo['name'] and Albums.Image==albumInfo['img']).first().append(NewSong)
	else:
		NewAlbum = Albums(title=albumInfo['name'], year=getDate(albumInfo['release_date']), image=albumInfo['img'])
		NewAlbum.Songs.append(NewSong)

	artistInfo = data['artists'][songContent['artist']['id']]
	if Artists.query.filter(Artists.Name==artistInfo['name'] and Artists.Image==artistInfo['img']).count():
		Artists.query.filter(Artists.Name==artistInfo['name'] and Artists.Image==artistInfo['img']).first().append(NewSong)
	else:
		NewArtist = Artists(name=artistInfo['name'], image=artistInfo['img'])
		NewArtist.Songs.append(NewSong)
	db.session.add(NewSong)
	db.session.commit()



