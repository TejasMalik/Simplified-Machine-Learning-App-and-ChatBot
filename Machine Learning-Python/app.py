# Flask Packages
from flask import Flask,render_template,request,url_for
from flask_bootstrap import Bootstrap 
from flask_uploads import UploadSet,configure_uploads,IMAGES,DATA,ALL
from flask_sqlalchemy import SQLAlchemy 

from werkzeug import secure_filename
import os
import datetime
import time


# EDA Packages
import pandas as pd 
import numpy as np

# ML Packages
from sklearn import model_selection

# ML Classifications Model
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

# ML Regression Model
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR

from sklearn.model_selection import train_test_split 
from sklearn.metrics import confusion_matrix
from sklearn.metrics import mean_squared_error
from sklearn.metrics import classification_report


from math import sqrt





app = Flask(__name__)
Bootstrap(app)
db = SQLAlchemy(app)

# Configuration for File Uploads
files = UploadSet('files',ALL)
app.config['UPLOADED_FILES_DEST'] = 'static/uploadsDB'
configure_uploads(app,files)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///static/uploadsDB/filestorage.db'

# Saving Data To Database Storage
class FileContents(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String(300))
	modeldata = db.Column(db.String(300))
	data = db.Column(db.LargeBinary)


@app.route('/')
def index():
	return render_template('index.html')

# Route for our Processing and Details Page
@app.route('/dataupload',methods=['GET','POST'])
def dataupload():
    if request.method == 'POST' and 'csv_data' in request.files:
        file = request.files['csv_data']
        filename = secure_filename(file.filename)
		# os.path.join is used so that paths work in every operating system
        # file.save(os.path.join("wherever","you","want",filename))
        file.save(os.path.join('static/uploadsDB',filename))
        fullfile = os.path.join('static/uploadsDB',filename)

        error = "Invalid File"

        if (not filename.endswith('.csv')):
             return render_template('index.html', error = error)

		# For Time
        date = str(datetime.datetime.fromtimestamp(time.time()).strftime("%Y-%m-%d %H:%M:%S"))

		# EDA function
        df = pd.read_csv(os.path.join('static/uploadsDB',filename))
        df_size = df.size
        df_shape = df.shape
        df_columns = list(df.columns)
        df_targetname = df[df.columns[-1]].name
        df_Xfeatures = df.iloc[:,0:-1] 
        df_Ylabels = df[df.columns[-1]] # Select the last column as target
		# same as above df_Ylabels = df.iloc[:,-1]
        
        unique_targets_size = len(list(df[df_targetname].unique()))

        error = "File contains Invalid data"

        if (len(df_columns) < 2 ):
            return render_template('index.html', error = error)	

		# Model Building
        X = df_Xfeatures
        Y = df_Ylabels
        seed = 7
        res = ""
        
        if unique_targets_size <= 10:
            type_of_ml = "Classification"
			# prepare models
            models = []
            models.append(('LR', LogisticRegression()))
            models.append(('LDA', LinearDiscriminantAnalysis()))
            models.append(('KNN', KNeighborsClassifier()))
            models.append(('CART', DecisionTreeClassifier()))
            models.append(('NB', GaussianNB()))
            models.append(('SVM', SVC()))
			# evaluate each model in turn
            
            results = []
            names = []
            allmodels = []
            acc = []
            std = []
            scoring = 'accuracy'
            res = "Mean Accurracy"
            for name, model in models:
                kfold = model_selection.KFold(n_splits=10, random_state=seed)
                cv_results = model_selection.cross_val_score(model, X, Y, cv=kfold, scoring=scoring)
                results.append(cv_results)
                names.append(name)
                msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
                allmodels.append(msg)
                acc.append(cv_results.mean())
                std.append(cv_results.std())
 
                
            msg = "%s: %f (%f)" % (names[acc.index(max(acc))], max(acc), std[acc.index(max(acc))])
            
            x = df.iloc[:, 0:-1].values
            y = df.iloc[:, [-1]].values
            x_train, x_test, y_train, y_test = train_test_split(x,y, test_size=0.2, random_state=seed)
            classifier = models[acc.index(max(acc))][1]
            classifier.fit(x_train,y_train)
            predictions = classifier.predict(x_test)
            con_mat = confusion_matrix(y_test, predictions)
            rmse = "Not Required"
            cr = classification_report(y_test, predictions)
            
        else:
            type_of_ml = "Regression"
			# prepare models
            models = []
            models.append(('LR', LinearRegression()))
            models.append(('DTR', DecisionTreeRegressor()))
            models.append(('RFR', RandomForestRegressor()))
            models.append(('SVR', SVR()))
			# evaluate each model in turn
            
            results = []
            names = []
            allmodels = []
            acc = []
            std = []
            scoring = 'r2'
            res = "R2 Score"
            for name, model in models:
                kfold = model_selection.KFold(n_splits=10, random_state=seed)
                cv_results = model_selection.cross_val_score(model, X, Y, cv=kfold, scoring=scoring)
                results.append(cv_results)
                names.append(name)
                msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
                allmodels.append(msg)
                acc.append(cv_results.mean())
                std.append(cv_results.std())

                
            msg = "%s: %f (%f)" % (names[acc.index(max(acc))], max(acc), std[acc.index(max(acc))])
            con_mat = ['Not Required in Regression']

            x = df.iloc[:, 0:-1].values
            y = df.iloc[:, [-1]].values
            x_train, x_test, y_train, y_test = train_test_split(x,y, test_size=0.2, random_state=seed)
            regressor = models[acc.index(max(acc))][1]
            regressor.fit(x_train,y_train)
            predictions = regressor.predict(x_test)
            rmse = sqrt(mean_squared_error(y_test, predictions))
            cr = "Not Required"

			
			
		# Saving Results of Uploaded Files  to Sqlite DB
        newfile = FileContents(name=file.filename,data=file.read(),modeldata=msg)
        db.session.add(newfile)
        db.session.commit()
                
        return render_template('details.html',filename = filename,date = date,
			df_size = df_size,
			df_shape = df_shape,
			df_columns = df_columns,
			df_targetname = df_targetname,
			model_results = allmodels,
			model_names = names,
			fullfile = fullfile,
			dfplot = df,
			best = msg,
			mat = con_mat,
			ml_type = type_of_ml,
            rese = res,
            rmse = rmse,
            cr = cr
			)
			





if __name__ == '__main__':
	app.run(debug=True)
	