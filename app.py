from flask import Flask, render_template, redirect, url_for, Response
from utils import yelp

app = Flask(__name__)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.route("/")
def root():
    return render_template("base.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/data/csv/<bid>")
def csv(bid):
    if yelp.in_dataset(bid):
        return Response(yelp.get_csv(bid), mimetype='text/plain')
    else:
        return render_template('404.html'), 404

@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html", datasets = yelp.get_bids())

if __name__ == "__main__":
    app.debug = True
    app.run()
