import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route('/')
def route_index():
    return render_template("hangman.html")


@app.route('/pl')
def route_polish():
    return render_template("hangman_pl.html")


@app.route('/favicon.ico')
def route_favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'dead.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run()
