from flask import Flask, jsonify
from flask_socketio import SocketIO
import threading
import time
import random  # For demonstration purposes

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Simulated trading bot data
bot_data = {
    "performance": {
        "revenue": "$10,000",
        "change": "+5.2%",
        "chartData": [100, 120, 115, 130, 140, 135, 150]
    },
    "status": {
        "MA_200": "143.32",
        "Short_term_MA": "142.41",
        "ATR": "0.18",
        "RSI": "28.03",
        "Leverage": "2",
        "Entry_Price": "142.4",
        "Current_Price": "142.33",
        "Dynamic_TP": "141.93",
        "Initial_SL": "143.59",
        "Trailing_Stop": "142.47",
        "USDT_Dom": "5.35%",
        "Last_Trade": "661.33m"
    },
    "MA_values": [142.4611941706068, 142.4670538945977, 142.4727054869628, 142.48106529320432, 142.49270040544275, 142.50733575996694, 142.5245113409674, 142.54381432306457, 142.5649283435096, 142.58761814044192, 142.6117003262623]
}

@app.route('/api/dashboard_data')
def get_dashboard_data():
    return jsonify(bot_data)

def update_bot_data():
    while True:
        # Simulate data updates
        bot_data["performance"]["revenue"] = f"${random.randint(9000, 11000)}"
        bot_data["performance"]["change"] = f"{random.uniform(-2, 7):.1f}%"
        bot_data["performance"]["chartData"] = [random.randint(100, 200) for _ in range(7)]
        bot_data["status"]["Current_Price"] = f"{random.uniform(140, 145):.2f}"
        
        # Emit the updated data to all connected clients
        socketio.emit('data_update', bot_data)
        
        time.sleep(5)  # Update every 5 seconds

if __name__ == '__main__':
    threading.Thread(target=update_bot_data, daemon=True).start()
    socketio.run(app, host='0.0.0.0', port=5000)