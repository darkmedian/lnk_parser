from flask import Flask, render_template
from flask.ext.bootstrap import Bootstrap
from config import config, Config

bootstrap = Bootstrap()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    bootstrap.init_app(app)
    from app.root.controllers import root as root_module
    app.register_blueprint(root_module, template_folder='templates')
    from app.upload.controllers import upload as upload_module
    app.register_blueprint(upload_module, template_folder='templates')
    return app
