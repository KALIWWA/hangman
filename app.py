from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("hangman.html")


@app.route('/pl')
def polish():
    return render_template("hangman_pl.html")


if __name__ == '__main__':
    app.run()
