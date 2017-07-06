CREATE TABLE Bands
(
  BandName VARCHAR(100) NOT NULL,
  Start_Time DATE NOT NULL,
  End_Time DATE NOT NULL,
  BandID INT NOT NULL,
  PRIMARY KEY (BandID)
);

CREATE TABLE People
(
  Origin CHAR NOT NULL,
  Birthday DATE NOT NULL,
  First_Name VARCHAR(50) NOT NULL,
  Last_Name VARCHAR(50) NOT NULL,
  PeopleID INT NOT NULL,
  PRIMARY KEY (PeopleID)
);

CREATE TABLE Tours
(
  Venue VARCHAR(50) NOT NULL,
  Location(ZIPCode) INT NOT NULL,
  Date DATE NOT NULL,
  TourID INT NOT NULL,
  BandID INT NOT NULL,
  PRIMARY KEY (TourID),
  FOREIGN KEY (BandID) REFERENCES Bands(BandID)
);

CREATE TABLE BandMembers
(
  PeopleID INT NOT NULL,
  BandID INT NOT NULL,
  FOREIGN KEY (PeopleID) REFERENCES People(PeopleID),
  FOREIGN KEY (BandID) REFERENCES Bands(BandID)
);

CREATE TABLE GenreList
(
  Genre CHAR NOT NULL,
  GID INT NOT NULL,
  PRIMARY KEY (GID)
);

CREATE TABLE GenreBelong
(
  BandID INT NOT NULL,
  GID INT NOT NULL,
  FOREIGN KEY (BandID) REFERENCES Bands(BandID),
  FOREIGN KEY (GID) REFERENCES GenreList(GID)
);

CREATE TABLE LabelList
(
  LabelID INT NOT NULL,
  LabelName CHAR NOT NULL,
  PRIMARY KEY (LabelID)
);

CREATE TABLE RoleList
(
  RoleID INT NOT NULL,
  Role CHAR NOT NULL,
  PRIMARY KEY (RoleID)
);

CREATE TABLE Songs
(
  Name VARCHAR(50) NOT NULL,
  Creation_Date DATE NOT NULL,
  Chart_Position INT NOT NULL,
  Run_Time NUMERIC(2,2) NOT NULL,
  SongID INT NOT NULL,
  GID INT NOT NULL,
  PRIMARY KEY (SongID),
  FOREIGN KEY (GID) REFERENCES GenreList(GID)
);

CREATE TABLE Albums
(
  Title CHAR NOT NULL,
  Year DATE NOT NULL,
  US_Chart_Position INT NOT NULL,
  AlbumID INT NOT NULL,
  LabelID INT NOT NULL,
  PRIMARY KEY (AlbumID),
  FOREIGN KEY (LabelID) REFERENCES LabelList(LabelID)
);

CREATE TABLE Top_3_Songs
(
  BandID INT NOT NULL,
  SongID INT NOT NULL,
  FOREIGN KEY (BandID) REFERENCES Bands(BandID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

CREATE TABLE AlbumList
(
  AlbumID INT NOT NULL,
  SongID INT NOT NULL,
  FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

CREATE TABLE TourLineUp
(
  TourID INT NOT NULL,
  SongID INT NOT NULL,
  FOREIGN KEY (TourID) REFERENCES Tours(TourID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

CREATE TABLE Role
(
  PeopleID INT NOT NULL,
  RoleID INT NOT NULL,
  FOREIGN KEY (PeopleID) REFERENCES People(PeopleID),
  FOREIGN KEY (RoleID) REFERENCES RoleList(RoleID)
);