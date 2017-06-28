from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import datetime

from initDB.py import *

engine = create_engine('')
base.metadata.bind = engine

Session = sessionmaker(bind=engine)
session = Session()

date_format = "%Y-%m-%d"
new_artist = Artist(Name = "dummy", Start_time = "2017-06-01")
session.add(new_artist)
session.flush()
new_song = Songs(, ArtistID = new_artist.ArtistID, )
session.add(new_song)
session.flush() #optional
session.commit()
