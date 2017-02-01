from uuid import uuid4
import os

from flask import render_template, Blueprint, request, jsonify
from werkzeug import secure_filename

from utils import parse_lnk

upload = Blueprint('upload', __name__, url_prefix='/upload')


@upload.route('/put', methods=['POST'])
def putt():
    upload_path = '/tmp/'
    req = request.get_json()
    base64_data = req['base64']
    destination_filename = uuid4().hex + '.lnk'
    filename = secure_filename(destination_filename)
    file_path = os.path.join(upload_path, filename)
    base64_data = base64_data.replace("data:;base64,", "")
    fh = open(file_path, "wb")
    fh.write(base64_data.decode('base64'))
    fh.close()
    data = parse_lnk(file_path)
    os.remove(file_path)
    return jsonify({"success": True, "data": data}), 200
