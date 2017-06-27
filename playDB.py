from sqlalchemy import create_engine
from sqlalchemy import Column, String, Date, Integer, Numeric, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_string = "postgres://localhost:5432/test"
db = create_engine(db_string)
base = declarative_base()

class Bands(base):
    __tablename__ = "Bands"

    BandName = Column(String(length=100), nullable = False)
    Start_time = Column(Date, nullable = False)
    End_time = Column(Date, nullable = False)
    BandID = Column(Integer, nullable = False, primary_key = True)

class People(base):
    __tablename__ = "People"

    Origin = Column(String, nullable = False)
    Birthday = Column(Date, nullable = False)
    First_Name = Column(String(length=50), nullable = False)
    Last_Name = Column(String(length=50), nullable = False)
    PeopleID = Column(Integer, nullable = False, primary_key = True)

class Tours(base):
    __tablename__ = "Tours"

    Venue = Column(String(length=50), nullable = False)
    Location = Column(Integer, nullable = False)
    tDate = Column(Date, nullable = False)
    TourID = Column(Integer, nullable = False, primary_key = True)
    BandID = Column(Integer, ForeignKey("Bands.BandID"), nullable = False)

class BandMembers(base):
    __tablename__ = "BandMembers"

    bmID = Column(Integer, primary_key = True, nullable = False)
    PeopleID = Column(Integer, ForeignKey("People.PeopleID"), nullable = False)
    BandID = Column(Integer, ForeignKey("Bands.BandID"), nullable = False)

class GenreList(base):
    __tablename__ = "GenreList"

    Genre = Column(String, nullable = False)
    GID = Column(Integer, nullable = False, primary_key = True)

class GenreBelong(base):
    __tablename__ = "GenreBelong"

    gbID = Column(Integer, nullable = False, primary_key = True)
    BandID = Column(Integer, ForeignKey("Bands.BandID"), nullable = False)
    GID = Column(Integer, ForeignKey("GenreList.GID"), nullable = False)

class LabelList(base):
    __tablename__ = "LabelList"

    LabelID = Column(Integer, nullable = False, primary_key = True)
    LabelName = Column(String, nullable = False)

class RoleList(base):
    __tablename__ = "RoleList"

    RoleID = Column(Integer, nullable = False, primary_key = True)
    Role = Column(String, nullable = False)

class Songs(base):
    __tablename__ = "Songs"

    SongID = Column(Integer,  nullable = False, primary_key = True)
    GID = Column(Integer, ForeignKey("GenreList.GID"), nullable = False)
    Name = Column(String(length=50), nullable = False)
    Creation_Date = Column(Date, nullable = False)
    Chart_Position = Column(Integer, nullable = False)
    Run_Time = Column(Numeric(scale = 2), nullable = False)

class Albums(base):
    __tablename__ = "Albums"

    AlbumID = Column(Integer, nullable = False, primary_key = True)
    LabelID = Column(Integer, ForeignKey("LabelList.LabelID"), nullable = False)
    Title = Column(String, nullable = False)
    Year = Column(Date, nullable = False)
    US_Chart_Postion = Column(Integer, nullable = False)

class Top_3_Songs(base):
    __tablename__ = "Top_3_Songs"

    t3sID = Column(Integer, nullable = False, primary_key = True)
    BandID = Column(Integer, ForeignKey("Bands.BandID"), nullable = False)
    SongID = Column(Integer, ForeignKey("Songs.SongID"), nullable = False)

class AlbumList(base):
    __tablename__ = "AlbumList"

    alID = Column(Integer, nullable = False, primary_key = True)
    AlbumID = Column(Integer, ForeignKey("Albums.AlbumID"), nullable = False)
    SongID  = Column(Integer, ForeignKey("Songs.SongID"), nullable = False)

class TourLineUp(base):
    __tablename__  = "TourLineUp"

    tluID = Column(Integer, nullable = False, primary_key = True)
    TourID = Column(Integer, ForeignKey("Tours.TourID"), nullable = False)
    SongID = Column(Integer, ForeignKey("Songs.SongID"), nullable = False)

class Role(base):
    __tablename__ = "Role"

    rID = Column(Integer, nullable = False, primary_key = True)
    PeopleID = Column(Integer, ForeignKey("People.PeopleID"), nullable = False)
    RoleID   = Column(Integer, ForeignKey("RoleList.RoleID"), nullable = False)


Session = sessionmaker(db)
session = Session

base.metadata.create_all(db)
