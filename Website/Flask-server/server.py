from flask import Flask, request, render_template
import pymongo
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

@app.route('/serverData')
def serverData():
    serverName = request.args.get("serverName")
    # db setup
    client = pymongo.MongoClient(botInfo["mongoDBURI"])
    try:
        db = client["DiscordServerList"]
        if serverName == None:
            return {"Error": 'Error: No server name provided'}

        # check if server exists in db
        collection = None
        for server in db.list_collection_names():
            if server == serverName:
                collection = server
                break
        
        return {"ServerName": collection}
    except:
        return {"ServerName": 'Error in /serverData'}


@app.route('/serverRetrive')
def serverRetrive():
    serverName = request.args.get("serverName")
    userToken = request.args.get("userToken")

    #verifyes that user has acesses to the server

    #retrive the server settings json

    return {"ErrorCode": 200}

if __name__ == '__main__':
    app.run(debug=True)