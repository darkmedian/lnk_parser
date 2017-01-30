import os

DEBUG = True
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'You Should SOME key'
    SSL_DISABLE = False


class DevConfig(Config):
    DEBUG = True


class ProdConfig(Config):
    DEBUG = False

config = {
    'development': DevConfig,
    'default': DevConfig,
    'production': ProdConfig
}