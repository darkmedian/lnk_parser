from flask import render_template, Blueprint

root = Blueprint('root', __name__, url_prefix='/')


@root.route('/', methods=['GET'])
def index():
    return render_template('index.html'), 200
