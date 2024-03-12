import pickle
import pandas as pd
import json
from sklearn.preprocessing import PolynomialFeatures
from sklearn import preprocessing

def predict_mpg(config):

    ##loading the model from the saved file
    pkl_filename = "model.pkl"
    with open(pkl_filename, 'rb') as f_in:
        model = pickle.load(f_in)
    
    if type(config) == dict:
        df = pd.DataFrame(config)
    else:
        df = config
        
    input_scaled = preprocessing.scale(df, axis=1)
    
    degree = 2   
    poly_features = PolynomialFeatures(degree=degree)
    input_scaled_poly = poly_features.fit_transform(input_scaled)
    
    y_pred = model.predict(input_scaled_poly)
    
    return y_pred


def predict_mpgtwo(config):

    ##loading the model from the saved file
    pkl_filename = "model2.pkl"
    with open(pkl_filename, 'rb') as f_in:
        model = pickle.load(f_in)
    
    if type(config) == dict:
        df = pd.DataFrame(config)
    else:
        df = config
    
    y_pred = model.predict(df)
    
    return y_pred