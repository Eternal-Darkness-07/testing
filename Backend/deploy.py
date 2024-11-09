from flask import Flask, request, jsonify
import pandas as pd
import joblib
from datetime import datetime
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load the trained model
model_path = r'Best_neural_netwok.pkl'
xls_path = r'dataset_SIH_2024.xlsx'
model = joblib.load(model_path)

# Load and prepare the dataset
data = pd.read_excel(xls_path)
data['DATE'] = pd.to_datetime(data['DATE'])

# Apply feature engineering: create lag features for `UD`
data['UD_lag_1'] = data['UD'].shift(1)
data['UD_lag_2'] = data['UD'].shift(2)
data = data.dropna()  # Drop rows with NaN values from lagging

# Filter dataset for 2024 dates for faster response times in endpoint
data_2024 = data[(data['DATE'] >= '2024-01-01') & (data['DATE'] <= '2024-05-31')].copy()

@app.route('/')
def home():
    return "Flask App Running"

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        request_data = request.get_json()
        logging.debug(f"Request Data: {request_data}")

        date_str = request_data.get('date')
        month_str = request_data.get('month')
        
        # Convert strings to datetime
        if date_str:
            date = datetime.strptime(date_str, '%Y-%m-%d')
            prediction_data = data_2024[data_2024['DATE'] == date]
        elif month_str:
            # Ensure the month string is in the correct format (YYYY-MM)
            month_start = datetime.strptime(month_str, '%Y-%m')
            month_end = (month_start + pd.DateOffset(months=1)) - pd.DateOffset(days=1)
            prediction_data = data_2024[(data_2024['DATE'] >= month_start) & (data_2024['DATE'] <= month_end)]
        else:
            return jsonify({'error': 'Please specify a date or month'}), 400

        # Handle the case where no matching data is found
        if prediction_data.empty:
            return jsonify({'error': 'No data found for the specified date or month'}), 400

        logging.debug(f"Prediction Data: {prediction_data.head()}")

        # Prepare data for prediction (drop columns `DATE` and `UD` as they are not features)
        x_prediction = prediction_data.drop(columns=['DATE', 'UD'])
        
        # Ensure that x_prediction has the correct shape
        logging.debug(f"Prediction Data Shape: {x_prediction.shape}")
        
        # Make predictions
        y_pred = model.predict(x_prediction)
        
        # Ensure y_pred is a flat array
        y_pred = y_pred.flatten()

        # Format response to include both actual 'UD' values and predicted values with date formatting
        predictions = {
            str(date.date()): {  # Use `.date()` to remove the time part from the datetime
                'actual_UD': prediction_data['UD'].iloc[i],
                'predicted_UD': float(pred)
            }
            for i, (date, pred) in enumerate(zip(prediction_data['DATE'], y_pred))
        }

        return jsonify(predictions)

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred while processing the request'}), 500

if __name__ == '__main__':
    app.run(debug=True)
