from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/bands')
def bands():
	return render_template('search.html', model="bands")

@app.route('/people')
def people():
	return render_template('search.html', model="people")

@app.route('/albumns')
def albumns():
	return render_template('search.html', model="albumns")

@app.route('/tours')
def tours():
	return render_template('search.html', model="tours")

@app.route('/songs')
def songs():
	return render_template('search.html', model="songs")

app.run(debug=True)
