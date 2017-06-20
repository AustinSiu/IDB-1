from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/bands')
def bands():
	return render_template('search.html', model=bands)


app.run(debug=True)
