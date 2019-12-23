import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################


#postgreSQL connection
rds_connection_string =  "<postgres>:<password>@localhost:5432/GUN_VIOLENCE_PROJECT" 
engine = create_engine(f'postgresql://{rds_connection_string}')

# bar chart data 
@app.route("/yeardata")
def year():
    df = pd.read_sql_query('SELECT  * FROM gun_year LIMIT 5' , con=engine).head()
    bar_list = df.to_dict(orient='records')
    print (bar_list)
    return jsonify(bar_list)
###############################################################
# pie chart data from PostGres
@app.route("/shootingtypes")
def shootingstypes():
     type_df = pd.read_sql_query('select * from gunshootingstype', con=engine).head(10)
     shootingstypes = type_df.to_dict(orient='records')
     return jsonify(shootingstypes)



#######################################################
# Bar Chart data from csv
@app.route("/barchartdata")
def yearlybarchart():
     bar_df = pd.read_csv("static/data/year_trend_gun.csv")
     bar_dict = bar_df.to_dict(orient='records')
     return jsonify(bar_dict)

#########################################################
# line chart data from csv
@app.route("/monthlydata")
def month():
     flaskdf = pd.read_csv("static/data/gun2014onwrd.csv")
     line_dict = flaskdf.to_dict(orient='records')
     return jsonify(line_dict)

#########################################################
# pie chart fron csv
@app.route("/incidents")
def incidents ():
     incidentdf = pd.read_csv("static/data/Years_Data_2014_2019.csv")
     incident_dict = incidentdf.to_dict(orient='records')
     return jsonify(incident_dict)



##########################################################
# pie chart data from PostGres
@app.route("/markercluster")
def markercluster():
     df = pd.read_sql_query('select * from markercluster', con=engine)
     markercluster_dict = df.to_dict(orient='records')
     print("Reading from Database")
     # print(markercluster_dict)
     return jsonify(markercluster_dict)

#######################################################


# rendering templates for all html pages
@app.route("/")
def index():
#     """Return the homepage."""
    return render_template("index.html")

@app.route("/clustermap")
def clustermap():
     return render_template("markercluster.html")



@app.route("/yearlybarchart")
def barchart():
     return render_template("barchart.html")


@app.route("/monthlylinechart")
def linechart():
     return render_template("linechart.html")

@app.route("/periodpiechart")
def piechart():
     return render_template("piechart.html")

@app.route("/timeframeheatmap")
def heatmap():
     return render_template("heatmap.html")
   
    

@app.route("/current2019")
def choroplethmap():
     return render_template("choroplethmap.html")
   

@app.route("/data")
def data():
     return render_template("data.html")
   

if __name__ == "__main__":
     app.run(debug=True)
    