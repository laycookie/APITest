from flask import Flask, request, render_template
import requests
import json

with open('botinfo.json') as f:
  botInfo = json.load(f)

app = Flask(__name__)

@app.route('/discordOAuth')
def discordOAuth():
    API_ENDPOINT = 'https://discord.com/api/v10'

    code = request.args.get("code")

    if code == None:
        return 'Error: No token provided'

    # prep for post req
    body = botInfo
    body["grant_type"] = 'authorization_code'
    body["code"] = code
    body["redirect_uri"] = 'http://localhost:5173/discordOAuth'

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    # post req
    response = requests.post(API_ENDPOINT + "/oauth2/token", data=body, headers=headers)

    # return response.json()
    return render_template("discordOAuth.html", response=response.json())

@app.route('/apiTest')
def apiTest():
    return {"testData": "test"}

if __name__ == '__main__':
    app.run(debug=True)