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
    return render_template('search.html', model="bands")


@app.route('/people')
def people():
    """
    Doc.

    Doc.
    """
    return render_template('search.html', model="people")


@app.route('/albums')
def albums():
    """
    Doc.

    Doc.
    """
    return render_template('search.html', model="albums")


@app.route('/tours')
def tours():
    """
    Doc.

    Doc.
    """
    return render_template('search.html', model="tours")


@app.route('/songs')
def songs():
    """
    Doc.

    Doc.
    """
    return render_template('search.html', model="songs")


app.run(debug=True)
