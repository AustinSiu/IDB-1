from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('templates/index.html')

app.run(debug=True)
