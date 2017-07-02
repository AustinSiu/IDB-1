CREATE TABLE GenreList
(
  Genre CHAR NOT NULL,
  GID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (GID)
);

CREATE TABLE LabelList
(
  LabelID INT NOT NULL AUTO_INCREMENT,
  LabelName CHAR NOT NULL,
  PRIMARY KEY (LabelID)
);

CREATE TABLE Artists
(
  ArtistID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  Start_Time DATE NOT NULL,
  End_Time DATE NOT NULL,
  PRIMARY KEY (ArtistID)
);

CREATE TABLE Tours
(
  Venue VARCHAR(50) NOT NULL,
  Location(ZIPCode) INT NOT NULL,
  Date DATE NOT NULL,
  TourID INT NOT NULL AUTO_INCREMENT,
  ArtistID INT NOT NULL,
  PRIMARY KEY (TourID),
  FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE Songs
(
  Name VARCHAR(50) NOT NULL,
  Creation_Date DATE NOT NULL,
  Chart_Position INT NOT NULL,
  Run_Time NUMERIC(2,2) NOT NULL,
  SongID INT NOT NULL AUTO_INCREMENT,
  GID INT NOT NULL,
  ArtistID INT NOT NULL,
  PRIMARY KEY (SongID),
  FOREIGN KEY (GID) REFERENCES GenreList(GID),
  FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE Albums
(
  Title CHAR NOT NULL,
  Year DATE NOT NULL,
  US_Chart_Position INT NOT NULL,
  AlbumID INT NOT NULL AUTO_INCREMENT,
  LabelID INT NOT NULL,
  ArtistID INT NOT NULL,
  PRIMARY KEY (AlbumID),
  FOREIGN KEY (LabelID) REFERENCES LabelList(LabelID),
  FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE GenreBelong
(
  gbID INT NOT NULL AUTO_INCREMENT,
  GID INT NOT NULL,
  ArtistID INT NOT NULL,
  PRIMARY KEY (gbID),
  FOREIGN KEY (GID) REFERENCES GenreList(GID),
  FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE Top_3_Songs
(
  t3sID INT NOT NULL AUTO_INCREMENT,
  SongID INT NOT NULL,
  ArtistID INT NOT NULL,
  PRIMARY KEY (t3sID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID),
  FOREIGN KEY (ArtistID) REFERENCES Artists(ArtistID)
);

CREATE TABLE AlbumList
(
  alID INT NOT NULL AUTO_INCREMENT,
  AlbumID INT NOT NULL,
  SongID INT NOT NULL,
  PRIMARY KEY (alID),
  FOREIGN KEY (AlbumID) REFERENCES Albums(AlbumID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

CREATE TABLE TourLineUp
(
  tluID INT NOT NULL AUTO_INCREMENT,
  TourID INT NOT NULL,
  SongID INT NOT NULL,
  PRIMARY KEY (tluID),
  FOREIGN KEY (TourID) REFERENCES Tours(TourID),
  FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);
Copy