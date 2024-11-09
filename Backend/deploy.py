from flask import Flask, request, jsonify
import pandas as pd
import joblib
from datetime import datetime

app = Flask(__name__)

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

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
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

    # Prepare data for prediction (drop columns `DATE` and `UD` as they are not features)
    x_prediction = prediction_data.drop(columns=['DATE', 'UD'])
    y_pred = model.predict(x_prediction)
    
    # Format response to include both actual 'UD' values and predicted values
    predictions = {
        str(date): {
            'actual_UD': prediction_data['UD'].iloc[i],
            'predicted_UD': float(pred[0])
        }
        for i, (date, pred) in enumerate(zip(prediction_data['DATE'], y_pred))
    }
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
