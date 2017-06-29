"""DOC."""
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

bands = {123: "Metalica"}


class Bands(Resource):
    """DOC."""

    def get(self, band_id):
        """DOC."""
        return {band_id: bands[band_id]}


api.add_resource(Bands, '/api/band/<int:band_id>', '/api/bands/<int:band_id>')

if __name__ == '__main__':
    app.run(debug=True)
