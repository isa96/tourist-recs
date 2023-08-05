from flask import Flask
from flask import request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS ,cross_origin
from sklearn.metrics.pairwise import cosine_similarity, sigmoid_kernel
import pandas as pd

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
nameFile = 'API_Tourist.csv'
path = nameFile
place_path = 'Place.csv'
place_path2 = 'Tour_Place.csv'

class Tourism(Resource):
    def get(self):
        data = pd.read_csv(path)
        
        self.place_name = request.args.get('Place_Name')
        print(self.place_name)
        if (self.place_name != None):
            data = data[data.Place_Name.str.contains(self.place_name,case=False) ]
            data = data.to_dict('records')
            return {'data' : data}, 200
        else:
            data = data.to_dict('records')
            return {'data' : data}, 200



    def post(self):
        parser = reqparse.RequestParser()
        # Place_Name,Description,Category,City,Price,Rating,Time_Minutes,Coordinate,Lat,Long
        parser.add_argument('Place_Name', required=True)
        parser.add_argument('Description', required=True)
        parser.add_argument('Category', required=True)
        parser.add_argument('City', required=True)
        parser.add_argument('Price', required=True)
        parser.add_argument('Rating', required=True)
        parser.add_argument('Time_Minutes', required=True)
        parser.add_argument('Coordinate', required=True)
        parser.add_argument('Lat', required=True)
        add_data = parser.parse_args()

        data = pd.read_csv(path)

        new_data = pd.DataFrame({
            'Place_Name'        : [add_data['Place_Name']],
            'Description'       : [add_data['Description']],
            'Category'          : [add_data['Category']],
            'City'              : [add_data['City']],
            'Price'             : [add_data['Price']],
            'Rating'            : [add_data['Rating']],
            'Time_Minutes'      : [add_data['Time_Minutes']],
            'Coordinate'        : [add_data['Coordinate']],
            'Lat'               : [add_data['Lat']]
        })

        data = data.append(new_data, ignore_index = True)
        data.to_csv(nameFile, index=False)
        return {'data' : new_data.to_dict('records')}, 201

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('Place_Name', required=True)
        args = parser.parse_args()

        data = pd.read_csv(path)

        data = data[data['Place_Name'] != args['Place_Name']]

        data.to_csv(nameFile, index=False)
        return {'message' : 'Record deleted successfully.'}, 200

class show_twelve(Resource):
    def get(self):
        data = pd.read_csv(path)

        data = data.sample(12)

        data = data.to_dict('records')

        return {'data' : data}, 200

class predict(Resource):
    def get(self):
        data_place = pd.read_csv(place_path)
        data_place = data_place.set_index('Place_Name')
        data = pd.read_csv(path)
        place_name = request.args.get('Place_Name')
        
        print(place_name)
        if (place_name != None):
            place_name = data.Place_Name[data.Place_Name.str.contains(place_name,case=False) ].iloc[0]
            model_df = cosine_similarity(data_place)
            model_df = pd.DataFrame(model_df, index=data['Place_Name'], columns=data['Place_Name'])
            count = 6
            items=data[['Place_Id','Place_Name','Category','City','Link','Description']]
            index = model_df.loc[:,place_name].to_numpy().argpartition(range(-1, -count, -1))
            closest = model_df.columns[index[-1:-(count+2):-1]]
            closest = closest.drop(place_name, errors='ignore')
            data = pd.DataFrame(closest).merge(items).head(count)
            data = data.to_dict('records')
            return {'data' : data}, 200
        else:
            return{'message' : 'Please enter a place name'}, 200

class predict2 (Resource):
    def get(self):
        model_df = pd.read_csv(place_path2)
        model_df = model_df.set_index('Place_Name')
        data = pd.read_csv(path)
        place_name = request.args.get('Place_Name')
        
        print(place_name)
        if (place_name != None):
            place_name = data.Place_Name[data.Place_Name.str.contains(place_name,case=False) ].iloc[0]
            count = 6
            items=data[['Place_Id','Place_Name','Category','City','Link','Description']]
            index = model_df.loc[:,place_name].to_numpy().argpartition(range(-1, -count, -1))
            closest = model_df.columns[index[-1:-(count+2):-1]]
            closest = closest.drop(place_name, errors='ignore')
            closest.name = 'Place_Name'
            data = pd.DataFrame(closest).merge(items).head(count)
            data = data.to_dict('records')
            return {'data' : data}, 200
        else:
            return{'message' : 'Please enter a place name'}, 200



# Add URL endpoints
api.add_resource(Tourism, '/tourism')
api.add_resource(show_twelve, '/tourism/showtwelve')
api.add_resource(predict, '/tourism/predict')
api.add_resource(predict2, '/tourism/predict2')

if __name__ == '__main__':
     app.run()
    