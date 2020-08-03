from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['CORS_ALLOW_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
ma = Marshmallow(app)

from .routes import main
app.register_blueprint(main)