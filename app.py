"""
Doc.

Doc.
"""
from flask import Flask
from flask import render_template
app = Flask(__name__)


@app.route('/')
def index():
    """
    Doc.

    Doc.
    """
    return render_template('index.html')


@app.route('/bands')
def bands():
    """
    Doc.

    Doc.
    """
    return render_template('bands.html')


@app.route('/people')
def people():
    """
    Doc.

    Doc.
    """
    return render_template('people.html')


@app.route('/albums')
def albums():
    """
    Doc.

    Doc.
    """
    return render_template('albums.html')


@app.route('/tours')
def tours():
    """
    Doc.

    Doc.
    """
    return render_template('tours.html')


@app.route('/songs')
def songs():
    """
    Doc.

    Doc.
    """
    return render_template('songs.html')


# INFO

@app.route('/bands/info')
def bands_info():
    """
    Doc.

    Doc.
    """
    return render_template('bands-info.html')


@app.route('/people/info')
def people_info():
    """
    Doc.

    Doc.
    """
    return render_template('people-info.html')


@app.route('/albums/info')
def albums_info():
    """
    Doc.

    Doc.
    """
    return render_template('albums-info.html')


@app.route('/tours/info')
def tours_info():
    """
    Doc.

    Doc.
    """
    return render_template('tours-info.html')


@app.route('/songs/info')
def songs_info():
    """
    Doc.

    Doc.
    """
    return render_template('songs-info.html')


app.run(debug=True)
