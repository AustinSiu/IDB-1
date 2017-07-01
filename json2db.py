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

for artist, content in data['artists'].items():
	# construct artist
	NewArtist = Artists(name=content['name'], start_time=content['active']['end'], image=content['image'])
	
	if content['genre'] in Genre.query.all():
		g = Genre.query.filter_by(Name==content['genre']).first()
		NewArtist.Genre.append(g)
	else
		NewGenre = Genre(name=content['genre'])
		NewArtist.Genre.append(NewGenre)

	for album, al_content in data['albums'].items():
		if al_content['artist']['id'] == artist:
			NewAlbum = Albums(title=al_content['name'], year=al_content['year'], us_chart_position=, image=)
			NewArtist.Albums.append(NewAlbum)

			if al_content['genre'] in Genre.query.all():
				g = Genre.query.filter_by(Name==content['genre']).first()
				NewAlbum.Genre.append(g)
			else
				NewGenre = Genre(name=content['genre'])
				NewAlbum.Genre.append(NewGenre)

			if al_content['label'] in Labels.query.all():
				l = Labels.query.filter_by(Name==content['label']).first()
				NewAlbum.Labels.append(l)
			else
				NewLabel = Labels(name=content['label'])
				NewAlbum.Labels.append(NewLabel)


			for song, s_content in data['songs']:
				if s_content['album']['id'] == album:
					NewSong = Songs(name=, creation_date=, run_time=, image=, chart_position=)
					NewAlbum.Songs.append(NewSong)
					NewArtist.Songs.append(NewSong)
					if song in content['songs']:
						NewArtist.Top_3_Songs.append(NewSongs)
	db.session.add(NewArtist)

db.session.commit()






