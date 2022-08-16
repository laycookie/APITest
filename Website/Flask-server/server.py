from flask import Flask
app = Flask(__name__)

@app.route('/api')
def index():
    return {"testData": 'Hello World!'}

if __name__ == '__main__':
    app.run(debug=True)