from flask import Flask, request, render_template, jsonify
import pymongo
import requests
import json

with open('botinfo.json') as f:
  botInfo = json.load(f)

app = Flask(__name__)

def askForUserServerList(TOKEN, token_type):
    API_ENDPOINT = 'https://discord.com/api/v10'

    headers = {
        "authorization": str(token_type) + " " + str(TOKEN)
    }
    res = requests.get(API_ENDPOINT + "/users/@me/guilds", headers=headers)
    return res.json()

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

    return render_template("discordOAuth.html", response=response.json())

@app.route('/serverData')
def serverData():
    serverId = request.args.get("serverId")
    # db setup
    client = pymongo.MongoClient(botInfo["mongoDBURI"])
    try:
        db = client["DiscordServerList"]
        if serverId == None:
            return {"Error": 'Error: No server name provided'}

        # check if server exists in db
        collection = None
        for server in db.list_collection_names():
            if server == serverId:
                collection = server
                break
        
        return {"ServerName": collection}
    except:
        return {"ServerName": 'Error in /serverData'}


@app.route('/serverRetrive')
def serverRetrive():
    serverId = request.args.get("serverId")
    userToken = request.args.get("userToken")
    token_type = request.args.get("token_type")

    client = pymongo.MongoClient(botInfo["mongoDBURI"])
    try:
        db = client["DiscordServerList"]

    except:
         return {"Error": 'Error: No server name provided'}
    #verifyes that user has acesses to the server
    userServers = askForUserServerList(userToken, token_type)
    
    isUserOnServer = False
    userServerData = None
    for server in userServers:
        if server["id"] == serverId:
            isUserOnServer = True
            userServerData = server
            break

    if isUserOnServer == False:
        return {"ErorrCode": "userNotOnServer"}

    isUserdAdmin = False
    for server in db.list_collection_names():
        if server == serverId:
            #Check if has admin perms
            if (int(userServerData["permissions"]) & 0x8) == 0x8:
                isUserdAdmin = True

    if isUserdAdmin == False:
        return {"ErorrCode": "UserNotAdmin"}
    
    # Gets data of server setting and sends it to the client
    try:
        serverSettingDict = db[serverId].find_one()
        jsonServerSetting = jsonify( data=serverSettingDict["commands"])
        return jsonServerSetting
    except:
        return {"ErorrCode": "Something went wrong"}


if __name__ == '__main__':
    app.run(debug=True)