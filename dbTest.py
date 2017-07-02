from dbModels import *
from dbFunctions import *


db.drop_all()
db.create_all()

t = datetime.datetime(1990,1,1)
t_str = t.date()
a = Artists(name='jz', start_time=t_str,image='xxx')


b = Albums(title='shit', year=datetime.datetime.strptime("14 Jul 2008, 06:07", "%d %b %Y, %H:%M").date().isoformat(), image='bbb', us_chart_position=2)
a.Albums.append(b)

c = Songs(name='holy', creation_date=datetime.datetime(1999,2,1).date(), run_time=1, image='ccc', chart_position=2)
b.Songs.append(c)
a.Songs.append(c)

bb = Albums(title='shitty', year=datetime.datetime(1999,2,1).date(), image='bbb', us_chart_position=2)
a.Albums.append(bb)


g = Genre(name='BS')
a.ArtistGenre.append(g)

db.session.add(a)
db.session.commit()


aa = Artists(name='jza', start_time=t_str,image='xxx')
g2 = Genre(name='BS')

if Genre.query.filter(Genre.Name=='BS').count():
	aa.ArtistGenre.append(Genre.query.filter(Genre.Name=='BS').first())
else:
	aa.ArtistGenre.append(g2)

db.session.add(aa)
db.session.commit()


d = Songs.query.first().Creation_Date
print(d)

print(dbQuery.AllArtists())
print(dbQuery.AllAlbums())
print(dbQuery.ArtistSongs('jz'))