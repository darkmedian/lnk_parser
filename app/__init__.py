from flask import Flask, render_template
from config import config, Config


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    from app.root.controllers import root as root_module
    app.register_blueprint(root_module, template_folder='templates')
    from app.upload.controllers import upload as upload_module
    app.register_blueprint(upload_module, template_folder='templates')
    return app
