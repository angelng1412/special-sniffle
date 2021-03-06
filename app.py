from flask import Flask, render_template, redirect, url_for, Response, request
from utils import yelp

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def root():
    return render_template("home.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/data/csv/<bid>")
def csv(bid):
    if yelp.in_dataset(bid):
        return Response(yelp.get_csv(bid), mimetype='text/plain')
    else:
        return redirect( url_for('root'))

@app.route("/heatmap")
def heatmap():
    return render_template("heatmap.html", datasets = sorted(yelp.get_names()))

@app.route("/get_bid", methods = ['POST'])
def get_bid():
    if "name" in request.form:
        return Response(yelp.get_bid(request.form["name"]), mimetype='text/plain')
    else:
        return redirect( url_for('root'))

@app.route("/get_scatter")
def get_scatter():
    return Response(yelp.get_scatter_dataset(), mimetype='text/plain')

@app.route("/piechart")
def pie():
    return render_template("piechart.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
