import flask
import flask_sqlalchemy
import flask_restless
from dbModels import *

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Artists, methods=['GET'])
manager.create_api(Songs, methods=['GET'])
manager.create_api(Albums, methods=['GET'])

# start the flask loop