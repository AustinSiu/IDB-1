from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from initDB.py import *

engine = create_engine('')
base.metadata.bind = engine

Session = sessionmaker(bind=engine)
session = Session()

new_
